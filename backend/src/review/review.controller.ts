// import { fetchReview } from './../../../frontend/app/api/doorfront/sendReview';
// review.controller.js
// Adjust path based on your folder structure
 import pg from 'pg';
 const { Pool } = require('pg'); // Use require syntax

// Create a new pool of connections to your database
import { Request, Response } from "express";
export const saveReview = async (req: Request, res: Response) => {
    const { clueDescriptions, review } = req.body;
    console.log(clueDescriptions, review)
    // const pool = new Pool({
    //     // your database host
    //    database: 'backup', // replace with your database name
    //    password: '', // replace with your database password
    //    port: 5432, // default PostgreSQL port
    //  });
    // try {
    //     // Insert the review into the database
    //     const query = `
    //       INSERT INTO reviews (clue_descriptions, review)
    //       VALUES ($1, $2)
    //       RETURNING id;
    //     `;
    //     const values = [clueDescriptions, review];

    //     const result = await pool.query(query, values);

    //     // Return the id of the newly created review
    //     res.status(201).send({ message: "Review saved successfully", id: result.rows[0].id });
    //   } catch (err) {
    //     console.error('Error saving review:', err);
    //     res.status(500).send({ message: "Error saving review" });
    //   }
};

export const fetchAllReviews = async (req: Request, res: Response) => {
  console.log("request");
}

module.exports = {
  saveReview,
  fetchAllReviews,
}