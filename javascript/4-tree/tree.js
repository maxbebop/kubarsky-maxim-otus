const path = require('path');
const fs = require('fs');


const info = { files: [], folders: [] }

const getFilesFromDirectory = async (directoryPath, rootPath) => {
    const filesInDirectory = await fs.promises.readdir(directoryPath);
    await Promise.all(
        filesInDirectory.map(async (file) => {
            const filePath = path.join(directoryPath, file);
            const stats = await fs.promises.stat(filePath);

            if (stats.isDirectory()) {
                info.folders.push(filePath.replace(rootPath, ''));
                return getFilesFromDirectory(filePath, rootPath);
            } else {
                info.files.push(filePath.replace(rootPath, ''));
                return;
            }
        })
    );
};

const displayFiles = async () => {

    const dir = process.argv.slice(2)[1];
    await getFilesFromDirectory(dir, dir)
    console.log(info)
};

displayFiles();
