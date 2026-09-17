# Episode 11 — Data Is the New Oil

## Higher-Order Components (HOC)

A Higher-Order Component is a function that takes a component as input and returns a new or enhanced component.

```jsx
const EnhancedComponent = higherOrderComponent(OriginalComponent);
```

### Best Seller HOC

```jsx
export const withBestSellerLable = (ProductCard) => {
  return (props) => {
    return (
      <div className="relative">
        <span>Best Seller</span>
        <ProductCard {...props} />
      </div>
    );
  };
};
```

- The HOC receives `ProductCard`.
- It adds a Best Seller label.
- It returns an enhanced component.
- `{...props}` passes all received props to the original component.
- An HOC generally wraps the original component instead of modifying it directly.

```jsx
const ProductCardBestSeller = withBestSellerLable(ProductCard);
```

Products with a rating of 4.5 or higher can render the enhanced component:

```jsx
product.rating?.rate >= 4.5
  ? <ProductCardBestSeller key={product.id} productData={product} />
  : <ProductCard key={product.id} productData={product} />
```

Use `key={product.id}` and keep `id` capitalization consistent.

## UI Layer and Data Layer

### UI Layer
The visible and interactive part of the application, such as components, cards, buttons, layouts, and labels.

### Data Layer
The information used by the UI, such as API data and product or restaurant details.

The UI layer is powered by the data layer. Components use data to render dynamic content instead of hardcoded values.

```text
Data Layer
    ↓
Product / Restaurant Data
    ↓
UI Layer
    ↓
ProductCard
```

## One-Way Data Flow

React follows one-way (unidirectional) data flow.

```text
Parent
  ↓ props
Child
  ↓ props
Grandchild
```

Data generally flows from parent components to child components through props.

## Props Drilling

Props drilling happens when data must reach a deeply nested child, so it is passed through intermediate components.

```text
RestaurantMenu
      ↓ props
RestaurantCategory
      ↓ props
ItemList
```

The intermediate component may not need the data itself but still has to pass it down. Props drilling becomes inconvenient across many component levels.

## React Context

React Context allows data to be shared with multiple components without manually passing props through every intermediate component.

Context is a shared data source, but components must consume the context to access its value.

### createContext()

`createContext()` creates a Context object.

```jsx
const UserContext = createContext();
```

### useContext()

`useContext()` is a React Hook used to access a Context value.

```jsx
const data = useContext(UserContext);
```

The component must be inside the relevant Context Provider.

### Two Ways to Consume Context

1. `useContext()` Hook
2. `Context.Consumer`

```jsx
<UserContext.Consumer>
  {(value) => <h1>{value}</h1>}
</UserContext.Consumer>
```

## Context Provider

A Provider supplies a value to its descendant components.

```jsx
<UserContext.Provider value={userInfo}>
  <App />
</UserContext.Provider>
```

- `UserContext.Provider` provides the context value.
- `value={userInfo}` contains the shared data.
- Descendant components can consume the value without receiving it through props.

## Nested Context Providers

Nested Providers of the same Context are valid.

```jsx
return (
  <UserContext.Provider value={{ loggedInUser: userName }}>
    <div className="app">
      <UserContext.Provider value={{ loggedInUser: "Savinaya" }}>
        <Header />
      </UserContext.Provider>

      <Outlet />
    </div>
  </UserContext.Provider>
);
```

The nearest matching Provider determines the value:

- `Header` receives `loggedInUser: "Savinaya"`.
- `Outlet` receives the outer value, assuming it remains under the outer Provider.
- The inner Provider overrides the outer value for its descendants.
