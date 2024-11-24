import express from "express";
import * as DonateController from "../controllers/donation-controller.js";

const router = express.Router();

/**
 * Route handling for the root of the donations endpoint.
 * It supports GET for searching and filtering donations based on the presence of a 'keyword' query parameter
 * and POST for creating new donations.
 */
router.route('/')
    .get((req, res, next) => {
        if (req.query.keyword) {
            DonateController.filterBy(req, res);
        } else {
            DonateController.search(req, res);
        }
    })
    .post(DonateController.post);

/**
 * Route handling for specific donation operations identified by an ID.
 * It supports GET to retrieve a donation by its ID,
 * DELETE to remove a donation by its ID,
 * and PATCH to update a donation by its ID.
 */
router.route('/:id')
    .get(DonateController.get)
    .delete(DonateController.del)
    .patch(DonateController.update);

export default router;