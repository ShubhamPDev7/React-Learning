import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Body from "../Body";
import UserContext from "../../utils/UserContext";
import "@testing-library/jest-dom";

it("Should Search Res List for burger text input", async () => {
  render(
    <BrowserRouter>
      <Body />
    </BrowserRouter>,
  );

  const cardsBeforeSearch = await screen.findAllByTestId("resCard");

  expect((await cardsBeforeSearch).length).toBe(20);

  const searchBtn = await screen.findByRole("button", {
    name: "Search",
  });

  const searchInput = await screen.findByTestId("searchInput");
  console.log();
  fireEvent.change(searchInput, { target: { value: "burger" } });

  fireEvent.click(searchBtn);

  const cardsAfterSearch = screen.findAllByTestId("resCard");

  expect((await cardsAfterSearch).length).toBe(1);
});

it("Should filter Top Rated Restaurant", async () => {
  render(
    <BrowserRouter>
      <Body />
    </BrowserRouter>,
  );

  const cardsBeforeFilter = await screen.findAllByTestId("resCard");

  expect((await cardsBeforeFilter).length).toBe(20);

  const topRatedBtn = await screen.findByRole("button", { name: "Top Rated" });

  fireEvent.click(topRatedBtn);

  const cardsAfterFilter = await screen.findAllByTestId("resCard");

  expect(cardsAfterFilter.length).toBe(10);
});
