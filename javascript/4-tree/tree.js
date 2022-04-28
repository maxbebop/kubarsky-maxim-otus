const path = require('path');
const fs = require('fs');


const info = { files: [], folders: [] }

const getFilesFromDirectory = async (directoryPath) => {
    const filesInDirectory = await fs.promises.readdir(directoryPath);
    await Promise.all(
        filesInDirectory.map(async (file) => {
            const filePath = path.join(directoryPath, file);
            const stats = await fs.promises.stat(filePath);

            if (stats.isDirectory()) {
                info.folders.push(filePath);
                return getFilesFromDirectory(filePath);
            } else {
                info.files.push(filePath);
                return;
            }
        })
    );
};

const displayFiles = async () => {

    const dir = process.argv.slice(2)[1];
    await getFilesFromDirectory(dir)
    console.log(info)
};

displayFiles();
