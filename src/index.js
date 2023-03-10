// import 'promise-polyfill';
// import 'isomorphic-fetch';
import { h, render } from 'preact';
import './style';
import Router from 'preact-router';

let root;
let App = require('./components/app').default;
let Sun = require('./components/Sun/sun').default;
let Moon = require('./components/Moon/moon').default;


const Main = () => (
	<Router>
	  <App path="/" />
	  <Sun path="/sun" />
	  <Moon path="/moon" />
	</Router>
);

function init() {
	root = render(<Main />, document.body, root);
}

// register ServiceWorker via OfflinePlugin, for prod only:
if (process.env.NODE_ENV==='production') {
	require('./pwa');
}

// in development, set up HMR:
if (module.hot) {
	//require('preact/devtools');   // turn this on if you want to enable React DevTools!
	module.hot.accept('./components/app', () => requestAnimationFrame(init) );
}

init();
