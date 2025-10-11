import { Response, Request } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler.middleware';
import { HttpStatus } from '../configs/http.config';
import { getUserAnalyticsWithChartService } from '../services/analytic.service';
import { UserDocument } from "../types";

export const getUserAnalyticsWithChartController = asyncHandler(
  async (req: Request, res: Response) => {
  const userId = (req.user as UserDocument)?._id?.toString();

    const { from, to } = req.query;

    const filter = {
      dateFrom: from ? new Date(from as string) : undefined,
      dateTo: from ? new Date(to as string) : undefined,
    };

    const result = await getUserAnalyticsWithChartService(userId, filter);

    return res.status(HttpStatus.OK).json({
      message: 'User analytics retrieved successfully',
      ...result,
    });
  },
);
