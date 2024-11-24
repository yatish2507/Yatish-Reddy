import express from "express";
import * as resourceCtr from "../controllers/educational-resource-controller.js";

const router = express.Router();

/**
 * Routes for the root of the educational resources endpoint.
 * It supports GET for searching educational resources and POST for creating new resources.
 */
router.route('/')
    .get(resourceCtr.search)
    .post(resourceCtr.post);

/**
 * Routes handling specific educational resource operations identified by an ID in the URL.
 * It supports GET for retrieving, DELETE for deleting, and PATCH for updating educational resources.
 */
router.route('/:id')
    .get(resourceCtr.get)
    .delete(resourceCtr.del)
    .patch(resourceCtr.update);

export default router;