import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import apiSpec from '../openapi.json';

import * as UserController from './controllers/user';
import * as BlogController from './controllers/blogs';

const swaggerUiOptions = {
	customCss: '.swagger-ui .topbar { display: none }'
};

const router = Router();

// User routes
router.post('/user/add', UserController.add);
router.get('/user/search', UserController.search);
router.get('/user/all', UserController.all);

// Blog routes 
router.post('/blogs/add', BlogController.add);
router.get('/blogs/search', BlogController.search);
router.get('/blogs/:id', BlogController.getById);
router.get('/blogs', BlogController.all);

// Dev routes
console.log('ENVIRONMENT:', process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {
	router.use('/dev/api-docs', swaggerUi.serve);
	router.get('/dev/api-docs', swaggerUi.setup(apiSpec, swaggerUiOptions));
	router.post('/dev/seed', BlogController.seed);
}

export default router;
