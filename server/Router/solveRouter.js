// solveRouter.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/problems', (req, res) => {
    db.query('SELECT * FROM solve_this', (error, results, fields) => {
      if (error) {
        console.error('Database error:', error);
        res.status(500).send('Database error');
        return;
      }
      console.log('Database results:', results); // 결과를 콘솔에 출력
      res.json(results);
    });
  });
  
  module.exports = router;