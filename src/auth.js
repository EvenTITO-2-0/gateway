var admin = require("firebase-admin");

var serviceAccount = require("../firebasekey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

  
function firebaseAuthMiddleware(req, res, next) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No Bearer token provided.' });
  }

  const idToken = authorizationHeader.split('Bearer ')[1];
  
  admin.auth().verifyIdToken(idToken)
    .then((decodedToken) => {
      req.user = decodedToken;
      next();
    })
    .catch((error) => {
      console.error('Error verifying Firebase ID token:', error);
      return res.status(401).json({ error: 'Unauthorized.' });
    });
}


const setupAuth = (app, routes) => {
  routes.forEach(r => {
    if (r.auth) {
      app.use(r.url, firebaseAuthMiddleware, function (req, res, next) {
        next();
      });
    }
  })
}


exports.setupAuth = setupAuth
