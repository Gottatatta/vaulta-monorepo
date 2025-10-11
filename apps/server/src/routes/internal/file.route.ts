import { Router } from 'express';
import { multiUpload } from '../../configs/multer.config';
import {
  deleteFilesController,
  downloadFilesController,
  getAllFilesController,
  uploadFilesViaWebController,
} from '../../controllers/file.controller';
import { CheckStorageAvailability } from '../../middlewares/checkStorage.middleware';

const filesRoutes = Router();

filesRoutes.post('/upload', multiUpload, CheckStorageAvailability, uploadFilesViaWebController);

filesRoutes.post('/download', downloadFilesController);
filesRoutes.get('/all', getAllFilesController);
filesRoutes.delete('/bulk-delete', deleteFilesController);

export default filesRoutes;
