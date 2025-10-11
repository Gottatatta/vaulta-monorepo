import { Router } from 'express';
import { getUserAnalyticsWithChartController } from '../../controllers/analytic.controller';

const analyticsRoutes = Router();

analyticsRoutes.get('/user', getUserAnalyticsWithChartController);

export default analyticsRoutes;
