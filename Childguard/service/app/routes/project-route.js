import express from "express";
import * as projectCtr from "../controllers/project-controller.js";
 
const router = express.Router();
 
/**
 * Root project routes for handling basic CRUD operations.
 * - GET: Search for projects based on query parameters (filtering capability can be enabled if needed).
 * - POST: Create a new project with provided data.
 */
router.route('/')
    .get(projectCtr.search)
    .post(projectCtr.post);
 
/**
 * Route to handle requests that need to fetch multiple projects based on a set of IDs.
 * - GET: Retrieve multiple projects by their IDs provided through query parameters.
 */
router.route('/multiple')
    .get(projectCtr.getMultiple);
 
/**
 * Specific project routes identified by a unique ID.
 * - GET: Retrieve a detailed view of a specific project by ID.
 * - DELETE: Remove a project by ID.
 * - PATCH: Update certain fields of a project by ID.
 */
router.route('/:id')
    .get(projectCtr.get)
    .delete(projectCtr.del)
    .patch(projectCtr.update);
 
export default router;