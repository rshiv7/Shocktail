var express = require("express");
const OktaJwtVerifier = require('@okta/jwt-verifier');
var cors = require('cors');

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: 'https://dev-575812.okta.com/oauth2/default',
  clientId: '0oavk9afauDHernym356',
  assertClaims: {
    aud: 'api://default',
  },
});

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 8080;

var db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// Routes
require("./routes/html-routes.js")(app);

function authenticationRequired(req, res, next) {
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);
  
    if (!match) {
      return res.status(401).end();
    }
  
    const accessToken = match[1];
  
    return oktaJwtVerifier.verifyAccessToken(accessToken)
      .then((jwt) => {
        req.jwt = jwt;
        next();
      })
      .catch((err) => {
        res.status(401).send(err.message);
      });
  }

app.use(cors());

app.get('/secure', authenticationRequired, (req, res) => {
    res.json(req.jwt);
  });

app.get('/api/messages', authenticationRequired, (req, res) => {
    res.json([{
      message: 'Hello, world!'
    }]);
  });

db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});