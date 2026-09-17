# Episode 4 — Building Swiggy (Component Design, Props, Lists & Keys)

## Planning the App

Before writing code, planning was done in two stages:

1. **Wireframe planning** — done on pen and paper first.
2. **Low-level design** — breaking the wireframe into components.

### Component Breakdown

```
Header
 ├── Logo
 └── Nav Items

Body
 ├── Search
 └── Restaurant Container
       └── RestaurantCard

Footer
 ├── Copyright
 ├── Links
 ├── Address
 └── Contact Information
```

`Header`, `Body`, and `Footer` are the top-level components. `RestaurantCard` is a reusable child component rendered multiple times inside `Restaurant Container`.

## CSS: Removing Bullet Points from Lists

By default, `ul`/`li` elements show bullet dots. To remove them:

```css
list-style-type: none;
```

## Inline CSS in JSX

Inline styles in JSX are **not** written as a string like in plain HTML:

```html
<!-- ❌ This does NOT work in JSX -->
style="width: 100px"
```

Instead, JSX expects a **JavaScript object**, with camelCase property names:

```javascript
const styleCard = {
  backgroundColor: "yellow",
};

const RestaurantCard = () => {
  return (
    <div className="res-card" style={styleCard}>
      <h3>Meghana Foods</h3>
    </div>
  );
};
```

## Props

Props (short for **properties**) let you pass data into a component — similar to how you pass arguments to a function. A component is essentially a function, and props are the arguments it's called with.

### Passing Props

```javascript
<RestaurantCard resName="KFC" />
```

### Receiving Props (without destructuring)

```javascript
const RestaurantCard = (props) => {
  return <h3>{props.resName}</h3>;
};
```

## Destructuring Props

Destructuring pulls values directly out of the props object, so you don't need to write `props.` repeatedly.

### Option 1 — Destructure in the parameter list (recommended)

```javascript
const RestaurantCard = ({ resName, cuisine, ratings, time }) => {
  return <h3>{resName}</h3>;
};
```

### Option 2 — Destructure inside the function body

```javascript
const RestaurantCard = (props) => {
  const { resName, cuisine, ratings, time } = props;
  return <h3>{resName}</h3>;
};
```

### Which is recommended?

**Parameter destructuring (Option 1)** is the most widely used and recommended pattern:

- Concise — no repeated `props.` prefix
- Self-documenting — the function signature itself shows what props the component expects
- Standard convention across React codebases and style guides

Body destructuring (Option 2) is still valid — useful if you also need the raw `props` object (e.g. to spread `{...props}` onward). Plain `props.resName` everywhere isn't wrong, just more verbose, and mainly worth avoiding for readability.

## Config-Driven UI

Apps like Swiggy use a **config-driven UI** pattern — UI (restaurant cards, filters, banners, etc.) is rendered based on a config/data object from an API, rather than being hardcoded. Instead of manually writing out each `<RestaurantCard>`, you map over an array of restaurant data and generate cards dynamically.

## Rendering Nested Data — Arrays in JSX

`cuisines` in the restaurant data is an array. Rendering it directly could overflow the container, so `.join(", ")` is used to turn it into a clean, single string with a defined separator:

```javascript
<h4>{resObj.data.cuisines.join(", ")}</h4>
```

## First Pass: Hardcoded Restaurant Cards

```javascript
const Body = () => {
  return (
    <div className="body">
      <div className="search">Search</div>
      <div className="res-container">
        <RestaurantCard resData={resList[0]} />
        <RestaurantCard resData={resList[1]} />
        {/* ...repeated for each item in resList */}
      </div>
    </div>
  );
};
```

```javascript
const RestaurantCard = (props) => {
  const { resData } = props;
  return (
    <div className="res-card">
      <img
        className="res-logo"
        src={resData.data.cloudinaryImageId}
        alt="res-logo"
      />
      <h3>{resData.data.name}</h3>
      <h4>{resData.data.cuisines.join(", ")}</h4>
      <h4>{resData.data.totalRatingsString}</h4>
      <h4>{resData.data.slaString}</h4>
      <h4>₹{resData.data.costForTwo / 100}</h4>
    </div>
  );
};
```

This hardcoded, one-line-per-card approach is exactly the repetition that `.map()` is meant to eliminate — cleaned up in a later step below.

