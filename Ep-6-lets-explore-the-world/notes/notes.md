# React Notes — API Calls, useEffect, Shimmer UI & Search

## 1. From Mock Data to API Data

Previously, restaurant cards were populated using hardcoded/mock restaurant data.

Now the goal is to fetch restaurant data dynamically from an API and use that response to populate the UI.

### Two approaches

**Approach 1: Fetch first, then render**
```text
Page loads
  ↓
API call
  ↓
Wait for response
  ↓
Render UI with data
```

**Approach 2: Render first, then fetch** ✅
```text
Page loads
  ↓
Render UI
  ↓
API call
  ↓
Data arrives
  ↓
State updates
  ↓
Component re-renders with data
```

React does not reload the entire browser page when the API data arrives. The relevant component re-renders with the new state.

---

## 2. `useState()`

`useState()` is a React Hook used to create state in a functional component.

When state is updated using its setter function, React schedules the component for a re-render.

Example:
```js
const [count, setCount] = useState(0);

setCount(1);
```

### State update flow

```text
State changes
  ↓
Component re-renders
  ↓
Component function runs again
  ↓
React updates the necessary DOM
```

### `const` and React state

A state variable may look like it is being changed even though it is declared with `const`.

```js
const [count, setCount] = useState(0);
```

React does **not** do:

```js
count = 1; // ❌
```

Instead, React stores the new state internally and runs the component again. On the next render, a new `count` variable is created with the new value.

```text
First render → count = 0
       ↓
setCount(1)
       ↓
React stores 1
       ↓
Re-render
       ↓
Second render → count = 1
```

`const` still follows normal JavaScript rules.

---

## 3. `useEffect()`

`useEffect()` is a React Hook used for **side effects**, such as API calls, timers, subscriptions, and event listeners.

It takes two arguments:

```js
useEffect(() => {

}, []);
```

1. **Callback function** — contains the effect code.
2. **Dependency array** — controls when the effect runs.

An empty dependency array:

```js
useEffect(() => {

}, []);
```

causes the effect to run after the component's initial render (once for that mount).

### Render vs `useEffect`

`useEffect()` does not run during the render itself.

The basic sequence is:

```text
Component renders
  ↓
console.log() during render
  ↓
UI is committed
  ↓
useEffect() runs
```

This is why an effect is useful for API calls: the component can render first and then perform the API request.

---

## 4. CORS

When making a frontend API request, the browser may block the request because of **CORS (Cross-Origin Resource Sharing)**.

The browser follows the **Same-Origin Policy**, which restricts a webpage from freely reading responses from another origin.

CORS allows a server to explicitly specify which origins are allowed to access its responses.

Example flow:

```text
React App
  ↓
fetch(API)
  ↓
Browser checks CORS
  ↓
Server does not allow the origin
  ↓
Browser blocks access to the response
  ↓
CORS error
```

### CORS extension

A browser extension that allows CORS can bypass the browser restriction during local development.

However, this is only a development workaround. A real production application should use an API/backend/proxy setup where the server properly permits the frontend request.

---

## 5. Shimmer UI / Loading State

A **Shimmer UI** (also called a skeleton UI) displays placeholder elements while real data is being loaded.

A `Shimmer` component can contain multiple placeholder cards styled with a height, width, and light-gray background.

Example:

```js
const Shimmer = () => {
  return (
    <div className="shimmer-container">
      {/* shimmer cards */}
    </div>
  );
};
```

In `Body`:

```js
if (listOfRestaurants.length === 0) {
  return <Shimmer />;
}
```

### Flow

```text
Page loads
  ↓
listOfRestaurants = []
  ↓
Condition is true
  ↓
Render Shimmer
  ↓
API call
  ↓
Data arrives
  ↓
State updates
  ↓
Body re-renders
  ↓
Restaurant cards appear
```

The Shimmer gives the user immediate visual feedback instead of showing a completely blank page while data is loading.

---

## 6. Conditional Rendering

Rendering different UI based on a condition is called **Conditional Rendering**.

Example:

```js
if (listOfRestaurants.length === 0) {
  return <Shimmer />;
}
```

When the condition is true, the Shimmer is rendered.

When it becomes false, the normal restaurant UI is rendered.

React supports several common ways to conditionally render UI:

- `if / else`
- Ternary operator: `condition ? A : B`
- Logical AND: `condition && A`

Conditional rendering is commonly used for:

- Loading states
- Error states
- Empty states
- Success states

---

## 7. Component Re-rendering

When a state variable is updated, React re-renders the component that owns that state.

For example, if `Header` owns a state variable and a button updates it:

```text
Button click
  ↓
State changes
  ↓
Header re-renders
  ↓
Header function runs again
```

If you put:

```js
console.log("Header rendered");
```

inside the `Header` component, it will print again when that state changes.

### Re-render ≠ entire DOM replacement

A component re-rendering does not mean React throws away the entire DOM.

React calculates what changed and updates only the necessary DOM parts.

---

## 8. Reconciliation

