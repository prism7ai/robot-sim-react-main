const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL config
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Java@123', // change if needed
  database: 'pathfinder'
});

db.connect(err => {
  if (err) {
    console.error('❌ MySQL connection failed:', err);
  } else {
    console.log('✅ Connected to MySQL');
  }
});

// Save a simulation result
app.post('/save-path', (req, res) => {
  const { algorithm, start, goal, obstacles, path, visitedCount, pathLength, timeTaken } = req.body;

  const sql = `
    INSERT INTO paths 
    (algorithm, start_point, goal_point, obstacles, path, visited_count, path_length, time_taken)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    algorithm,
    JSON.stringify(start),
    JSON.stringify(goal),
    JSON.stringify(obstacles),
    JSON.stringify(path),
    visitedCount,
    pathLength,
    timeTaken
  ], (err) => {
    if (err) {
      console.error('❌ Insert failed:', err);
      res.status(500).send('Insert failed');
    } else {
      res.send({ message: '✅ Saved successfully' });
    }
  });
});

// Fetch all past results
app.get('/results', (req, res) => {
  const sql = `SELECT * FROM paths ORDER BY id DESC LIMIT 10`; // Show latest 10 results
  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Error fetching results:', err);
      return res.status(500).send('Error fetching results');
    }
    res.json(results);
  });
});


// Start server
app.listen(4000, () => {
  console.log('🚀 Backend running at http://localhost:4000');
});
