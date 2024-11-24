import * as donate from '../services/donation-service.js';
import {
    setResponse,
    setError
} from './response-handler.js';

/**
 * Searches for donations based on query parameters and returns the results.
 */
export const search = async (req, res) => {
    try {
        const params = {
            ...req.query
        }
        const data = await donate.search(params);
        setResponse(data, res);
    } catch (error) {
        setError(error, res);
    }
}

/**
 * Creates a new donation record with the data provided in the request body.
 */
export const post = async (req, res) => {
    try {
        const u = {
            ...req.body
        };
        const data = await donate.post(u);
        setResponse(data, res);
    } catch (error) {
        setError(error, res);
        console.log(error);
    }
}

/**
 * Retrieves a donation record by its ID provided in the request parameters.
 */
export const get = async (req, res) => {

    try {
        const notes = await donate.get(req.params.id);
        setResponse(notes, res);
    } catch (error) {
        setError(error, res);
    }

}

/**
 * Deletes a donation record by its ID provided in the request parameters.
 */
export const del = async (req, res) => {

    try {
        const notes = await donate.del(req.params.id);
        setResponse(notes, res);
    } catch (error) {
        setError(error, res);
    }

}

/**
 * Updates a donation record using the ID and new data provided in the request.
 */
export const update = async (req, res) => {
    try {
        const notes = await donate.update(req.params.id, req.body);
        setResponse(notes, res);
    } catch (error) {
        setError(error, res);
    }
}

/**
 * Filters donations based on criteria like userId and date range provided in the request query.
 */
export const filterBy = async (request, response) => {
    const {
        keyword,
        startDate,
        endDate
    } = request.query;
    let query = {};

    if (keyword) {
        query.userId = keyword;
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
        const notes = await donate.find(query);
        setResponse(notes, response);
    } catch (error) {
        setError(error, response);
    }
}