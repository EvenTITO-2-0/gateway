# Gateway

Gateway Service for the Evetito Platform.

## Environment variables
In the file `.env_example` are all the environment variables listed.

## Firebase Setup
This service uses Firebase to authenticate users. Users send their firebase access token, and the gateway validates the token with Firebase services. This is done using the Firebase Admin SDK.
To set up firebase admin, follow this tutorial: 
https://firebase.google.com/docs/admin/setup 

After doing the tutorial, you should have a firebase admin token, which must be pasted in the `.env` file, with the same format as the `.env_example` file. The authentication credentials for the firebase project must also be pasted in the frontend.

## Run Gateway with Docker
```bash
docker build -t gateway:latest .
docker compose up
```

## Run Gateway with node
```bash
npm install
node app/index.js
```

## Backend Documentation
To view the backend Swagger documentation, go to `/api/v1/docs`.

## Other Services
See also
- Backend: https://github.com/EvenTITO/backend
- Frontend: https://github.com/EvenTITO/eventito-frontend
