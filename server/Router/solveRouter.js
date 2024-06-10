// solveRouter.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/problems', (req, res) => {
    const { region } = req.query;

    if (region) {
        db.query(`SELECT * FROM solve_this WHERE region = ?`, [region], (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send('Database Error');
            } else {
                res.send(results);
                console.log(results);
            }
        });
    }
  });
  
  module.exports = router;