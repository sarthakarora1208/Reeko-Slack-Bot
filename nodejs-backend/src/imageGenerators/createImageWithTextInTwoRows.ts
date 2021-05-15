import gm from 'gm';
import fs from 'fs';
import path from 'path';

export const createImageWithTextInTwoRows = (
  backgroundImage: string,
  fontColor = '#fff',
  fontFamily: string,
  fontSize: number,
  xAxis: number,
  yAxis: number,
  textFirstLine: string,
  textSecondLine: string,
  outputFileName: string
) => {
  return new Promise((resolve, reject) => {
    let SPACE_BETWEEN_LINES = fontSize * 1.4;
    gm(`${backgroundImage}`)
      .fill(fontColor)
      .font(path.join(__dirname, 'fonts', fontFamily), fontSize)
      .drawText(xAxis, yAxis, textFirstLine)
      .drawText(xAxis, yAxis + SPACE_BETWEEN_LINES, textSecondLine)
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
