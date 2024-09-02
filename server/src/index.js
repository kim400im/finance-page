// requestAnimationFrame('dotenv').config();
const path = require('path');
const express = require('express');
const connectMongoDB = require('./config/mongodb');
const connectMariaDB = require('./config/mariadb');
const accountingRoutes = require('./routes/accountingRoutes')
const chatRoutes = require('./routes/chatRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../../client/public')));

// api가  api 호출을 위한 것임을 명확히 해준다. 
app.use('/api', accountingRoutes);
app.use('/api', chatRoutes);
app.use('/api', userRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/public/index.html'));
});

app.listen(PORT, async () => {
    await connectMariaDB;
    await connectMongoDB;

    console.log(`Server runnging on port ${PORT}`);
})

