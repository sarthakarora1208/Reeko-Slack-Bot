import gm from 'gm';
import fs from 'fs';
import path from 'path';

import {
  IMAGE_RIGHT_X,
  IMAGE_LEFT_X,
  IMAGE_Y,
  IMAGE_MAX_WIDTH,
  IMAGE_MAX_HEIGHT,
} from '../constants/imageMeasurements';
export const createBackgroundWithImage = async (
  backgroundImage: string,
  inputImagePath: string,
  outputFilePath: string
) => {
  return new Promise((resolve, reject) => {
    gm(path.join(__dirname, 'backgrounds', backgroundImage))
      .draw(
        `image Over ${IMAGE_RIGHT_X},${IMAGE_Y} ${IMAGE_MAX_WIDTH},${IMAGE_MAX_HEIGHT} ${inputImagePath}`
      )
      .stream(function (err, stdout, stderr) {
        //var writeStream = fs.createWriteStream(outputFilePath);
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(stdout.pipe(fs.createWriteStream(outputFilePath)));
      });
  });
};
