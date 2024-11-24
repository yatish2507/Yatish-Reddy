import express from "express";
import * as volunteerSign from "../controllers/volunteer-signups-controller.js";

const router = express.Router();

/**
 * Root routes for volunteer signups:
 * - GET: Depending on the presence of a 'keyword' query, either filter volunteer signups or search all signups.
 * - POST: Register a new volunteer signup.
 */
router.route('/')
    .get((req, res, next) => {
        if (req.query.keyword) {
            volunteerSign.filterBy(req, res);
        } else {
            volunteerSign.search(req, res);
        }
    })
    .post(volunteerSign.post);

/**
 * Specific routes for operations on individual volunteer signups identified by an ID:
 * - GET: Retrieve detailed information about a specific volunteer signup by ID.
 * - DELETE: Remove a volunteer signup by ID.
 * - PATCH: Update certain fields of a volunteer signup by ID.
 */
router.route('/:id')
    .get(volunteerSign.get)
    .delete(volunteerSign.del)
    .patch(volunteerSign.update);

export default router;