# React Class-Based Components & Lifecycle — Episode 8

## 1. Functional vs Class-Based Components

### Functional Component
A functional component is essentially a normal JavaScript function that returns JSX.

```js
const User = () => {
  return <h1>Hello</h1>;
};
```

### Class-Based Component
A class-based component is a JavaScript class that React can use as a component.

```js
class UserClass extends React.Component {
  render() {
    return <h1>Hello</h1>;
  }
}
```

- `React.Component` is a class provided by React.
- `extends React.Component` means the class inherits functionality from it.
- `render()` returns the JSX/UI.

## 2. Props in Class Components

Parent:
```jsx
<UserClass name={"Shubham Pawar"} />
```

Class:
```js
class UserClass extends React.Component {
  render() {
    return <h2>Name: {this.props.name}</h2>;
  }
}
```

```js
constructor(props) {
  super(props);
}
```

- `constructor(props)` receives props.
- `super(props)` calls the parent (`React.Component`) constructor.
- You don't need a constructor just to access props; `this.props` is available anyway.
- In a subclass constructor, `super()` must be called before using `this`.

## 3. State in Class Components

A class component instance can have its own state.

```js
constructor(props) {
  super(props);

  this.state = {
    count: 0,
    name: "Shubham",
    loggedIn: true
  };
}
```

`this.state` is the state object containing the component's state.

### Updating State

❌ Don't directly mutate state:
```js
this.state.count = 5;
```

✅ Use `setState()`:
```js
this.setState({ count: 5 });
```

Example:
```jsx
<button onClick={() => {
  this.setState({ count: this.state.count + 1 });
}}>
  Count Increase
</button>
```

`setState()` tells React the component needs to update/re-render.

# 4. React Component Lifecycle

Lifecycle methods are special methods React calls at different stages of a class component's life.

```text
Mounting → Updating → Unmounting
```

| Method | Purpose |
|---|---|
| `constructor()` | Instance is created; initialize state/setup |
| `render()` | Returns JSX/UI |
| `componentDidMount()` | Runs after the component is mounted |
| `componentDidUpdate()` | Runs after an update |
| `componentWillUnmount()` | Runs just before removal |

## 5. Mounting Lifecycle

When React encounters:

```jsx
<UserClass />
```

React creates an instance of the class.

Simplified flow:

```text
Create instance
     ↓
constructor()
     ↓
render()
     ↓
DOM commit/mount
     ↓
componentDidMount()
```

For a parent and child:

```text
Parent Constructor
Parent Render
Child Constructor
Child Render

Child componentDidMount
Parent componentDidMount
```

React first goes through the render phase for the component tree, then commits the DOM, and then runs `componentDidMount()` methods.

With multiple children:

```text
Parent Constructor
Parent Render
Shubham Constructor
Shubham Render
Yash Constructor
Yash Render

Shubham componentDidMount
Yash componentDidMount
Parent componentDidMount
```

Mental model:

```text
Render phase
   ↓
Commit/mount
   ↓
componentDidMount()
```

## 6. componentDidMount()

```js
componentDidMount() {
  console.log("Component mounted");
}
```

Runs after the component has been mounted into the DOM.

A common use is side effects such as API calls.

For initial-mount effects, it is roughly comparable to:

```js
useEffect(() => {
  // effect
}, []);
```

> `componentDidMount()` and `useEffect()` are not technically the same API; this is a useful mental comparison.

## 7. Updating Lifecycle

After mounting, changes to state or props can cause an update.

```text
State/props change
       ↓
render() again
       ↓
Reconciliation / diffing
       ↓
Necessary DOM updates
       ↓
componentDidUpdate()
```

`render()` runs again when the component updates.

Important:
> `render()` produces the new UI description. React then reconciles it with the previous result and updates the necessary DOM parts.

## 8. componentDidUpdate()

```js
componentDidUpdate() {
  console.log("Component updated");
}
```

Runs after the component has updated.

## 9. Unmounting Lifecycle

When a component is removed from the UI:

```js
componentWillUnmount() {
  console.log("Component will unmount");
}
```

It runs just before the component is removed from the DOM.

Common cleanup:
- Removing event listeners
- Clearing timers
- Cleaning up subscriptions

## 10. useEffect Dependency Array Refresher

### No dependency array
```js
useEffect(() => {
  // effect
});
```
Runs after every render.

### Empty dependency array
```js
useEffect(() => {
  // effect
}, []);
```
Runs once after the initial render/mount.

### With a dependency
```js
useEffect(() => {
  // effect
}, [count]);
```
Runs after the initial mount and again when `count` changes.

# Quick Revision

```text
MOUNTING
constructor()
    ↓
render()
    ↓
DOM commit
    ↓
componentDidMount()

UPDATING
state/props change
    ↓
render()
    ↓
reconciliation
    ↓
DOM update
    ↓
componentDidUpdate()

UNMOUNTING
componentWillUnmount()
    ↓
component removed
```

## Key Takeaways

- Class components extend `React.Component`.
- `render()` returns JSX.
- `this.props` accesses props.
- `this.state` stores state.
- `this.setState()` updates state and triggers an update.
- Lifecycle phases are **Mounting, Updating, and Unmounting**.
- `componentDidMount()` runs after mounting.
- `componentDidUpdate()` runs after an update.
- `componentWillUnmount()` runs before removal.
- For multiple components, think **render phase → commit phase → lifecycle methods**.
