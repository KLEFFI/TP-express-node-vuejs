const express = require("express");
const dotenv = require('dotenv');
const cors = require("cors");
const HttpException = require('./utils/HttpException.utils');
const errorMiddleware = require('./middleware/error.middleware');
const userRouter = require('./routes/user.route');
const taskRouter = require('./routes/task.route');

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.options("*", cors());

const port = Number(process.env.PORT || 5000);

app.use(`/api/v1/users`, userRouter);
app.use(`/api/v1/tasks`, taskRouter);

app.get('/', function (req, res) {
   res.send('Hello World 123...456789');
})

app.all('*', (req, res, next) => {
    const err = new HttpException(404, 'Endpoint Not Found');
    next(err);
});

app.use(errorMiddleware);

app.listen(port, () =>
    console.log(`🚀 Server running on port ${port}!`));


module.exports = app;
