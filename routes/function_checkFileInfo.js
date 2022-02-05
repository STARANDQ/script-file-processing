const func = async function(n, dataFile, UserData, FileName, FileNameTemp, counter, fileNames, myId) {

  return new Promise(async (resolve, reject) => {
    if(n === -1) {
      resolve()
      // return;
    } else {

      // function timeout(ms) {
      //     return new Promise(resolve => setTimeout(resolve, ms));
      // }
      //
      //
      // await timeout(3000);
      // func(n - 1, dataFile, UserData, FileName, FileNameTemp, counter, fileNames, myId)
      //   .then(resolve).catch(reject)



      if (await checkFileName(UserData.fileIdentification, dataFile[n].fileName)) {
        // counter++;
        // console.log({fileNames:fileNames});


        //ERROR
        await fs.readFile(((path.dirname(require.main.filename) + "/uploads/" + dataFile[n].fileNameUploads)), "utf8",
          async function (error, data) {
            if (error) Logger.Error(Logger.Mode.FILE, error) // если возникла ошибка
            //Create File
            if (FileName !== FileNameTemp) {
              FileNameTemp = FileName;
              await fs.open((path.dirname(require.main.filename) + "/ResultFile/" + FileNameTemp), 'a', async function () {
                await fs.appendFileSync(((path.dirname(require.main.filename) + "/ResultFile/" + FileNameTemp)), `\n${data}`);
              });
            } else {
              await fs.appendFileSync(((path.dirname(require.main.filename) + "/ResultFile/" + FileName)), `\n${data}`);
            }

            await ResultFile.findOne({
              fileNameUploads: FileName,
              userName: UserData.fileIdentification
            }, async (err, data) => {


              if (!data) {

                let newFileData = new ResultFile({
                  fileName: FileName + ".txt",
                  fileNameUploads: FileName,
                  fileStatus: "",
                  userName: UserData.fileIdentification,
                  counter: 1
                });

                await newFileData.save(async (err, newFileData) => {
                  if (err)
                    Logger.Error(Logger.Mode.FILE, err);
                  else {
                    Logger.Message(Logger.Mode.FILE, 'Add File ' + newFileData.fileName)
                  }
                  await FileData.updateMany({_id: dataFile[n]._id},
                    {$set: {fileStatus: "CHECKED"}}, async function (err, result) {
                      Logger.Message(Logger.Mode.FILE, "File " + dataFile[n].fileName + " has been checked");
                      func(n - 1, dataFile, UserData, FileName, FileNameTemp, counter + 1, fileNames, myId)
                        .then(resolve).catch(reject);
                    });
                });
              } else {
                await ResultFile.updateOne({fileNameUploads: FileName},
                  {$set: {counter: counter}}, async function (err, result) {

                    await FileData.updateMany({_id: dataFile[n]._id},
                      {$set: {fileStatus: "CHECKED"}}, async function (err, result) {
                        Logger.Message(Logger.Mode.FILE, "File " + dataFile[n].fileName + " has been checked");
                        func(n - 1, dataFile, UserData, FileName, FileNameTemp, counter + 1, fileNames, myId)
                          .then(resolve).catch(reject);
                      });
                    return;
                  });
              }
            });

          });


      }
      else func(n - 1, dataFile, UserData, FileName, FileNameTemp, counter, fileNames, myId)
        .then(resolve).catch(reject);

    }

  })

};

module.exports = func;
