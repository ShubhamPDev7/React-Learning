# Episode 2 — Igniting Our App

## `npm init`

Running:

```bash
npm init
```

creates a `package.json` file in the root of the project.

## package.json

`package.json` is the configuration/metadata file for our npm project.

It contains things like:

- Project name and version
- Dependencies
- Dev dependencies
- Scripts
- Other project information

After creating `package.json`, we can start installing packages/dependencies for our project.

## Bundler

A bundler is a tool that processes our project's files, modules, dependencies, and assets and prepares them for the browser.

Create React App uses Webpack as its bundler.

In this project, we will use Parcel.

Examples of bundlers/build tools:

- Parcel
- Webpack
- Vite's underlying tooling

## Dependencies

There are two main types of dependencies we learned about:

### Dev Dependencies

Dev dependencies are packages mainly required during development and the build process.

For example, Parcel is installed as a dev dependency:

```bash
npm install -D parcel
```

`-D` is shorthand for:

```
--save-dev
```

After installing Parcel, `package.json` contains:

```json
"devDependencies": {
  "parcel": "^2.16.x"
}
```

### Regular Dependencies

Regular dependencies are packages required by the application itself and may also be needed in the production environment.

## node_modules

When we install a package, npm creates a `node_modules` folder.

```
node_modules/
```

This folder contains the packages installed for our project.

A package can also have its own dependencies.

For example:

```
Our App
   ↓
Parcel
   ↓
Parcel's dependencies
   ↓
Their dependencies
   ↓
More dependencies
```

This creates a dependency tree.

### Transitive Dependencies

A transitive dependency is a dependency that we did not directly install, but was installed because another dependency needs it.

Example:

```
Our App
   ↓
Parcel
   ↓
Dependency A
```

We directly installed Parcel, but Dependency A was installed because Parcel depends on it.

Therefore, Dependency A is a transitive dependency.

### package.json inside node_modules

Most npm packages inside `node_modules` have their own `package.json`.

Example:

```
node_modules/
├── parcel/
│   └── package.json
├── some-package/
│   └── package.json
└── another-package/
    └── package.json
```

Each package has its own information, including its dependencies.

This is how dependencies can have their own dependencies and create a dependency tree.

## package-lock.json

When npm installs packages, it creates:

```
package-lock.json
```

`package.json` specifies the dependency and its allowed version range, while `package-lock.json` keeps track of the exact resolved versions and dependency tree.

For example:

```
"parcel": "^2.16.8"
```

The `package.json` tells npm which versions are allowed.

The `package-lock.json` records the exact version that was resolved/installed.

### Why is package-lock.json useful?

It helps make installations more reproducible.

If we delete `node_modules`, we can run:

```bash
npm install
```

and npm can recreate the required `node_modules` based on our project configuration and lockfile.

Therefore, we don't need to commit `node_modules` to GitHub.

## Version Symbols — `^` and `~`

### Caret `^`

Example:

```
^2.16.8
```

The caret allows minor and patch updates within the same major version.

```
2.16.8  ✅
2.17.0  ✅
2.99.0  ✅
3.0.0   ❌
```

It prevents automatic updates to a new major version that could potentially introduce breaking changes.

### Tilde `~`

Example:

```
~2.16.8
```

The tilde allows patch updates within the same minor version.

```
2.16.9  ✅
2.16.10 ✅
2.17.0  ❌
3.0.0   ❌
```

## Parcel

We use Parcel as the bundler for our application.

To run our application:

```bash
npx parcel index.html
```

Parcel uses `index.html` as the entry point.

It then builds our application and starts a local development server.

Usually:

```
http://localhost:1234
```

## npm vs npx

### npm

npm is mainly used to install and manage packages.

Example:

```bash
npm install parcel
```

or:

```bash
npm i parcel
```

`i` is shorthand for install.

### npx

npx is used to execute package commands.

Example:

```bash
npx parcel index.html
```

This executes the Parcel CLI.

Easy way to remember:

```
npm  → install/manage packages
npx  → execute package commands
```

## What Parcel Does

Parcel provides many features for our application.

### Dev Build

Parcel creates a development-friendly build of our application.

### Local Server

Parcel starts a local development server.

