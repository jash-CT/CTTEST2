const express = require('express');
const app = express();
const PORT = 3000;
const pool = require('./db');
const retry = require('../shared-services/retry');

// Middleware
app.use(express.json());

// Placeholder for Workflow Orchestrator
app.get('/', (req, res) => {
  res.send('Workflow Orchestrator is running');
});

// Example route to fetch workflows
app.get('/workflows', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM workflows');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching workflows');
  }
});

// Example route with retry logic
app.get('/retry-example', async (req, res) => {
  try {
    const result = await retry(async () => {
      // Simulate a database query
      const data = await pool.query('SELECT * FROM workflows');
      if (Math.random() > 0.5) throw new Error('Simulated transient error');
      return data.rows;
    });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error after retries');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});