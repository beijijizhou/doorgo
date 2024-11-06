// review/index.ts
import { saveReview } from './review.controller';
const express = require("express");
const brandsControllers = require("./brands.controller");
const router = express.Router();
module.exports = { saveReview };
