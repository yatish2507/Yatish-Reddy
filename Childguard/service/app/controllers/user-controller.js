import * as user from '../services/user-service.js';
import {
    setResponse,
    setError
} from './response-handler.js';

/**
 * Authenticates a user based on email and password, sending back user data on success or an error on failure.
 */
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const { userData, error } = await user.login(email, password);
    if (error) {
        res.status(400).send({ message: "Please enter valid details", error });
    } else {
        setResponse(userData, res);
    }
};

/**
 * Searches for users based on query parameters and returns the matching results.
 */
export const search = async (req, res) => {
    try {
        const params = {
            ...req.query
        }
        const data = await user.search(params);
        setResponse(data, res);
    } catch (error) {
        setError(error, res);
    }
}

/**
 * Creates a new user with the data provided in the request body.
 */
export const post = async (req, res) => {
    try {
        const u = {
            ...req.body
        };
        const data = await user.post(u);
        setResponse(data, res);
    } catch (error) {
        setError(error, res);
        console.log(error);
    }
}

/**
 * Retrieves a specific user by their ID.
 */
export const get = async (req, res) => {
    try {
        const notes = await user.get(req.params.id);
        setResponse(notes, res);
    } catch (error) {
        setError(error, res);
    }
}

/**
 * Deletes a user identified by their ID.
 */
export const del = async (req, res) => {
    try {
        const notes = await user.del(req.params.id);
        setResponse(notes, res);
    } catch (error) {
        setError(error, res);
    }
}

/**
 * Updates an existing user using the ID and new data provided in the request.
 */
export const update = async (req, res) => {
    try {
        const notes = await user.update(req.params.id, req.body);
        setResponse(notes, res);
    } catch (error) {
        setError(error, res);
    }
}

/**
 * Filters users based on keyword search and date range criteria specified in the request query.
 */
export const filterBy = async (request, response) => {
    const {
        keyword,
        startDate,
        endDate
    } = request.query;
    let query = {};

    if (keyword) {
        query.$text = {
            $search: keyword
        };
    }
    if (startDate || endDate) {
        query.date = {};
        if (startDate) {
            query.date.$gte = new Date(`${startDate}T00:00:00.000Z`);
        }
        if (endDate) {
            query.date.$lte = new Date(`${endDate}T23:59:59.999Z`);
        }
    }
    try {
        const notes = await user.find(query);
        setResponse(notes, response);
    } catch (error) {
        setError(error, response);
    }
}