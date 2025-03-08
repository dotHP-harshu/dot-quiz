const multer = require("multer");
const path = require('path')
const crypto = require('crypto')

const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, "./public/images");
    },
    filename:function(req, file, cb){
        crypto.randomBytes(12, (err, bytes)=>{
            let filename = bytes.toString('hex') + path.extname(file.originalname);
            cb(null, filename)
        })
    }
})

const upload = multer({storage});

module.exports = upload;