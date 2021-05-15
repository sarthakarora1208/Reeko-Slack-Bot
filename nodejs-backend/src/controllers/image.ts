import { imageCreatorUtility } from './../imageGenerators/imageCreatorUtility';
import asyncHandler from '../middleware/async';
import { Request, Response, NextFunction } from 'express';
import { BACKGROUND_TEMPLATE_1 } from '../constants/templateNames';
const { v4: uuidv4 } = require('uuid');
//@desc
//@route		POST /api/v1/
//@access		Public

export const createImage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { fileName, summary } = req.body;
    console.log(summary);
    const id = uuidv4();
    let s3_url = await imageCreatorUtility(id, summary, BACKGROUND_TEMPLATE_1);
    res.status(200).json({
      success: true,
      data: s3_url,
    });
  }
);
