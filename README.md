

## Deploying to Netlify

IMPORTANT: The latest version of the snowflake is inside the `gh-pages` branch. Any commits to that branch are automatically deployed to Netlify. The master branch is not currently up to date.

## Preview URL

You can see the latest version [https://super-tartufo-61502f.netlify.app/index.html](https://super-tartufo-61502f.netlify.app/index.html)


## Setup for local development


* Install (if you don't have them):
    * [Node.js](http://nodejs.org): `brew install node` on OS X
    * [Brunch](http://brunch.io): `npm install -g brunch`
    * Brunch plugins and app dependencies: `npm install`
* Run:
    * `npm start` — watches the project with continuous rebuild. This will also launch HTTP server with [pushState](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history).
    * `npm run build` — builds minified project for production
* Learn:
    * `public/` dir is fully auto-generated and served by HTTP server.  Write your code in `app/` dir.
    * Place static files you want to be copied from `app/assets/` to `public/`.
    * [Brunch site](http://brunch.io), [Getting started guide](https://github.com/brunch/brunch-guide#readme)

