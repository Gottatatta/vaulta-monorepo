import { Router } from 'express';
import { passportAuthenticateJwt } from "../../configs/passportJwt.config";

import authRoutes from './auth.route';
import filesRoutes from "./file.route";
import analyticsRoutes from "./analytic.route";
import apikeyRoutes from "./apikey.route";


const internalRoutes = Router();

internalRoutes.use('/auth', authRoutes);
internalRoutes.use('/files', passportAuthenticateJwt, filesRoutes);
internalRoutes.use('/analytics', passportAuthenticateJwt, analyticsRoutes);
internalRoutes.use('/apikey', passportAuthenticateJwt, apikeyRoutes);

export default internalRoutes;
