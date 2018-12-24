import express from 'express';
import { renderToString } from 'react-dom/server';
//import { matchRoutes } from 'react-router-config';
import Loadable from 'react-loadable';
import render from './render';
//import jsonServer from 'json-server';
import configureStore from '../src/store';
import fileUpload from 'express-fileupload';
import cors from 'cors';
//import Routes from '../src/router';
import routes from './routes';
import bodyParser from 'body-parser';
const app = express();
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());
//app.use('/api', jsonServer.router('db.json'));
app.use('/files', routes);


/*app.use((req, res, next) => {
  if(/\.js|\.css/.test(req.path)) {
    res.redirect('/public' + req.path);
  } else {
    next();
  }
});

app.use(/\.js$/, express.static('public'));*/

app.get('/*', (req, res) => {
  const store = configureStore();

  /*const actionsTemp = matchRoutes(Routes, req.path).map(({ route }) => !route.component.preload ? route.component : route.component.preload().then(res => res.default));

  const loadedActions = await Promise.all(actionsTemp);
  const actions = loadedActions
    .map(component => component.fetching ? component.fetching({...store, path: req.path }) : null)
    .map(async actions => await Promise.all(
      (actions || []).map(p => p && new Promise(resolve => p.then(resolve).catch(resolve)))
      )
    );


  await  Promise.all(actions);*/
  const context = {};
  const content = render(req.path, store, context);

  res.send(content);
});

const port = process.env.PORT || 3000;
Loadable.preloadAll().then(() => {
  app.listen(port, () => console.log('Frontend service listening on port: '+ port));
});