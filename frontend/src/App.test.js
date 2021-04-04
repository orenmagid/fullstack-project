import React from "react"
import { rest } from "msw"
import { setupServer } from "msw/node"
import { render, fireEvent, screen, waitFor } from "@testing-library/react"
import App from "./App"
import { baseUrl } from "./constants"

// TODO: Tests work, despite the fact that mock-related errors appear in terminal. Some of these errors are from the console.error logs from App.js. Only log those in dev (and maybe prod), but not test, environments. A few of the errors in the terminal are from console.error logs from react-testing-library and jsdom. Look into these and address/remove.

// Fake responses
const fakeServerResponse = {
  results: [
    {
      id: "uHSiDTptzV4",
      description: "Gränsfors Bruk",
      urls: {
        regular:
          "https://images.unsplash.com/photo-1528918230037-b8e9a8d403f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjAwMDJ8MHwxfHNlYXJjaHwxfHxzbWl0aHxlbnwwfHx8fDE2MTczOTMxODI&ixlib=rb-1.2.1&q=80&w=1080",
      },
    },
  ],
}

const errorMessage = "Something went wrong with the search. Please try again."

// Mock server setup
const requestUrl = baseUrl + "/images/search"
const server = setupServer(
  rest.get(requestUrl, (req, res, ctx) => {
    return res(ctx.json(fakeServerResponse))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test("fetches and displays image results upon form submission", async () => {
  // ARRANGE
  render(<App />)

  // ACT
  // Perform a search
  const searchInput = screen.getByLabelText("Search for Unsplash Images")
  fireEvent.change(searchInput, { target: { value: "test" } })

  // Click Submit
  const submitButton = screen.getByText("Submit")
  fireEvent.click(submitButton)

  // Wait for Image to Show up
  await waitFor(() =>
    screen.getByText(fakeServerResponse.results[0].description)
  )

  // ASSERT that Image is on Screen
  expect(
    screen.getByText(fakeServerResponse.results[0].description)
  ).not.toBeNull()
})

test("gracefully handles error from backend", async () => {
  // Override above server mock
  server.use(
    rest.get(requestUrl, (req, res, ctx) => {
      return res(ctx.status(500))
    })
  )

  // ARRANGE
  render(<App />)

  // ACT
  // Perform a search
  const searchInput = screen.getByLabelText("Search for Unsplash Images")
  fireEvent.change(searchInput, { target: { value: "test" } })

  // Click Submit
  const submitButton = screen.getByText("Submit")
  fireEvent.click(submitButton)

  // Wait for Error Message
  await waitFor(() => screen.getByText(errorMessage))

  // ASSERT that Error Message is on Screen
  expect(screen.getByText(errorMessage)).not.toBeNull()
})
