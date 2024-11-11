// import { ReviewData } from '@/app/components/Review/interfaces';

import pg from 'pg';
const { Pool } = require('pg'); // Use require syntax

// Create a new pool of connections to your database
const pool = new Pool({
  database: 'door_reviews',
  port: 5432,
});
import { Request, Response } from "express";
export const saveReview = async (req: Request, res: Response) => {

  const { clueDescriptions, review, location } = req.body;
  console.log(clueDescriptions, review, location)
  const client = await pool.connect();
  try {
    // Insert location if it doesn't exist
    const insertLocationQuery = `
        INSERT INTO locations (place_id, lat, lng, formatted_address, name)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (place_id) DO NOTHING
      `;
    await client.query(insertLocationQuery, [
      location.place_id,
      location.lat,
      location.lng,
      location.formatted_address,
      location.name,
    ]);

    // Insert review
    const insertReviewQuery = `
        INSERT INTO reviews (place_id, clue_descriptions, review)
        VALUES ($1, $2, $3)
      `;
    await client.query(insertReviewQuery, [
      location.place_id,
      JSON.stringify(clueDescriptions),  // convert to JSON
      review,
    ]);
    res.status(200).json({ message: "Review saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while saving the review." });

  }

};

export const fetchAllReviews = async (req: Request, res: Response) :Promise<any>=> {
  console.log("Request body:", req.body);
  const { location } = req.body;
  console.log("Location:", location);
  const { place_id} = location;

  try {
    // Query to fetch all reviews with the given place_id
    const reviewsQuery = `
      SELECT *
      FROM reviews r
      INNER JOIN locations l ON r.place_id = l.place_id
      WHERE l.place_id = $1
    `;

    const result = await pool.query(reviewsQuery, [place_id]);

    // Check if any reviews were found
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No reviews found for this location" });
    }

    // Return the fetched reviews
    res.status(200).json({ reviews: result.rows, message: "Data fetched successfully!" });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Error fetching reviews" });
  }
}

module.exports = {
  saveReview,
  fetchAllReviews,
}