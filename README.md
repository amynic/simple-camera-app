# simple-camera-app
simple HTML, CSS and JavaScript web application

## Prereqs

1. Install Node.js, https://nodejs.org/en/

2. at the terminal run

```
npm install http-server -g
```

## frontend

```
cd file-web
http-server -p 5000
```
Now we have a HTTP server up and running at port 5000.
Navigate to http://localhost:5000

## backend

create a `.env` file under `file-api`. It should have the following content:

```
API_KEY = 'my api key'
URL = 'a url to the custom vision project and its iteration' // do not specify url or image at the end, the code does that
```

```
cd file-api
npm install
npm start
```
This should bring up the backend running at http://localhost:3000


## use app

On the desktop you need to select a file of type `.png` in the file input
The textarea element should be populated with a response

On your phone it acts differently, it should use the camera



