# BASIC QUIZ API

This is just a simple question api.
**NOTE:** If you are using VS Code. You can install an extension that named **Rest Client** then you can test it.

    npm install

then

    npm run start

## ENDPOINTS

#### GET api/v1/questions

Return all questions.

#### Get api/v1/questions/id/:id

Return a specific question with id.

#### GET api/v1/questions/random

Return a random question

#### GET api/v1/questions/choices/:choices_count

Return questions that offer the specified number of choices.

#### POST api/v1/questions

Post a question.
Example body:

```JSON
[
{
    "question": "Sample Question 1",
    "choices": ["Answer 1", "Answer 2", "Answer3"],
    "answer": 0
},
{
   "question": "Sample Question 2",
    "choices": ["Answer 1", "Answer 2", "Answer3"],
    "answer": 2
}
]
```
