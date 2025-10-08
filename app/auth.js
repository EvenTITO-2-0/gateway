var admin = require("firebase-admin");

var serviceAccount = JSON.parse(process.env.FIREBASE_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const firebaseAuthMiddleware = (exceptions) => {
  return (req, res, next) => {
    if (exceptions.includes(req.path)) {
      next();
      return;
    }


    const pathOnly = (req.originalUrl || req.path).split('?')[0];

    const webhookRegex = /^(?:\/api\/v1)?\/events\/[a-f0-9\-]+\/provider\/webhook\/?$/i;
    const returnsRegex = /^(?:\/api\/v1)?\/events\/[a-f0-9\-]+\/provider\/return\/(success|failure|pending)\/?$/i;

    if (webhookRegex.test(pathOnly) || returnsRegex.test(pathOnly)) {
      next();
      return;
    }

    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No Bearer token provided.' });
    }

    const idToken = authorizationHeader.split('Bearer ')[1];
    
    admin.auth().verifyIdToken(idToken)
      .then((decodedToken) => {
        delete req.headers.authorization;
        req.headers['X-User-Id'] = decodedToken.uid;
        if (req.path === '/users/' && (req.method === 'POST' || req.method === 'PUT')) {
          req.body['email'] = decodedToken.email;
        }
        next();
      })
      .catch((error) => {
        console.error('Error verifying Firebase ID token:', error);
        return res.status(401).json({ error: 'Unauthorized.' });
      });
  }
}


const setupAuth = (app, routes) => {
  routes.forEach((r) => {
    if (r.auth) {
      const exceptions = r.authExceptions || [];
      app.use(r.url, firebaseAuthMiddleware(exceptions));
    }
  });
}


exports.firebaseAuthMiddleware = firebaseAuthMiddleware;
exports.setupAuth = setupAuth;
