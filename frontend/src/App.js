import React, { useState } from "react"
import { Container, Segment } from "semantic-ui-react"
import SearchForm from "./components/SearchForm"
import { baseUrl } from "./constants"
import "./App.css"

function App() {
  const [images, setImages] = useState([])
  const [error, setError] = useState(null)
  const [query, setQuery] = useState("")

  // GET SEARCH QUERY FROM USER INPUT
  const handleQueryChange = (e) => {
    setQuery(e.target.value)
  }

  // FETCH IMAGES
  const fetchImages = async () => {
    try {
      const response = await fetch(
        baseUrl + `/images/search?search_text=${query}`
      )
      const json = await response.json()
      const images = json.results.map(({ id, urls, description }) => {
        return { id, description, url: urls.regular }
      })
      // If successful, clear error if it exists
      if (error) {
        setError(null)
      }
      return images
    } catch (error) {
      // Catch error, display error message, and return empty array of images
      setError("Something went wrong. Please try again.")
      console.error(error)
      return []
    }
  }

  // HANDLE FORM SUBMISSION AND FETCH IMAGES
  const handleSubmit = async (e) => {
    e.preventDefault()

    const images = await fetchImages()
    setImages(images)
  }

  return (
    <Container textAlign="center">
      <Segment className="wrapper">
        <SearchForm
          handleSubmit={handleSubmit}
          handleQueryChange={handleQueryChange}
          error={error}
          query={query}
        />

        {/* Images */}
        {/* Favorites */}
      </Segment>
    </Container>
  )
}

export default App
