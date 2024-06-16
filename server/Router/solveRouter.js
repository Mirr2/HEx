const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/problems', (req, res) => {
  const { region } = req.query;

  if (region) {
    db.query(
      'SELECT id, title, descriptions, score, category, region, notion FROM solve_this WHERE region = ?',
      [region],
      (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).send('Database Error');
        } else {
          res.send(results);
          console.log(results);
        }
      }
    );
  } else {
    res.status(400).send('Region query parameter is required');
  }
});

router.post('/check-flag', (req, res) => {
  const { problemId, flag } = req.body;

  // 로그 추가
  console.log(`Checking flag for problemId: ${problemId}, flag: ${flag}`);

  if (!problemId || !flag) {
    res.status(400).send('problemId and flag are required');
    return;
  }

  db.query('SELECT flag FROM solve_this WHERE id = ?', [problemId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Database Error');
    } else if (results.length > 0 && results[0].flag === flag) {
      res.send({ correct: true });
    } else {
      res.send({ correct: false });
    }
  });
});

module.exports = router;
