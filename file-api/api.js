const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');

//running locally - uncomment
require('dotenv').config()

const {
  API_KEY
} = process.env;
const {
  URL
} = process.env;

console.log('api key', API_KEY);
console.log('url', URL);



async function getResponsePredictionApi(body, contentType, isImage) {
  const urlAppend = isImage ? '/image' : '/url';
  try {
    const fullURL = URL + urlAppend;

    console.log(`running fetch POST ${contentType}`);
    console.log('full url', fullURL)
    const response = await fetch(fullURL, {
      headers: {
        "Prediction-Key": API_KEY,
        "Content-Type": contentType
      },
      method: "POST",
      body: body
    });
    const json = response.json();
    return json;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// create from stream
function createBodyFromFile(path) {
  // console.log(`Filename ${path.join(__dirname,filename)}`);
  // return fs.readFileSync(path.join(__dirname, filename))
  return fs.readFileSync(path);
}

function createBodyFromURL(url) {
  return JSON.stringify(({
    Url: url
  }));
}

const responseHandler = (response) => {
  console.log('response', response);
  const {
    predictions
  } = response;
  if (!predictions.length) return;

  for (var i = 0; i < predictions.length; i++) {
    const {
      probability,
      tagName
    } = predictions[i];
    console.log(`${tagName} with ${probability * 100} % likelyhood`);
  }
}

const errorHandler = (err) => console.error(err);


// getResponsePredictionApi(createBodyFromFile('wrench-example.jpg'), 'application/octet-stream', true)
//  .then(responseHandler, errorHandler);

function queryAPI(path) {
  return getResponsePredictionApi(createBodyFromFile(path), 'application/octet-stream', true)
    //.then(responseHandler, errorHandler);
}

module.exports = {
  queryAPI
}