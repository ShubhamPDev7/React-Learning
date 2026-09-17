# React Routing — Notes

## useEffect Refresher

```js
import { useEffect } from "react";

useEffect(() => {
  console.log("useEffect Called");
}, []);
```

`useEffect` takes two arguments:
1. **Callback function** — contains the side-effect code.
2. **Dependency array** — controls when the effect runs.

### Dependency array

```js
useEffect(() => {});       // after every render
useEffect(() => {}, []);   // after initial render/mount
useEffect(() => {}, [x]);  // after initial render + when x changes
```

React compares dependency values between renders.

---

## Rules of Hooks

Hooks such as `useState` and `useEffect` should be called at the **top level of a React component** (or custom Hook).

Do not call Hooks inside:
- `if/else`
- loops such as `for`
- nested/regular functions

React relies on Hooks being called in the same order on every render.

---

# React Router

## Installing React Router

```bash
npm install react-router-dom
```

When following a course, the latest package version may differ from the version used by the course. In this project, React Router v6 was used to match the lecture.

---

## Routing Configuration

Import:

```js
import { createBrowserRouter } from "react-router-dom";
```

Routing configuration defines **what should happen for specific URL paths**.

Example:

```js
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
  },
  {
    path: "/about",
    element: <About />,
  },
]);
```

Each route is represented by a route object:
- `path` → URL path
- `element` → component/UI to render for that path

---

## RouterProvider

Import:

```js
import { RouterProvider } from "react-router-dom";
```

Previously:

```js
root.render(<AppLayout />);
```

Now:

```js
root.render(<RouterProvider router={appRouter} />);
```

`createBrowserRouter()` creates the router configuration, while `RouterProvider` connects that router to the React application.

---

# Error Handling

If a URL doesn't match a configured route, React Router provides a default 404/error UI.

We can create our own error page with `errorElement`:

```js
{
  path: "/",
  element: <AppLayout />,
  errorElement: <Error />,
}
```

## useRouteError

Import:

```js
import { useRouteError } from "react-router-dom";
```

Inside the error component:

```js
const err = useRouteError();
console.log(err);
```

The returned error object can contain useful information such as:

```jsx
{err.status} : {err.statusText}
```

For example:

```text
404 : Not Found
```

---

# Nested / Children Routes

If `/about` or `/contact` are separate routes, navigating to them can replace the whole layout, causing the Header and Footer to disappear.

We want the shared layout to remain:

```text
AppLayout
├── Header
├── Page content
└── Footer
```

## children

A parent route can have a `children` property containing an array of route objects:

```js
{
  path: "/",
  element: <AppLayout />,
  children: [
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/contact",
      element: <Contact />,
    },
  ],
}
```

These are called **nested routes**.

---

## Outlet

Import:

```js
import { Outlet } from "react-router-dom";
```

Then place it inside the parent layout:

```jsx
const AppLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
```

`<Outlet />` is the placeholder where React Router renders the matching child route.

For `/about`:

```text
AppLayout
   ↓
Header
   ↓
<Outlet /> → About
   ↓
Footer
```

For `/contact`:

```text
AppLayout
   ↓
Header
   ↓
<Outlet /> → Contact
   ↓
Footer
```

`<Outlet />` itself does not appear as an HTML element in the browser DOM. It is a React Router component that determines where the child route is rendered.

---

# Navigation

## Anchor tag vs Link

A normal anchor works:

```jsx
<a href="/about">About</a>
```

but it uses normal browser navigation and causes a full page reload.

React Router provides `Link`:

```js
import { Link } from "react-router-dom";
```

```jsx
<Link to="/about">About</Link>
```

`Link` enables **client-side navigation**, allowing React Router to change routes without a full browser reload.

---

# Client-Side vs Server-Side Routing

## Client-Side Routing

The browser loads the React application and React Router handles navigation on the client.

```text
Click /about
    ↓
React Router handles navigation
    ↓
URL changes
    ↓
About component renders
    ↓
No full page reload
```

## Server-Side Routing

The browser requests the URL from the server and receives a new page/document.

```text
Click /about
    ↓
Request sent to server
    ↓
Server processes /about
    ↓
Server sends response
    ↓
Browser loads new page
```

React Router is being used here for **client-side routing**.

---

# Dynamic Routing

Dynamic routing is used when part of the URL can change.

Example:

```js
{
  path: "/restaurants/:resId",
  element: <Restaurant />,
}
```

`:resId` is a **dynamic route parameter**.

The same route can match:

```text
/restaurants/123
/restaurants/456
/restaurants/789
```

The actual value replaces `:resId`.

---

## useParams

React Router provides `useParams()` to extract dynamic route parameters.

Import:

```js
import { useParams } from "react-router-dom";
```

Then:

```js
const { resId } = useParams();
```

If the URL is:

```text
/restaurants/123
```

then:

```js
resId === "123"
```

`useParams()` returns an object containing the parameters defined in the route.

The parameter name must match the route:

```text
path: "/restaurants/:resId"
                    ↓
             useParams().resId
```

---

# Key Takeaways

- `createBrowserRouter()` creates the routing configuration.
- `RouterProvider` provides that router to the React application.
- `errorElement` allows a custom error page.
- `useRouteError()` gives the error component access to route error information.
- `children` creates nested routes.
- `<Outlet />` is where the matching child route is rendered.
- `<Link>` enables client-side navigation.
- Client-side routing avoids a full page reload between routes.
- `:resId` creates a dynamic route parameter.
- `useParams()` extracts dynamic parameters from the URL.
