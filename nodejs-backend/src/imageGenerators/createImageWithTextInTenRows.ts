import gm from 'gm';
import fs from 'fs';
import path from 'path';

export const createImageWithTextInTenRows = (
  backgroundImage: string,
  fontColor = '#fff',
  fontFamily: string,
  fontSize: number,
  xAxis: number,
  yAxis: number,
  textFirstLine: string,
  textSecondLine: string,
  textThirdLine: string,
  textFourthLine: string,
  textFifthLine: string,
  textSixthLine: string,
  textSeventhLine: string,
  textEigthLine: string,
  textNinthLine: string,
  textTenthLine: string,
  outputFileName: string
) => {
  return new Promise((resolve, reject) => {
    let SPACE_BETWEEN_LINES = fontSize * 1.4;
    gm(`${backgroundImage}`)
      .fill(fontColor)
      .font(path.join(__dirname, 'assets', 'fonts', fontFamily), fontSize)
      .drawText(xAxis, yAxis, textFirstLine)
      .drawText(xAxis, yAxis + SPACE_BETWEEN_LINES, textSecondLine)
      .drawText(xAxis, yAxis + 2 * SPACE_BETWEEN_LINES, textThirdLine)
      .drawText(xAxis, yAxis + 3 * SPACE_BETWEEN_LINES, textFourthLine)
      .drawText(xAxis, yAxis + 4 * SPACE_BETWEEN_LINES, textFifthLine)
      .drawText(xAxis, yAxis + 5 * SPACE_BETWEEN_LINES, textSixthLine)
      .drawText(xAxis, yAxis + 6 * SPACE_BETWEEN_LINES, textSeventhLine)
      .drawText(xAxis, yAxis + 7 * SPACE_BETWEEN_LINES, textEigthLine)
      .drawText(xAxis, yAxis + 8 * SPACE_BETWEEN_LINES, textNinthLine)
      .drawText(xAxis, yAxis + 9 * SPACE_BETWEEN_LINES, textTenthLine)
      .stream(function (err, stdout, stderr) {
        if (err) {
          console.log(err);
          reject(err);
        }
        if (stderr) {
          //console.log(err);
        }
        resolve(stdout.pipe(fs.createWriteStream(outputFileName)));
      });
  });
};
