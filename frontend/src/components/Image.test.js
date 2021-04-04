import React from "react"
import { render, fireEvent, screen } from "@testing-library/react"
import Image from "./Image"

const fakeImageProp = {
  description: null,
  alt_description: "person holding brown handheld tool",
  id: "-l9DJuea9jc",
  url:
    "https://images.unsplash.com/photo-1529437282514-896780082fec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjAwMDJ8MHwxfHNlYXJjaHwxfHxqb25lc3xlbnwwfHx8fDE2MTczNzg3MDQ&ixlib=rb-1.2.1&q=80&w=1080",
}
const handleFavorite = jest.fn()

test("calls handleFavorite when non-disabled favorites button is clicked", () => {
  // ARRANGE
  render(<Image {...fakeImageProp} handleFavorite={handleFavorite} />)

  // ACT
  fireEvent.click(screen.getByText("Save to Favorites"))

  // ASSERT
  expect(handleFavorite).toHaveBeenCalledTimes(1)
})

test("displays proper message when disabled (because it's a favorite already)", () => {
  // ARRANGE
  render(<Image {...fakeImageProp} buttonDisabled={true} />)

  // ASSERT
  expect(screen.getByText("You love this image!")).not.toBeNull()
})
