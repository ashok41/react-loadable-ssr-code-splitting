import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack'
import Routes from '../src/router';
import stats from '../react-loadable.json';

const vendorJsSrc = 'vendor.js';
const mainJsSrc = 'main.js';

export default (pathname, store, context) => {
  let modules = [];
  function fetchModuleName(moduleName: string) {
	return modules.push(moduleName);
  }
  const content = ReactDOMServer.renderToString(
    <Loadable.Capture report={fetchModuleName}>
      <Provider store={store}>
        <StaticRouter location={pathname} context={context}>
          <Routes />
        </StaticRouter>
      </Provider>
    </Loadable.Capture>
  );

  let bundles = getBundles(stats, modules);
  
  let styles = bundles.filter(bundle => bundle.file.endsWith('.css'));
  let scripts = bundles.filter(bundle => bundle.file.endsWith('.js'));

  return `
  <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>My App</title>
		${styles.map(style => {
          return `<link href="${style.file}" rel="stylesheet"/>`;
        }).join('\n')}
      </head>
      <body>
		<div id="root">${content}</div>
		<script>
			window.__REDUX_STATE__ = ${JSON.stringify(store.getState())}
		</script>              
		<script src="/${vendorJsSrc}"></script>
		<script src="/main.js"></script>
		${scripts.map(script => {
			return `<script src="/${script.file}"></script>`
		}).join('\\n')}
		<script>window.main();</script>         
      </body>
      </html>
  `;
};
