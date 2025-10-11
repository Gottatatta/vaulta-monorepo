import { Router } from "express";
import { multiUpload } from "../../../configs/multer.config";
import { CheckStorageAvailability } from "../../../middlewares/checkStorage.middleware";
import { uploadFilesViaApiController } from "../../../controllers/file.controller";

const fileV1Routes = Router();

fileV1Routes.post(
  "/upload",
  multiUpload,
  CheckStorageAvailability,
  uploadFilesViaApiController
);

export default fileV1Routes;
