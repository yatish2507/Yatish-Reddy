import userRouter from './user-route.js';
import resourceRouter from './educational-resource-route.js';
import healthRouter from './health-resource-route.js';
import reportRouter from './safety-report-route.js';
import projectRouter from './project-route.js';
import volunteerSignupRouter from './volunteer-signup-route.js';
import DonateRouter from './donation-route.js';

/**
 * Initializes all routes for the application and associates them with their respective base paths.
 * This function is called to set up all the routers on the provided Express application.
 * 
 * @param {Object} app - The Express application to which the routes will be added.
 */
const initializeRoutes = (app) => {
    app.use('/users', userRouter);
    app.use('/eduResources', resourceRouter);
    app.use('/healthResources', healthRouter);
    app.use('/reports', reportRouter);
    app.use('/projects', projectRouter);
    app.use('/volunteerSignups', volunteerSignupRouter);
    app.use('/donate', DonateRouter);
}

export default initializeRoutes;