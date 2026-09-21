# React Testing Library & Jest — Episode 13 Notes

## Testing Types

- **Unit testing:** Tests a function or component in isolation.
- **Integration testing:** Tests how multiple components/modules work together.
- **E2E testing:** Tests complete user flows.

## Jest and RTL

- **Jest:** Test runner and assertion framework.
- **React Testing Library (RTL):** Renders React components and queries the DOM.
- RTL can also work with Vitest.

```bash
npm install --save-dev @testing-library/react @testing-library/dom
npm install --save-dev jest
```

Useful supporting packages include `@testing-library/jest-dom`, `jest-environment-jsdom`, and `babel-jest`, depending on the setup.

## Basic Test

```js
test("Sum function should calculate the sum of two numbers", () => {
  const result = sum(3, 4);
  expect(result).toBe(7);
});
```

- `test()` defines a test.
- `expect()` begins an assertion.
- `.toBe()` checks the expected value.
- `it()` is an alias of `test()`.

## Rendering and Querying

```jsx
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

render(<Contact />);

const heading = screen.getByRole("heading");
expect(heading).toBeInTheDocument();
```

Common queries:

- `getByRole()`
- `getByText()`
- `getByPlaceholderText()`
- `findByRole()`
- `findByText()`

**Querying** finds an element; **assertion** verifies it.

`findBy...` is useful when content appears asynchronously.

## Providers in Tests

Components using Redux or routing need the required providers:

```jsx
render(
  <BrowserRouter>
    <Provider store={appStore}>
      <Header />
    </Provider>
  </BrowserRouter>,
);
```

## Regex Queries

```js
screen.getByText(/Cart/);
screen.getByText(/cart/i);
```

The `i` flag makes the match case-insensitive.

## describe and Lifecycle Hooks

```js
describe("Header Component", () => {
  it("should render the logo", () => {});
});
```

```js
beforeAll(() => {});
beforeEach(() => {});
```

- `beforeAll()` runs once before the test group.
- `beforeEach()` runs before every test.

## HOC Testing

```jsx
const PromotedRestaurantCard = withPromotedLabel(RestaurantCard);

render(<PromotedRestaurantCard resData={MOCK_DATA} />);

expect(screen.getByText("Promoted")).toBeInTheDocument();
```

If the label is always rendered, this only tests label presence—not whether the restaurant is actually promoted. The HOC should conditionally render the label using the promotion value.

## User Interactions

- `fireEvent` simulates DOM events.
- `userEvent` usually provides more realistic user interactions.

## RestaurantMenu Testing

Use `MemoryRouter` for route-based components:

```jsx
render(
  <MemoryRouter initialEntries={["/restaurants/100002"]}>
    <Routes>
      <Route path="/restaurants/:resId" element={<RestaurantMenu />} />
    </Routes>
  </MemoryRouter>,
);
```

Important:

- The route ID must match the mock-data key.
- The referenced mock uses restaurant ID `100002`.
- The `Thali` category contains 5 items.
- Therefore, the expected text is:

```js
const accordionHeader = await screen.findByText("Thali (5)");
expect(accordionHeader).toBeInTheDocument();
```

If the route does not match, the rendered DOM may be empty. If the mock key is missing, the component can remain in its loading state.

## Key Takeaways

- Use `render()` to render components.
- Prefer accessible queries such as `getByRole()`.
- Use `findBy...` for asynchronous UI.
- Wrap components with required routers/providers.
- Match route parameters with mock-data IDs.
- Test actual behavior and conditions, not just the presence of text.
