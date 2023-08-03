const path = require("path");
const multer = require("multer");
const fs = require("fs");

// let defaultPath = path.resolve(__dirname, "../public/images");
let defaultPath = "public/images"
// let defaultPath = "public/images"
console.log(defaultPath);
const storage = multer.diskStorage({
    // destination: (req, file, cb) => {
    //     cb(null, defaultPath);
    // },
    destination: async (req, file, cb) => {
        const isDirectoryExist = fs.existsSync(path.resolve(__dirname, `${defaultPath}/${file.fieldname}`));
        if (!isDirectoryExist) {
            await fs.promises.mkdir(path.resolve(__dirname, `${defaultPath}/${file.fieldname}`), {
                recursive: true,
            });
        }
        cb(null, `${defaultPath}/${file.fieldname}`);
    },
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname +
            "-" +
            Date.now() +
            Math.round(Math.random() * 1000000000) +
            "." +
            file.mimetype.split("/")[1]
        );
    },
});

const maxSize = 2 * 1024 * 1024;
const fileFilter = (req, file, cb) => {
    const fileType = file.mimetype.split("/")[1];
    console.log(file);
    if (
        fileType === "png" ||
        fileType === "jpg" ||
        fileType === "jpeg" ||
        fileType === "gif"
    ) {
        cb(null, true);
    } else {
        cb(new Error("only png, jpg, jpeg, and gif formats are allowed"));
    }
};

exports.multerUpload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: maxSize
    },
});