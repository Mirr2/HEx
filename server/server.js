// server.js
const express = require('express');
const app = express();
const port = 4000;

const solveRouter = require('./Router/solveRouter'); // 라우터 모듈 임포트

app.use('/api', solveRouter); // API 라우트 분리

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});