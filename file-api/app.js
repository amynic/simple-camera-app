const http = require("http");
const path = require("path");
const fs = require("fs");

const express = require("express");
const multer = require("multer");
const cors = require("cors");

const api  = require('./api');

const app = express();
const httpServer = http.createServer(app);

const PORT = process.env.PORT || 3000;

httpServer.listen(3000, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(cors());

// put the HTML file containing your form in a directory named "public" (relative to where this script is located)
app.get("/info", (req, res) => {res.send('hello')});



const handleError = (err, res) => {
  console.log('err', err);
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};

const upload = multer({
  dest: path.join(__dirname)
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});


app.post(
  "/upload",
  upload.single("file" /* name attribute of <file> element in your form */ ),
  (req, res) => {
    if(req.file) {
      console.log('req.file.path', req.file.path);
    }

    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "./uploads/image.png");

    if (path.extname(req.file.originalname).toLowerCase() === ".png") {
      fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res);

        // doi API call
        // const fileExists = fs.existsSync(targetPath);
        // console.log(`file ${targetPath} exists`);
        console.log(`target path ${targetPath}`);
        console.log('querying API');
        api.queryAPI(targetPath)
        .then((response) => {
          console.log('response from API')
          console.log(response);
          res
            .status(200)
            .json(response)
        },
        err => {
          console.log('something went wrong')
          res
            .status(401)
            .json(err)
        });

        // res
        //   .status(200)
        //   .contentType("text/plain")
        //   .end("File uploaded!");
      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);

        res
          .status(403)
          .contentType("text/plain")
          .end("Only .png files are allowed!");
      });
    }
  }
);