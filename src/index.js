const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const questions = require('../questions.json');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

const PORT = 8000; // PORT

app.use(cors());

// BodyParser for parsing request body.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// This disables the `contentSecurityPolicy` middleware but keeps the rest.
app.use(
    helmet({
        contentSecurityPolicy: false,
    })
);

const success = (res, data) => {
    res.status(200).type('application/json').send({
        status: 200,
        message: 'OK',
        data: data,
    });
};

const failure = (res) => {
    res.status(404).type('application/json').send({
        status: 404,
        message: 'Questions not found.',
    });
};

// Append Questions.
const appendQuestions = (_questions) => {
    let newQuestions = questions;
    for (_question of _questions) {
        newQuestions.push(_question);
    }

    fs.writeFile(
        __dirname + '/../questions.json',
        JSON.stringify(newQuestions, null, 2),
        (err) => {
            if (err) throw err;
        }
    );
};

// GET Questions
app.get('/api/v1/questions', (req, res) => {
    if (questions) success(res, questions);
    else failure(res);
});

// GET a specific question with id.
app.get('/api/v1/questions/id/:id', (req, res) => {
    const question = questions[req.params.id];
    if (question) success(res, question);
    else failure(res);
});

// GET a random question.
app.get('/api/v1/questions/random', (req, res) => {
    let randomQuestion =
        questions[Math.floor(Math.random() * questions.length)];
    if (randomQuestion) success(res, randomQuestion);
    else failure(res);
});

// GET questions that offer the specified number of choices.
app.get('/api/v1/questions/choices/:choices', (req, res) => {
    let result = questions.filter((element) => {
        return element.choices.length == req.params.choices;
    });

    console.log(result);

    if (result.length !== 0) success(res, result);
    else failure(res);
});

// POST a question
app.post('/api/v1/questions', (req, res) => {
    console.log(req.body);
    if (req.body.length != 0) {
        // append question to questions.json.
        appendQuestions(req.body);
        res.send({
            status: 200,
            createdAt: new Date(),
            message: 'OK',
        });
    } else
        res.send({
            status: 404,
            message: 'The body is not the desired type.',
        });
});

app.listen(process.env.PORT || PORT, () => {
    console.log('HELLO WORLD...');
});
