import { GENERATED_IMAGES, BACKGROUNDS } from './../constants/routes';
import path from 'path';
import { getSpacesIndexArray } from '../utils/getSpacesIndexArray';
import { createImageWithTextInSingleRow } from './createImageWithTextInSingleRow';
import { findTemplate } from '../utils/findTemplate';
import {
  TEXT_LEFT_X,
  TEXT_Y_SINGLE_LINE,
} from '../constants/imageMeasurements';
import { createBackgroundWithImage } from './createBackgroundWithImage';
import { createImageWithTextInTwoRows } from './createImageWithTextInTwoRows';
import { createImageWithTextInThreeRows } from './createImageWithTextInThreeRows';
import { createImageWithTextInFourRows } from './createImageWithTextInFourRows';
import { createImageWithTextInFiveRows } from './createImageWithTextInFiveRows';
import { createImageWithTextInSixRows } from './createImageWithTextInSixRows';
import { createImageWithTextInSevenRows } from './createImageWithTextInSevenRows';
import { createImageWithTextInEightRows } from './createImageWithTextInEightRows';
import { createImageWithTextInNineRows } from './createImageWithTextInNineRows';
import { createImageWithTextInTenRows } from './createImageWithTextInTenRows';

const fsPromises = require('fs').promises;
import { s3bucket } from '../server';
import { BUCKET_NAME } from '../constants/misc';
import { sleep } from '../utils/sleep';
import { createImageWithTextInElevenRows } from './createImageWithTextInElevenRows';