When state changes, React creates a new result for the component and performs a **reconciliation** process.

Beginner-level mental model:

```text
State update
  ↓
Component re-renders
  ↓
New React element tree
  ↓
Reconciliation
  ↓
Compare previous and new results
  ↓
Update necessary DOM
```

The comparison is commonly described as React using a **diffing algorithm** to determine what changed.

### Important distinction

**Re-rendering** means React runs the component again.

**DOM update** means React actually changes something in the browser DOM.

A component can re-render even when React determines that no DOM changes are necessary.

---

# Search Functionality

## 9. Controlled Input

A React input can be controlled using state.

Example:

```js
const [searchText, setSearchText] = useState("");
```

```js
<input
  value={searchText}
  onChange={(e) => setSearchText(e.target.value)}
/>
```

Here, React state controls the input's value.

### Why `onChange` is needed

If you only do:

```js
<input value={searchText} />
```

and `searchText` starts as:

```js
""
```

the input is effectively stuck at an empty value because React keeps controlling its value.

With:

```js
onChange={(e) => setSearchText(e.target.value)}
```

the flow becomes:

```text
User types
  ↓
onChange fires
  ↓
e.target.value contains the input value
  ↓
setSearchText(...)
  ↓
State changes
  ↓
Component re-renders
  ↓
Input receives the new searchText
```

This pattern is called a **controlled input/component**.

---

## 10. Filtering Restaurants with `filter()`

A search button can filter restaurants based on the search text.

Example:

```js
const filteredRestaurant = listOfRestaurants.filter(
  (res) => res.info.name === searchText
);

setListOfRestaurants(filteredRestaurant);
```

`filter()` checks every element and returns a **new array** containing the elements that satisfy the condition.

It does not modify the original array.

---

## 11. Partial and Case-Insensitive Search

Instead of requiring an exact match:

```js
res.info.name === searchText
```

you can use:

```js
res.info.name
  .toLowerCase()
  .includes(searchText.toLowerCase())
```

Example:

```js
const filteredRestaurant = listOfRestaurants.filter((res) =>
  res.info.name.toLowerCase().includes(searchText.toLowerCase())
);

setListOfRestaurants(filteredRestaurant);
```

This allows:

- Partial matches
- Case-insensitive searches

For example:

```text
"Pizza Hut" + "pizza" → match
"Pizza Hut" + "PIZZA" → match
"Pizza Hut" + "PiZzA" → match
```

`includes()` checks whether one string contains another string.

---

## 12. The Filtered Search Problem

If you directly modify `listOfRestaurants` after every search:

```js
setListOfRestaurants(filteredRestaurant);
```

you can lose the original complete dataset.

Example:

```text
Original:
[A, B, KFC, C, Burger King]

Search "kfc":
[KFC]

Search "burger":
filter [KFC] for "burger"
        ↓
[]
```

The problem is that the second search is being performed on an **already-filtered list**, rather than the original restaurant list.

---

## 13. Keeping Original Data Separate

A better approach is to keep the complete API data separately:

```js
const [searchRestaurants, setSearchRestaurants] = useState([]);
```

When the API data is fetched, store the complete dataset in `searchRestaurants`.

Then filter from `searchRestaurants`:

```js
const filteredRestaurant = searchRestaurants.filter((res) =>
  res.info.name.toLowerCase().includes(searchText.toLowerCase())
);

setListOfRestaurants(filteredRestaurant);
```

### Data flow

```text
API response
     ↓
searchRestaurants
     ↓
   filter
     ↓
listOfRestaurants
     ↓
     UI
```

Now searching works correctly:

```text
searchRestaurants
[All restaurants]
      ↓
Search "KFC"
      ↓
listOfRestaurants = [KFC]

Search "Burger"
      ↓
searchRestaurants        ← original data still available
[All restaurants]
      ↓
listOfRestaurants = [Burger restaurants]
```

### Key concept

You separated:

- **Source/original data** → `searchRestaurants`
- **Displayed/filtered data** → `listOfRestaurants`

This prevents one search from destroying the data needed for the next search.

---

# Overall React Data Flow

Your restaurant application now follows roughly this flow:

```text
                    API
                     ↓
             Fetch restaurant data
                     ↓
             Store original data
                     ↓
              Render component
                     ↓
             Is data available?
                ↙          ↘
             No              Yes
             ↓                ↓
          Shimmer       Restaurant cards
                              ↑
                              |
                         Search input
                              ↓
                         searchText
                              ↓
                    Filter original data
                              ↓
                    setListOfRestaurants()
                              ↓
                       Component re-renders
                              ↓
                    Filtered restaurant UI
```

## Important concepts learned

- `useState()`
- State updates and re-rendering
- `useEffect()`
- Side effects
- API fetching
- CORS
- Shimmer / skeleton UI
- Loading states
- Conditional rendering
- Controlled components
- `onChange`
- `filter()`
- `includes()`
- Case-insensitive searching
- Reconciliation
- Re-render vs DOM update
- Keeping source data separate from filtered/display data
