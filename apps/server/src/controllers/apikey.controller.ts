import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler.middleware';
import { HttpStatus } from '../configs/http.config';
import { createApiKeySchema, deleteApiKeySchema } from '../validators/apikey.validator';
import {
  createApiKeyService,
  deleteApiKeyService,
  getAllApiKeysService,
} from '../services/apikey.service';
import { UserDocument } from "../types";

export const createApiKeyController = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req.user as UserDocument)?._id?.toString();

  const { name } = createApiKeySchema.parse(req.body);

  const { rawKey } = await createApiKeyService(userId, name);

  return res.status(HttpStatus.OK).json({
    message: 'API key created successfully',
    key: rawKey,
  });
});

export const getAllApiKeysController = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req.user as UserDocument)?._id?.toString();

  const pagination = {
    pageSize: parseInt(req.query.pageSize as string) || 10,
    pageNumber: parseInt(req.query.pageNumber as string) || 1,
  };

  const result = await getAllApiKeysService(userId, pagination);

  return res.status(HttpStatus.OK).json({
    message: 'API keys retrieved successfully',
    ...result,
  });
});

export const deleteApiKeyController = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req.user as UserDocument)?._id?.toString();
    
  const { id } = deleteApiKeySchema.parse(req.params);

  const result = await deleteApiKeyService(userId, id);

  return res.status(HttpStatus.OK).json({
    message: 'API key deleted successfully',
    data: result,
  });
});
