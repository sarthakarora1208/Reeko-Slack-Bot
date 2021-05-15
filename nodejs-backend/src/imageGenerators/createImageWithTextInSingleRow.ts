import gm from 'gm';
import fs from 'fs';
import path from 'path';

export const createImageWithTextInSingleRow = async (
  backgroundImage: string,
  fontColor = '#fff',
  fontFamily: string,
  fontSize: number,
  xAxis: number,
  yAxis: number,
  text: string,
  outputFileName: string
) => {
  return new Promise((resolve, reject) => {
    gm(`${backgroundImage}`)
      .fill(fontColor)
      .font(path.join(__dirname, 'fonts', fontFamily), fontSize)
      .drawText(xAxis, yAxis, text)
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
