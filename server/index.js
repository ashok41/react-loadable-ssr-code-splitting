import express from 'express';
import { renderToString } from 'react-dom/server';
//import { matchRoutes } from 'react-router-config';
import Loadable from 'react-loadable';
import render from './render';
//import jsonServer from 'json-server';
import configureStore from '../src/store';
//import Routes from '../src/router';



const app = express();
app.use(express.static('public'));
//app.use('/api', jsonServer.router('db.json'));


/*app.use((req, res, next) => {
  if(/\.js|\.css/.test(req.path)) {
    res.redirect('/public' + req.path);
  } else {
    next();
  }
});

app.use(/\.js$/, express.static('public'));*/

app.get('*', (req, res) => {
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