import * as project from '../services/project-service.js';
import {
    setResponse,
    setError
} from './response-handler.js';

/**
 * Searches projects based on query parameters provided in the request and returns the matching results.
 */
export const search = async (req, res) => {
    try {
        const params = {
            ...req.query
        }
        const data = await project.search(params);
        setResponse(data, res);
    } catch (error) {
        setError(error, res);
    }
}
 
/**
 * Creates a new project using the data provided in the request body.
 */
export const post = async (req, res) => {
    try {
        const u = {
            ...req.body
        };
        const data = await project.post(u);
        setResponse(data, res);
    } catch (error) {
        setError(error, res);
        console.log(error);
    }
}
 
/**
 * Retrieves a specific project by its ID.
 */
export const get = async (req, res) => {
 
    try {
        const notes = await project.get(req.params.id);
        setResponse(notes, res);
    } catch (error) {
        setError(error, res);
    }
 
}
 
/**
 * Retrieves multiple projects based on a list of IDs provided via query parameters.
 */
export const getMultiple = async (req, res) => {
    try {
        const ids = req.query.ids.split(',');
        const projects = await project.getMultiple(ids);
        setResponse(projects, res);
    } catch (error) {
        setError(error, res);
    }
}
 
/**
 * Deletes a project identified by its ID.
 */
export const del = async (req, res) => {
    try {
        const notes = await project.del(req.params.id);
        setResponse(notes, res);
    } catch (error) {
        setError(error, res);
    }
}
 
/**
 * Updates an existing project using the ID and new data provided in the request.
 */
export const update = async (req, res) => {
    try {
        const notes = await project.update(req.params.id, req.body);
        setResponse(notes, res);
    } catch (error) {
        setError(error, res);
    }
}

/**
 * Filters projects based on criteria such as keywords and date range specified in the request query.
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
        const notes = await project.find(query);
        setResponse(notes, response);
    } catch (error) {
        setError(error, response);
    }
}