## Optional Chaining (`?.`)

```javascript
const {
  cloudinaryImageId,
  name,
  cuisines,
  totalRatingsString,
  slaString,
  costForTwo,
} = resData?.data;
```

**Optional chaining (`?.`)** safely accesses a nested property without throwing an error if something along the chain is `undefined` or `null`.

Without it:

```javascript
resData.data; // ❌ throws an error if resData is undefined/null
```

With it:

```javascript
resData?.data; // ✅ evaluates to undefined instead of crashing, if resData is undefined/null
```

It's roughly shorthand for:

```javascript
resData && resData.data;
```

**Why it matters:** on first render, `resData` might briefly be `undefined` (e.g. data hasn't arrived from an API yet, or a prop wasn't passed correctly). Without `?.`, reading `.data` off `undefined` crashes the app ("Cannot read properties of undefined"). With `?.`, it fails more gracefully instead.

It can also be chained deeper: `resData?.data?.name` — each `?.` checks the value before it before continuing further.

## Cleanup: Using `.map()` to Render the List

```javascript
{
  resList.map((restaurant) => <RestaurantCard resData={restaurant} />);
}
```

This replaces the repeated hardcoded `<RestaurantCard resData={resList[i]} />` lines with a single dynamic render over `resList`.

## The `key` Prop

When rendering a list with `.map()`, React requires a `key` prop on each item:

```javascript
{
  resList.map((restaurant) => (
    <RestaurantCard key={restaurant.data.id} resData={restaurant} />
  ));
}
```

### Why `key` Is Needed

React uses `key` to match elements between renders — to determine whether an item is the _same_ one as before (just moved/updated) or a _new_ one.

**Without `key`** (or with an unstable key), React can't reliably track individual items. If the list order changes, or items are added/removed/filtered, React's default behavior is closer to tearing down and rebuilding large portions of the DOM — re-rendering cards that didn't need to change, instead of surgically updating just the ones that did. In worse cases, this can mix up internal component state between items (e.g. a "favorited" state ending up on the wrong card).

**With a proper `key`**, React can precisely track each item across renders — moving, updating, or removing just the specific DOM node that changed.

### Why Not Use Array Index as `key`

React explicitly recommends against using the array `index` as `key`. Index-based keys only work safely for lists that never change order or length.

Example of the problem:

- Cards start at indexes `0, 1, 2, 3...`
- An item at index `1` is filtered out
- The item that _was_ at index `2` shifts to index `1`
- React sees "key `1` still exists" and assumes it's the _same_ component as before, just with updated content — when it's actually a _different_ restaurant now occupying that slot

This can cause React to reuse the wrong DOM node or state for the wrong item — especially problematic if a component holds its own local state (like a toggle or input).

**Stable, unique IDs** (like `restaurant.data.id`) don't have this problem — the key stays attached to the actual data item, not its position in the array, so it remains correct no matter how the list is reordered, filtered, or modified.

### Key Choice — Best to Worst

```
No key at all          → Not acceptable (React warns; unpredictable behavior)
        <
Index as key            → Works only for static lists; breaks on reorder/filter/insert
        <
Unique ID as key (best) → Best practice; correct regardless of how the list changes
```

## Episode 4 — Quick Summary

- **Wireframe planning** → Pen-and-paper sketch before coding
- **Component design** → Breaking UI into Header, Body, Footer, and nested reusable components (RestaurantCard)
- **`list-style-type: none`** → Removes bullet dots from `ul`/`li`
- **Inline CSS in JSX** → Requires a JS object with camelCase keys, not a CSS string
- **Props** → Data passed into a component, like arguments passed into a function
- **Destructuring props** → Extracting values directly from props, either in the parameter list (recommended) or in the function body
- **Config-driven UI** → Rendering UI dynamically based on a data/config object instead of hardcoding
- **`.join(", ")`** → Converts an array (e.g. cuisines) into a clean, separated string
- **Optional chaining (`?.`)** → Safely accesses nested properties without crashing on `undefined`/`null`
- **`.map()`** → Used to dynamically render a list of components instead of hardcoding each one
- **`key` prop** → Helps React uniquely identify list items across renders for efficient updates
- **Index as key** → Discouraged — breaks when list order/length changes
- **Unique ID as key** → Best practice — stays correctly attached to the same data item regardless of reordering
