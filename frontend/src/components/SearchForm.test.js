import React from "react"
import { render, fireEvent, screen } from "@testing-library/react"
import SearchForm from "./SearchForm"

// Mock submit handler
const handleSubmit = jest.fn()

// Reset mock submit handler call count after each test
afterEach(() => {
  jest.clearAllMocks()
})

test("calls handleSubmit when submit button is clicked and form HAS user input", () => {
  // ARRANGE
  render(
    <SearchForm
      handleSubmit={handleSubmit}
      handleQueryChange={() => {}}
      query="test"
    />
  )

  // ACT
  fireEvent.click(screen.getByText("Submit"))

  // ASSERT
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})

// TODO: Test form submission using keyboard input. Currently, firing keyDown event on submit button isn't submitting form.

// test("calls handleSubmit when form is submitted using keyboard controls and form HAS user input", () => {
//   // ARRANGE
//   render(
//     <SearchForm
//       handleSubmit={handleSubmit}
//       handleQueryChange={() => {}}
//       query="test"
//     />
//   )

//   // ACT
//   fireEvent.focus(screen.getByText("Submit"))
//   fireEvent.keyDown(screen.getByText("Submit"), { key: "Enter", code: "Enter" })

//   // ASSERT
//   expect(handleSubmit).toHaveBeenCalledTimes(1)
// })

test("does not call handleSubmit when submit button is clicked and form DOES NOT HAVE user input", () => {
  // ARRANGE
  render(
    <SearchForm
      handleSubmit={handleSubmit}
      handleQueryChange={() => {}}
      query=""
    />
  )

  // ACT
  fireEvent.click(screen.getByText("Submit"))

  // ASSERT
  expect(handleSubmit).toHaveBeenCalledTimes(0)
})
