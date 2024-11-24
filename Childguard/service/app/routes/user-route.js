import express from "express";
import * as UserController from "../controllers/user-controller.js";

const router = express.Router();

/**
 * Root routes for user endpoint:
 * - GET: Search for users based on query parameters. The commented-out filterBy can be used for more complex filtering needs.
 * - POST: Create a new user.
 */
router.route('/')
    .get(UserController.search)
    .post(UserController.post);

/**
 * Specific user routes identified by a unique ID:
 * - GET: Retrieve detailed information about a specific user by ID.
 * - DELETE: Remove a user by ID.
 * - PATCH: Update specific fields of a user's profile by ID.
 */
router.route('/:id')
    .get(UserController.get)
    .delete(UserController.del)
    .patch(UserController.update);

/**
 * Additional route specifically for user login:
 * - POST: Handle user login requests.
 */
router.route('/login')
    .post(UserController.loginUser);

export default router;