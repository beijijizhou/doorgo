// db.js
const { Pool } = require('pg');

// Create a new pool of connections to your database
const pool = new Pool({
   // your database host
  database: 'backup', // replace with your database name
  password: '', // replace with your database password
  port: 5432, // default PostgreSQL port
});

// Function to create the reviews table
const createReviewsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS review (
      id SERIAL PRIMARY KEY,
      clue_descriptions JSONB NOT NULL, 
      review TEXT NOT NULL,       
      likes INTEGER DEFAULT 0,       
      created_at TIMESTAMP DEFAULT NOW() 
    );
  `;
  
  try {
    const res = await pool.query(query);
    console.log('Review table created successfully:', res);
  } catch (err) {
    console.error('Error creating reviews table:', err);
  } finally {
    await pool.end(); // Close the database connection pool
  }
};

// Execute the function to create the table
createReviewsTable();
