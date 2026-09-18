# Episode 12 — Let's Build Our Store (Redux)

## Redux fundamentals
- Redux manages centralized application state, usually in the data layer.
- React handles UI; Redux manages state; `react-redux` connects them.
- Redux is optional. Alternatives include `useState`, `useReducer`, Context, Zustand, MobX, and Jotai.
- A store can contain multiple feature slice reducers:

```js
const appStore = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    products: productsReducer,
  },
});
```

A slice contains case reducers such as `addItem`, `removeItem`, and `clearCart`.

## Dispatch and payload
```jsx
const dispatch = useDispatch();

const handleAddItem = (item) => {
  dispatch(addItem(item));
};
```

The value passed to an action creator becomes `action.payload`:

```js
addItem: (state, action) => {
  state.items.push(action.payload);
},
```

## Event handlers
```jsx
onClick={handleAddItem}              // function reference
onClick={() => handleAddItem(item)}  // callback, passes argument
onClick={handleAddItem(item)}        // executes during render (avoid)
```

## Selecting state
Select only the required data:

```jsx
const cartItems = useSelector((store) => store.cart.items);
```

Selecting the entire store can cause unnecessary re-renders when unrelated state changes:

```jsx
const store = useSelector((store) => store);
const cartItems = store.cart.items;
```

React-Redux normally uses reference equality to compare selected values.

## Cart actions
```js
addItem: (state, action) => {
  state.items.push(action.payload);
},
removeItem: (state) => {
  state.items.pop();
},
clearCart: (state) => {
  state.items.length = 0;
},
```

`pop()` removes the last item. To remove a specific product by ID:

```js
removeItem: (state, action) => {
  state.items = state.items.filter(
    (item) => item.card.info.id !== action.payload
  );
},
```

```jsx
const handleRemoveItem = (item) => {
  dispatch(removeItem(item.card.info.id));
};

<button onClick={() => handleRemoveItem(item)}>Remove</button>
```

This removes all entries with the matching ID. Removing only one copy needs different logic.

## Reusable ItemList
Use a prop to show the Remove button only in the cart:

```jsx
<ItemList items={items} />
<ItemList items={cartItems} isCart={true} />
```

```jsx
const ItemList = ({ items, isCart }) => {
  // ...
};

{isCart && (
  <button onClick={() => handleRemoveItem(item)}>
    Remove
  </button>
)}
```

## Vanilla Redux and immutability
Vanilla Redux encourages immutable updates.

Incorrect:
```js
state.items.push(action.payload);
return state;
```

Correct:
```js
return {
  ...state,
  items: [...state.items, action.payload],
};
```

A shallow copy alone is not enough:

```js
const newState = { ...state };
newState.items.push(action.payload); // still mutates shared array
```

## Immer and Redux Toolkit
Redux Toolkit uses Immer internally. Immer creates a Proxy-based draft, tracks draft changes, and produces a new immutable state.

```js
addItem: (state, action) => {
  state.items.push(action.payload);
},
```

Two valid approaches:

```js
// Mutate the draft
clearCart: (state) => {
  state.items.length = 0;
},
```

```js
// Return a replacement state
clearCart: () => {
  return { items: [] };
},
```

Do not mutate the draft and return a new state in the same reducer.

Reassignment does not replace Redux state:

```js
state = ["shubham"]; // only changes the local variable
```

To replace the state, return the new value.

For debugging an Immer draft:

```js
import { current } from "@reduxjs/toolkit";

console.log(current(state));
```

`current(state)` provides a readable snapshot of the draft.

## Middleware, Thunk, and RTK Query
Middleware runs between dispatch and the reducer:

```text
dispatch → middleware → reducer → updated store
```

Redux Thunk supports dispatching functions for asynchronous logic. Redux Toolkit includes thunk middleware by default in `configureStore()`.

RTK Query is an optional Redux Toolkit solution for:
- API requests
- Loading and error states
- Caching
- Refetching
- Cache invalidation

## Episode recap
You learned Redux stores and slices, dispatch and payloads, `useSelector`, reusable cart UI, immutable updates, Immer, middleware, Redux Thunk, and RTK Query.
