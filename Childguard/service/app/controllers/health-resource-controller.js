import * as Resource from '../services/health-resource-service.js';
import {
    setResponse,
    setError
} from './response-handler.js';

/**
 * Searches for health resources based on query parameters provided in the request and returns matching results.
 */
export const search = async (req, res) => {
    try {
        const params = {
            ...req.query
        }
        const data = await Resource.search(params);
        setResponse(data, res);
    } catch (error) {
        setError(error, res);
    }
}

/**
 * Creates a new health resource using the data provided in the request body.
 */
export const post = async (req, res) => {
    try {
        const u = {
            ...req.body
        };
        const data = await Resource.post(u);
        setResponse(data, res);
    } catch (error) {
        setError(error, res);
        console.log(error);
    }
}

/**
 * Retrieves a specific health resource by its ID provided in the request parameters.
 */
export const get = async (req, res) => {
    try {
        const notes = await Resource.get(req.params.id);
        setResponse(notes, res);
    } catch (error) {
        setError(error, res);
    }
}

/**
 * Deletes a health resource identified by its ID from the request parameters.
 */
export const del = async (req, res) => {
    try {
        const notes = await Resource.del(req.params.id);
        setResponse(notes, res);
    } catch (error) {
        setError(error, res);
    }
}

/**
 * Updates an existing health resource using the ID and new data provided in the request.
 */
export const update = async (req, res) => {
    try {
        const notes = await Resource.update(req.params.id, req.body);
        setResponse(notes, res);
    } catch (error) {
        setError(error, res);
    }
}

/**
 * Filters health resources based on keyword search and date range criteria specified in the request query.
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
        const notes = await Resource.find(query);
        setResponse(notes, response);
    } catch (error) {
        setError(error, response);
    }
}