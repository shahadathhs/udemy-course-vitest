import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { kebabCaseToTitleCase } from "./helpers";
// import { logRoles } from '@testing-library/dom';

test("button click flow", () => {
   // const { container } = render(<App />);
  // logRoles(container);
  render(<App />);

  // find an element with a role of button and text matching /blue/i
  const buttonElement = screen.getByRole("button", {
    name: /blue/i,
  });

  // expect the class to be red
  expect(buttonElement).toHaveClass("medium-violet-red");

  // click button
  fireEvent.click(buttonElement);

  // expect the class to be blue
  expect(buttonElement).toHaveClass("midnight-blue");
  expect(buttonElement).not.toHaveClass("medium-violet-red");

  // will fail the test
  // expect(buttonElement).toHaveStyle({"background-color": "midnight-blue"});

  // expect the button text to match /red/i
  expect(buttonElement).toHaveTextContent(/red/i);
});

test("checkbox flow", () => {
  // render app
  render(<App />);

  // find elements
  const buttonElement = screen.getByRole("button", {
    name: /blue/i,
  });
  const checkboxElement = screen.getByRole("checkbox", {
    name: /disable button/i,
  });

  expect(buttonElement).toBeEnabled();
  expect(checkboxElement).not.toBeChecked();

  // click button to change to blue
  fireEvent.click(buttonElement);

  // click checkbox to disable button
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeDisabled();
  expect(buttonElement).toHaveClass("gray");

  // click checkbox to re-enable button
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeEnabled();
  expect(buttonElement).toHaveClass("midnight-blue");
});

test("checkbox flow after button click", () => {
  // render app
  render(<App />);

  // find elements
  const buttonElement = screen.getByRole("button", {
    name: /blue/i,
  });
  const checkboxElement = screen.getByRole("checkbox", {
    name: /disable button/i,
  });

  // click button to change to blue
  fireEvent.click(buttonElement);

  // click checkbox to disable button
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeDisabled();
  expect(buttonElement).toHaveClass("gray");

  // click checkbox to re-enable button
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeEnabled();
  expect(buttonElement).toHaveClass("midnight-blue");
});

describe("kebabCaseToTitleCase", () => {
  test("Works for no hypens", () => {
    expect(kebabCaseToTitleCase("red")).toBe("Red");
  });

  test("Works for one hypen", () => {
    expect(kebabCaseToTitleCase("medium-violet-red")).toBe("Medium Violet Red");
  });

  test("Works for multiple hypens", () => {
    expect(kebabCaseToTitleCase("medium-violet-red-blue")).toBe(
      "Medium Violet Red Blue"
    );
  });
});