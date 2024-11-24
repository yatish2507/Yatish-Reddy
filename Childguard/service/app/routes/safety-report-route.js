import express from "express";
import * as reportCtr from "../controllers/safety-report-controller.js";

const router = express.Router();

/**
 * Routes for the root of the safety reports endpoint.
 * - GET: Search for safety reports based on query parameters. The commented-out filterBy can be enabled for advanced filtering.
 * - POST: Submit a new safety report.
 */
router.route('/')
    .get(reportCtr.search)
    .post(reportCtr.post);

/**
 * Specific routes for operations on individual safety reports identified by an ID.
 * - GET: Retrieve detailed information on a specific safety report by ID.
 * - DELETE: Remove a safety report by ID.
 * - PATCH: Update specific fields of a safety report by ID.
 */
router.route('/:id')
    .get(reportCtr.get)
    .delete(reportCtr.del)
    .patch(reportCtr.update);

export default router;