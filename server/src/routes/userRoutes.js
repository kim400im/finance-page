const dotenv = require('dotenv')
dotenv.config();

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middlewares/authMiddleware');
const db = require('../config/mariadb'); // MariaDB 연결


const router = express.Router();

// 회원가입 API
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)';
        await db.promise().query(query, [username, email, hashedPassword]);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// 로그인 API
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const [rows] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
        const user = rows[0];

        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        console.log('JWT SECRET', process.env.JWT_SECRET);

        // JWT 생성
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.log('Generated JWT: ', token);

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// 마이페이지 (로그인한 사용자만 접근 가능)
router.get('/mypage', authenticateToken, async (req, res) => {
    try {
        const [records] = await db.promise().query('SELECT * FROM accounting_records WHERE user_id = ?', [req.user.id]);
        res.json({ message: 'Welcome to your MyPage', records });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




module.exports = router;
