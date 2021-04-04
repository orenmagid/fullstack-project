import React, { useState } from "react"
import { Container, Segment, Header } from "semantic-ui-react"
import SearchForm from "./components/SearchForm"
import Images from "./components/Images"
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
      const images = json.results.map(
        ({ id, urls, description, alt_description }) => {
          return { id, description, alt_description, url: urls.regular }
        }
      )
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

    const fetchedImages = await fetchImages()

    setImages(fetchedImages)
  }

  return (
    <Container textAlign="center">
      <Segment className="wrapper">
        <Header as="h1">ReSplash</Header>
        <SearchForm
          handleSubmit={handleSubmit}
          handleQueryChange={handleQueryChange}
          error={error}
          query={query}
        />

        {images.length > 0 ? <Images images={images} /> : null}
        {/* Favorites */}
      </Segment>
    </Container>
  )
}

export default App
