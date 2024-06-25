const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./auth/auth');
const app = express();
const port = 3000;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/auth', authRoutes);
app.use('/', userRoutes);
// global catch
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ msg: 'Something broke!' });
});

app.listen(port, function () {
    console.log(`Server running at https://localhost:${port}`)
});
