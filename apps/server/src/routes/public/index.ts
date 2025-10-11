import { Router } from "express";
import { publicGetFileUrlController } from "../../controllers/file.controller";
import { Env } from "../../configs/env.config";
import v1Routes from "./v1";

const publicRoutes = Router();

publicRoutes.use(`${Env.BASE_PATH}/v1`, v1Routes);

publicRoutes.use("/files/:fileId/view", publicGetFileUrlController);

export default publicRoutes;
