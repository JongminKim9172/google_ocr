const fs = require('fs');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch').default;
const path = require('path');

function compareImages(beforePath, afterPath, diffOutputPath = './screenshots/diff.png') {
  return new Promise((resolve, reject) => {
    const img1 = fs.createReadStream(beforePath).pipe(new PNG()).on('parsed', doneReading);
    const img2 = fs.createReadStream(afterPath).pipe(new PNG()).on('parsed', doneReading);

    let readCount = 0;

    function doneReading() {
      if (++readCount < 2) return;

      const { width, height } = img1;
      const diff = new PNG({ width, height });

      const diffPixels = pixelmatch(
        img1.data,
        img2.data,
        diff.data,
        width,
        height,
        { threshold: 0.1 }
      );

      // ✅ diff 이미지 저장
      diff.pack().pipe(fs.createWriteStream(diffOutputPath));
      console.log(`🖼️ pixelmatch diff 이미지 저장 완료 → ${diffOutputPath}`);

      resolve(diffPixels);
    }
  });
}

module.exports = { compareImages };
