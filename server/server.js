const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;

const solveRouter = require('./Router/solveRouter');

app.use(express.json());
// CORS 세부 설정 예
app.use(cors({
  origin: '*', // 모든 도메인 허용
  methods: ['GET', 'POST'], // 허용할 HTTP 메소드
  allowedHeaders: ['Content-Type', 'Authorization'] // 허용할 헤더
}));
app.use('/api', solveRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
