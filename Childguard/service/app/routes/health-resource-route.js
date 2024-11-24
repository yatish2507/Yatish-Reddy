import express from "express";
import * as resourceCtr from "../controllers/health-resource-controller.js";

const router = express.Router();

/**
 * Root routes for the health resources endpoint.
 * It supports GET for searching health resources and POST for creating new resources.
 */
router.route('/')
    // .get(resourceCtr.filterBy)
    .get(resourceCtr.search)
    .post(resourceCtr.post);

/**
 * Specific routes for operations on individual health resources identified by an ID.
 * It supports GET for retrieving, DELETE for deleting, and PATCH for updating resources.
 */
router.route('/:id')
    .get(resourceCtr.get)
    .delete(resourceCtr.del)
    .patch(resourceCtr.update);

export default router;