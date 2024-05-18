const axios = require('axios')

const parseOpenApiJson = (app, r) => {
  app.get(r.url+'/openapi.json', (req, res) => {
    axios.get(r.proxy.target + '/openapi.json')
    .then(response => {
      var data = response.data;
      for (path in data.paths) {
        data.paths[r.url+path] = data.paths[path];
        delete data.paths[path];
      }
      res.send(data)
    })
    .catch(error => {
      console.error(`Got error: ${error.message}`);
    });
  })
}

const parseDocs = (app, r) => {
  app.get(r.url+'/docs', (req, res) => {
    axios.get(r.proxy.target + '/docs')
    .then(response => {
      var data = response.data;
      const regex = new RegExp('/openapi.json', 'g');
      data = data.replace(regex, r.url+'/openapi.json')
      res.send(data)
    })
    .catch(error => {
      console.error(`Got error: ${error.message}`);
    });
  })
}

const setupParseOpenApi = (app, routes) => {
  routes.forEach(r => {
    if (r.hasOpenApi) {
      parseOpenApiJson(app, r);
      parseDocs(app, r);
    }
  });

}

exports.setupParseOpenApi = setupParseOpenApi