Example:

```
http://localhost:1234
```

### HMR — Hot Module Replacement

HMR allows Parcel to update the running application when we change our source code without requiring a complete page reload in many cases.

### File Watching

Parcel uses a File Watching Algorithm to detect changes in our project files.

For example:

```
We modify App.js
      ↓
File watcher detects the change
      ↓
Parcel rebuilds what is necessary
      ↓
HMR updates the application
```

The file-watching mechanism used by Parcel is implemented using native code including C++ components.

### Caching

Parcel provides caching to make builds and rebuilds faster.

Instead of processing everything from scratch every time, Parcel can reuse previously processed information.

```
First Build
    ↓
Processing
    ↓
Cache created
    ↓
File changed
    ↓
Reuse cached work
    ↓
Faster rebuild
```

### Image Optimization

Parcel can optimize image assets to reduce their size and improve application performance, especially during production builds.

### Bundling

Bundling is one of the main jobs of Parcel.

Parcel processes our application's modules, dependencies, and assets and creates browser-ready bundles.

```
Multiple files
      ↓
    Parcel
      ↓
   Bundles
      ↓
Browser-ready output
```

### Minification

Parcel can minify production output.

Minification removes unnecessary characters such as:

- Whitespace
- Comments
- Unnecessary formatting

Example:

```js
const message = "Hello World";
console.log(message);
```

can become:

```js
const message="Hello World";console.log(message);
```

The purpose is to reduce file size and improve loading performance.

### Compression

Compression reduces the amount of data that needs to be transferred over the network.

```
Large file
    ↓
Compression
    ↓
Smaller transferred file
    ↓
Faster download
```

### Code Splitting

Parcel can split an application into smaller bundles/chunks.

Instead of loading everything at once:

```
Application
    ↓
 ┌──┼──┐
 ↓  ↓  ↓
A   B  C
```

Only the required code can be loaded when needed.

This can improve initial loading performance.

### Differential Bundling

Parcel can create different JavaScript output for different browser environments.

For example:

```
Modern browser
      ↓
Modern JavaScript bundle

Older browser
      ↓
Compatible JavaScript bundle
```

This allows the build to target the browsers that our application needs to support.

### Diagnostics & Error Handling

Parcel provides developer-friendly diagnostics and error messages.

It can tell us:

- What went wrong
- Which file caused the problem
- Where the problem occurred
- What we can do to fix it

For example, when our `package.json` contained:

```json
"main": "App.js"
```

Parcel gave us an error explaining that the `main` field is meant for libraries rather than applications.

Removing the `main` field allowed Parcel to build the application successfully.

### HTTPS

Parcel can run the development server using HTTPS.

Command:

```bash
npx parcel index.html --https
```

Instead of:

```
http://localhost:1234
```

we can access:

```
https://localhost:1234
```

HTTPS is useful when we need to test features that require a secure context.

### Tree Shaking

Tree Shaking removes unused code from the final production bundle.

Example:

```js
// utils.js

export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}
```

If our application only imports:

```js
import { add } from "./utils.js";
```

then the unused `subtract()` function can be removed from the production bundle.

```
add()       → Used → Keep
subtract()  → Unused → Remove
```

This reduces bundle size and improves performance.

### Consistent Hashing

Parcel uses hashing techniques to efficiently manage and identify build/cache data and generated outputs.

It helps Parcel efficiently manage cached build information and determine when files need to be rebuilt.

## dist Folder

When we run:

```bash
npx parcel index.html
```

Parcel creates a:

```
dist/
```

folder.

This contains Parcel's generated build output.

Think of it as:

```
Source Code
     ↓
   Parcel
     ↓
   dist/
     ↓
  Browser
```

The development server serves the generated build output rather than simply serving our source files directly.

We normally do not manually edit the `dist` folder because Parcel can regenerate it.

## Production Build

To create a production build:

```bash
npx parcel build index.html
```

Parcel creates an optimized production build inside `dist`.

The production build can include:

- Bundling
- Minification
- Tree shaking
- Image optimization
- Other performance optimizations

For example, our nicely formatted HTML can be compressed into fewer lines in the production output.

This makes the output smaller and more efficient for the browser.

## .gitignore

