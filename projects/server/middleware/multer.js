const multer = require("multer");
const fs = require("fs");

<<<<<<< HEAD
let defaultPath = "public/images";
=======
let defaultPath = "src/public";
>>>>>>> 5e96549f17b2dc9fdedc5be1e131c66451da1b51
const storage = multer.diskStorage({
    // destination: (req, file, cb) => {
    //     cb(null, defaultPath);
    // },
    destination: async (req, file, cb) => {
        const isDirectoryExist = fs.existsSync(`${defaultPath}/${file.fieldname}`);
        if (!isDirectoryExist) {
            await fs.promises.mkdir(`${defaultPath}/${file.fieldname}`, {
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

const maxSize = 1 * 1024 * 1024;
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