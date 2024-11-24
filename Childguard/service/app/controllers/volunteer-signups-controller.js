import * as volunteerSignupService from '../services/volunteer-signups-service.js';
import {
    setResponse,
    setError
} from './response-handler.js';

/**
 * Searches for volunteer signups based on query parameters and returns the results.
 */
export const search = async (req, res) => {
    try {
        const params = {
            ...req.query
        }
        const data = await volunteerSignupService.search(params);
        setResponse(data, res);
    } catch (error) {
        setError(error, res);
    }
}

/**
 * Registers a new volunteer signup using the data provided in the request body.
 */
export const post = async (req, res) => {
    try {
        const u = {
            ...req.body
        };
        const data = await volunteerSignupService.post(u);
        setResponse(data, res);
    } catch (error) {
        setError(error, res);
        console.log(error);
    }
}

/**
 * Retrieves a specific volunteer signup by its ID.
 */
export const get = async (req, res) => {
    try {
        const notes = await volunteerSignupService.get(req.params.id);
        setResponse(notes, res);
    } catch (error) {
        setError(error, res);
    }
}

/**
 * Deletes a volunteer signup identified by its ID.
 */
export const del = async (req, res) => {
    try {
        const notes = await volunteerSignupService.del(req.params.id);
        setResponse(notes, res);
    } catch (error) {
        setError(error, res);
    }
}

/**
 * Updates an existing volunteer signup using the ID and new data provided in the request.
 */
export const update = async (req, res) => {
    try {
        const notes = await volunteerSignupService.update(req.params.id, req.body);
        setResponse(notes, res);
    } catch (error) {
        setError(error, res);
    }
}

/**
 * Filters volunteer signups based on criteria such as user ID and date range specified in the request query.
 */
export const filterBy = async (request, response) => {
    const {
        keyword,
        startDate,
        endDate
    } = request.query;
    let query = {};

    if (keyword) {

        query.userId=keyword;

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
        const notes = await volunteerSignupService.find(query);
        setResponse(notes, response);
    } catch (error) {
        setError(error, response);
    }
}