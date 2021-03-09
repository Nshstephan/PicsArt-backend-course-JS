const express = require('express');
require('./db/mongoose');
require('dotenv').config();
const userRouter = require('./routers/user');
const postRouter = require('./routers/post');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});