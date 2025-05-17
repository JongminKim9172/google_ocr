const vision = require('@google-cloud/vision');
const path = require('path');

const client = new vision.ImageAnnotatorClient({
  keyFilename: path.resolve(__dirname, '../vision-api-user.json'), // 키 경로 변경 가능
});

module.exports = { client };
