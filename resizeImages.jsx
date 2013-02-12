var srcFolder = Folder.selectDialog("入力フォルダを選択してください");

var dstFolder = Folder.selectDialog("出力フォルダを選択してください");

var outputWidth = parseInt(prompt("出力画像のピクセル幅を半角数値で入力してください", ""));
var outputHeight = parseInt(prompt("出力画像のピクセル高を半角数値で入力してください", ""));

var recursiveCopy = function(dir) {
  var srcFiles = dir.getFiles();
  for ( var i = 0; i < srcFiles.length; i++) {
    if (srcFiles[i].alias) {
      continue;
    }
    if (srcFiles[i].constructor.name !== 'File') {
      arguments.callee(srcFiles[i]);
      continue;
    }
    if (srcFiles[i].name.match(/\.png/i)) {
      open(srcFiles[i]);
      activeDocument.resizeImage(outputWidth, outputHeight);

      var dstFile = new File(dstFolder.fsName + '/' + srcFiles[i].name.substring(0, srcFiles[i].name.length - 4) + '.jpg');

      var webSaveOptions = new ExportOptionsSaveForWeb();
      webSaveOptions.format = SaveDocumentType.JPEG;
      webSaveOptions.optimized = true;
      webSaveOptions.quality = 60;
      activeDocument.exportDocument(dstFile, ExportType.SAVEFORWEB, webSaveOptions);

      activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    }

  }
};

recursiveCopy(srcFolder);
