import * as Report from '../services/safety-report-service.js';
import {
    setResponse,
    setError
} from './response-handler.js';

/**
 * Searches for safety reports based on query parameters and returns the results.
 */
export const search = async (req, res) => {
    try {
        const params = {
            ...req.query
        }
        const data = await Report.search(params);
        setResponse(data, res);
    } catch (error) {
        setError(error, res);
    }
}

/**
 * Creates a new safety report with the data provided in the request body.
 */
export const post = async (req, res) => {
    try {
        const u = {
            ...req.body
        };
        const data = await Report.post(u);
        setResponse(data, res);
    } catch (error) {
        setError(error, res);
        console.log(error);
    }
}

/**
 * Retrieves a specific safety report by its ID.
 */
export const get = async (req, res) => {

    try {
        const notes = await Report.get(req.params.id);
        setResponse(notes, res);
    } catch (error) {
        setError(error, res);
    }

}

/**
 * Deletes a safety report identified by its ID.
 */
export const del = async (req, res) => {
    try {
        const notes = await Report.del(req.params.id);
        setResponse(notes, res);
    } catch (error) {
        setError(error, res);
    }
}


/**
 * Updates an existing safety report using the ID and new data provided in the request.
 */
export const update = async (req, res) => {
    try {
        const notes = await Report.update(req.params.id, req.body);
        setResponse(notes, res);
    } catch (error) {
        setError(error, res);
    }
}

/**
 * Filters safety reports based on keyword search and date range criteria specified in the request query.
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
        const notes = await Report.find(query);
        setResponse(notes, response);
    } catch (error) {
        setError(error, response);
    }
}