export const imageCreatorUtility = async (
  id: string,
  text: string,
  templateName: string
) => {
  let i = 0;
  let FOLDER_NAME = path.join(__dirname, GENERATED_IMAGES);

  let template = findTemplate(templateName);
  let { font, background, name } = template;
  let { family, size, color } = font;

  let FINAL_IMAGE_PATH = path.join(__dirname, GENERATED_IMAGES, `${id}.png`);

  let BACKGROUND_IMAGE_PATH = path.join(__dirname, BACKGROUNDS, background);

  let spacesIndexArray = getSpacesIndexArray(text);
  if (text.length <= 42) {
    await createImageWithTextInSingleRow(
      BACKGROUND_IMAGE_PATH,
      color,
      family,
      size,
      TEXT_LEFT_X,
      TEXT_Y_SINGLE_LINE,
      text,
      FINAL_IMAGE_PATH
    );
  } else if (text.length > 42 && text.length <= 82) {
    await createImageWithTextInTwoRows(
      BACKGROUND_IMAGE_PATH,
      color,
      family,
      size,
      TEXT_LEFT_X,
      TEXT_Y_SINGLE_LINE,
      text.slice(0, spacesIndexArray[0]),
      text.slice(spacesIndexArray[0], text.length),
      FINAL_IMAGE_PATH
    );
  } else if (text.length > 82 && text.length <= 122) {
    await createImageWithTextInThreeRows(
      BACKGROUND_IMAGE_PATH,
      color,
      family,
      size,
      TEXT_LEFT_X,
      TEXT_Y_SINGLE_LINE,
      text.slice(0, spacesIndexArray[0]),
      text.slice(spacesIndexArray[0], spacesIndexArray[1]),
      text.slice(spacesIndexArray[1], text.length),
      FINAL_IMAGE_PATH
    );
  } else if (text.length > 122 && text.length <= 162) {
    await createImageWithTextInFourRows(
      BACKGROUND_IMAGE_PATH,
      color,
      family,
      size,
      TEXT_LEFT_X,
      TEXT_Y_SINGLE_LINE,
      text.slice(0, spacesIndexArray[0]),
      text.slice(spacesIndexArray[0], spacesIndexArray[1]),
      text.slice(spacesIndexArray[1], spacesIndexArray[2]),
      text.slice(spacesIndexArray[2], text.length),
      FINAL_IMAGE_PATH
    );
  } else if (text.length > 162 && text.length <= 202) {
    let YCoordinate = TEXT_Y_SINGLE_LINE - 1.5 * size;
    await createImageWithTextInFiveRows(
      BACKGROUND_IMAGE_PATH,
      color,
      family,
      size,
      TEXT_LEFT_X,
      YCoordinate,
      text.slice(0, spacesIndexArray[0]),
      text.slice(spacesIndexArray[0], spacesIndexArray[1]),
      text.slice(spacesIndexArray[1], spacesIndexArray[2]),
      text.slice(spacesIndexArray[2], spacesIndexArray[3]),
      text.slice(spacesIndexArray[3], text.length),
      FINAL_IMAGE_PATH
    );
  } else if (text.length > 202 && text.length <= 242) {
    let YCoordinate = TEXT_Y_SINGLE_LINE - 1.75 * size;
    await createImageWithTextInSixRows(
      BACKGROUND_IMAGE_PATH,
      color,
      family,
      size,
      TEXT_LEFT_X,
      YCoordinate,
      text.slice(0, spacesIndexArray[0]),
      text.slice(spacesIndexArray[0], spacesIndexArray[1]),
      text.slice(spacesIndexArray[1], spacesIndexArray[2]),
      text.slice(spacesIndexArray[2], spacesIndexArray[3]),
      text.slice(spacesIndexArray[3], spacesIndexArray[4]),
      text.slice(spacesIndexArray[4], text.length),
      FINAL_IMAGE_PATH
    );
  } else if (text.length > 242 && text.length <= 282) {
    let YCoordinate = TEXT_Y_SINGLE_LINE - 2 * size;
    await createImageWithTextInSevenRows(
      BACKGROUND_IMAGE_PATH,
      color,
      family,
      size,
      TEXT_LEFT_X,
      YCoordinate,
      text.slice(0, spacesIndexArray[0]),
      text.slice(spacesIndexArray[0], spacesIndexArray[1]),
      text.slice(spacesIndexArray[1], spacesIndexArray[2]),
      text.slice(spacesIndexArray[2], spacesIndexArray[3]),
      text.slice(spacesIndexArray[3], spacesIndexArray[4]),
      text.slice(spacesIndexArray[4], spacesIndexArray[5]),
      text.slice(spacesIndexArray[5], text.length),
      FINAL_IMAGE_PATH
    );
  } else if (text.length > 282 && text.length <= 322) {
    let YCoordinate = TEXT_Y_SINGLE_LINE - 2.25 * size;
    await createImageWithTextInEightRows(
      BACKGROUND_IMAGE_PATH,
      color,
      family,
      size,
      TEXT_LEFT_X,
      YCoordinate,
      text.slice(0, spacesIndexArray[0]),
      text.slice(spacesIndexArray[0], spacesIndexArray[1]),
      text.slice(spacesIndexArray[1], spacesIndexArray[2]),
      text.slice(spacesIndexArray[2], spacesIndexArray[3]),
      text.slice(spacesIndexArray[3], spacesIndexArray[4]),
      text.slice(spacesIndexArray[4], spacesIndexArray[5]),
      text.slice(spacesIndexArray[5], spacesIndexArray[6]),
      text.slice(spacesIndexArray[6], text.length),
      FINAL_IMAGE_PATH
    );
  } else if (text.length > 322 && text.length <= 362) {
    let YCoordinate = TEXT_Y_SINGLE_LINE - 3.25 * size;
    await createImageWithTextInNineRows(
      BACKGROUND_IMAGE_PATH,
      color,
      family,
      size,
      TEXT_LEFT_X,
      YCoordinate,
      text.slice(0, spacesIndexArray[0]),
      text.slice(spacesIndexArray[0], spacesIndexArray[1]),
      text.slice(spacesIndexArray[1], spacesIndexArray[2]),
      text.slice(spacesIndexArray[2], spacesIndexArray[3]),
      text.slice(spacesIndexArray[3], spacesIndexArray[4]),
      text.slice(spacesIndexArray[4], spacesIndexArray[5]),
      text.slice(spacesIndexArray[5], spacesIndexArray[6]),
      text.slice(spacesIndexArray[6], spacesIndexArray[7]),
      text.slice(spacesIndexArray[7], text.length),
      FINAL_IMAGE_PATH
    );
  } else if (text.length > 362 && text.length <= 402) {
    let YCoordinate = TEXT_Y_SINGLE_LINE - 3.75 * size;
    await createImageWithTextInTenRows(
      BACKGROUND_IMAGE_PATH,
      color,
      family,
      size,
      TEXT_LEFT_X,
      YCoordinate,
      text.slice(0, spacesIndexArray[0]),
      text.slice(spacesIndexArray[0], spacesIndexArray[1]),
      text.slice(spacesIndexArray[1], spacesIndexArray[2]),
      text.slice(spacesIndexArray[2], spacesIndexArray[3]),
      text.slice(spacesIndexArray[3], spacesIndexArray[4]),
      text.slice(spacesIndexArray[4], spacesIndexArray[5]),
      text.slice(spacesIndexArray[5], spacesIndexArray[6]),
      text.slice(spacesIndexArray[6], spacesIndexArray[7]),
      text.slice(spacesIndexArray[7], spacesIndexArray[8]),
      text.slice(spacesIndexArray[8], text.length),
      FINAL_IMAGE_PATH
    );
  } else {
    let YCoordinate = TEXT_Y_SINGLE_LINE - 4.0 * size;
    await createImageWithTextInElevenRows(
      BACKGROUND_IMAGE_PATH,
      color,
      family,
      size,
      TEXT_LEFT_X,
      YCoordinate,
      text.slice(0, spacesIndexArray[0]),
      text.slice(spacesIndexArray[0], spacesIndexArray[1]),
      text.slice(spacesIndexArray[1], spacesIndexArray[2]),
      text.slice(spacesIndexArray[2], spacesIndexArray[3]),
      text.slice(spacesIndexArray[3], spacesIndexArray[4]),
      text.slice(spacesIndexArray[4], spacesIndexArray[5]),
      text.slice(spacesIndexArray[5], spacesIndexArray[6]),
      text.slice(spacesIndexArray[6], spacesIndexArray[7]),
      text.slice(spacesIndexArray[7], spacesIndexArray[8]),
      text.slice(spacesIndexArray[8], spacesIndexArray[9]),
      text.slice(spacesIndexArray[9], text.length),
      FINAL_IMAGE_PATH
    );
  }
  await sleep(2000);

  let imageFile = await fsPromises.readFile(FINAL_IMAGE_PATH);
  let params = {
    Bucket: BUCKET_NAME,
    Key: `${id}-image.png`,
    Body: imageFile,
  };
  await s3bucket.createBucket({ Bucket: BUCKET_NAME }).promise();

  let data = await s3bucket.upload(params).promise();
  console.log(data.Location);
  return data.Location;
};
