# React Notes — Episode 9: Optimizing Our App

## 1. Single Responsibility Principle (SRP)
A function, class, or component should have **one clear responsibility / one reason to change**.
This does not mean only one line or one function; the responsibilities should be cohesive.

## 2. Modularity
**Modularity** means breaking a large application into smaller, focused modules.

Benefits:
- Easier to understand and maintain
- Easier to test
- Better organization
- Promotes reuse

## 3. Custom Hooks
A **custom Hook** is a function that packages reusable React-related logic.

```js
function useOnlineStatus() {
  // reusable logic
}
```

The `use` prefix is not a JavaScript requirement, but React recommends the `use` naming convention for custom Hooks. It also allows React tooling/lint rules to recognize functions that follow the Rules of Hooks.

A normal utility function that does not use Hooks should generally **not** use the `use` prefix.

## 4. Separate Hook Files
Reusable custom Hooks are commonly kept in their own files:

```text
hooks/
  useOnlineStatus.js
```

This is good organization, but not a strict requirement.

## 5. `useProductDetail`
API-fetching logic can be extracted from a component into a custom Hook:

```js
const productInfo = useProductDetail(productId);
```

- **Input:** `productId`
- **Output:** `productInfo`

The component can then focus on using/displaying the result.

## 6. Custom Hook Contract
A Hook's **contract** defines what it takes as input and what it returns.

Example:

```js
useProductDetail(productId)
```

- Input → `productId`
- Output → `productInfo`

For online status:

```js
useOnlineStatus()
```

- Input → none
- Output → boolean (`true` / `false`)

The code that uses the Hook is its **caller**.

## 7. Browser Online/Offline Events
The browser provides events for network-status changes:

```js
window.addEventListener("online", ...)
window.addEventListener("offline", ...)
```

A `useOnlineStatus()` Hook can listen to these events and maintain an online/offline boolean.

# Optimizing the App

## 8. Large JavaScript Bundles
When building the application, Parcel bundles JavaScript modules and dependencies into bundles the browser can download.

As an application grows, the JavaScript that may need to be loaded can also grow:

```text
More components
      ↓
More JavaScript
      ↓
Larger initial bundle
      ↓
More data to download/parse/execute
```

Parcel does **not necessarily create exactly one JS file**; it can produce multiple bundles/chunks. DevTools' reported size can also include dependencies such as React and React Router.

## 9. Chunking / Code Splitting
Breaking a large JavaScript bundle into **smaller chunks** is commonly called **chunking** or **code splitting**.

The goal is to avoid loading every part of the application upfront.

```text
Large application
       ↓
 ┌─────┼─────┐
 ↓     ↓     ↓
Home  About  Grocery
```

## 10. Lazy Loading
**Lazy loading** means loading code only when it is actually needed.

React provides `lazy()` for lazy-loading components:

```js
import { lazy } from "react";

const Grocery = lazy(() => import("./components/Grocery"));
```

Breakdown:
- `Grocery` → variable representing the lazy-loaded component
- `lazy()` → React function for lazy-loading a component
- `() => ...` → callback passed to `lazy`
- `import()` → dynamic import used to load the module
- `"./components/Grocery"` → path to the component/module

Mental model:

```text
lazy()
  ↓
Load component later
  ↓
dynamic import()
  ↓
Separate chunk
  ↓
Load when needed
```

## 11. `Suspense`
A lazy-loaded component may not be available immediately. `Suspense` lets us show fallback UI while its code is loading.

```jsx
<Suspense fallback={<Shimmer />}>
  <Grocery />
</Suspense>
```

- `lazy()` → loads the component later
- `Suspense` → shows fallback UI while waiting

## 12. Why Lazy Loading Helps
Lazy loading can make the **initial page load faster** because the browser does not need to download all application code upfront.

Without lazy loading:

```text
Load entire app
      ↓
Large initial download
      ↓
Show page
```

With lazy loading:

```text
Load code needed now
      ↓
Show page
      ↓
Load other chunks when needed
```

**Important:** Lazy loading does not necessarily reduce the total amount of application code. It reduces the amount that must be loaded **upfront**.

## Key Takeaways
- **SRP** → keep each unit focused on one responsibility.
- **Modularity** → break large applications into smaller focused modules.
- **Custom Hooks** → extract and reuse React-related logic.
- **Hook contract** → define inputs and outputs.
- **Chunking / code splitting** → divide large bundles into smaller chunks.
- **Lazy loading** → load code only when needed.
- **`lazy()`** → React API for lazy-loading components.
- **`Suspense`** → fallback UI while a lazy component loads.