Since `node_modules`, `dist`, and Parcel's cache can be regenerated, we generally don't commit them to GitHub.

Create a `.gitignore` file:

```
node_modules/
dist/
.parcel-cache/
```

### Why?

```
Source Code
package.json
package-lock.json
        ↓
      Parcel
        ↓
 ┌───────────────┐
 ↓               ↓
dist/       .parcel-cache/
```

These generated folders can be recreated, so they don't need to be stored in Git.

## React & ReactDOM with npm

Previously, React was loaded through CDN scripts.

Now we can install React using npm:

```bash
npm install react
npm install react-dom
```

or:

```bash
npm i react
npm i react-dom
```

### Importing React

After installing React, we can import it into our JavaScript file:

```js
import React from "react";
```

This imports React from the `react` package installed inside `node_modules`.

### Importing ReactDOM

Initially:

```js
import ReactDOM from "react-dom";
```

was used, but `createRoot()` is provided through the client entry point.

The correct modern import is:

```js
import ReactDOM from "react-dom/client";
```

Then:

```js
const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(App);
```

### Important

`react-dom` has different entry points.

The client rendering APIs such as `createRoot()` are available through:

```
react-dom/client
```

## CDN vs npm

### CDN approach

React can be loaded directly from a CDN:

```html
<script src="...react..."></script>
<script src="...react-dom..."></script>
```

### npm approach

React can instead be installed as project dependencies:

```bash
npm i react react-dom
```

Then imported using ES modules:

```js
import React from "react";
import ReactDOM from "react-dom/client";
```

The npm approach allows our project and bundler to manage React as part of our dependency tree.

## Browserslist

Browserslist tells our build tools which browsers our application should support.

Example:

```json
"browserslist": [
  "last 2 Chrome versions"
]
```

Browserslist uses an array of browser queries, so multiple browser targets can be specified.

Example:

```json
"browserslist": [
  "last 2 Chrome versions",
  "last 2 Firefox versions",
  "last 2 Safari versions"
]
```

Parcel can use this information to determine how it should transform and bundle our application for the target browsers.

## Important Files & Folders

After setting up the project, we have several important files/folders:

```
project/
│
├── package.json
│      → Project configuration + dependencies
│
├── package-lock.json
│      → Exact resolved dependency versions/tree
│
├── node_modules/
│      → Installed packages
│
├── dist/
│      → Generated build output
│
├── .parcel-cache/
│      → Parcel's generated cache
│
└── .gitignore
       → Files/folders Git should ignore
```

## Episode 2 — Quick Summary

- **npm** → Package manager used to install/manage packages
- **npx** → Executes package commands
- **package.json** → Project configuration and dependency information
- **package-lock.json** → Records exact resolved dependency versions and dependency tree
- **node_modules** → Contains installed packages
- **Transitive dependency** → Dependency of another dependency
- **Parcel** → Bundler/build tool
- **dist** → Generated build output
- **.parcel-cache** → Parcel's generated cache
- **HMR** → Hot Module Replacement
- **File Watching** → Detects changes in project files
- **Caching** → Makes builds/rebuilds faster
- **Bundling** → Processes modules/dependencies/assets into browser-ready bundles
- **Minification** → Removes unnecessary characters to reduce file size
- **Compression** → Reduces data transferred over the network
- **Image Optimization** → Reduces/optimizes image assets
- **Code Splitting** → Splits an application into smaller bundles
- **Differential Bundling** → Creates appropriate output for different browser environments
- **Tree Shaking** → Removes unused code
- **Diagnostics** → Developer-friendly error information
- **HTTPS** → Allows Parcel's local development server to use HTTPS
- **Browserslist** → Defines browser support targets

## The Big Picture

```
                 package.json
                      │
                      ↓
                  npm install
                      │
                      ↓
                 node_modules
                      │
                      ↓
                    Parcel
                      │
        ┌─────────────┼─────────────┐
        ↓             ↓             ↓
   File Watching     HMR        Caching
        │
        ↓
     Bundling
        │
   ┌────┴───────────────┐
   ↓                    ↓
Development          Production
   ↓                    ↓
Local Server       Optimization
   ↓                    ↓
localhost:1234        dist/
```