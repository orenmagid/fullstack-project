import React, { useState, useEffect } from "react"
import { Container, Segment, Header } from "semantic-ui-react"
import { useMediaQuery } from "react-responsive"
import SearchForm from "./components/SearchForm"
import Images from "./components/Images"
import Favorites from "./components/Favorites"
import { baseUrl } from "./constants"
import "./App.css"

function App() {
  const [images, setImages] = useState([])
  const [error, setError] = useState(null)
  const [noSearchResults, setNoSearchResults] = useState(false)
  const [query, setQuery] = useState("")
  const [favorites, setFavorites] = useState([])

  // Check for screen width to pass prop used to layout Images/Favorites
  const isMobile = useMediaQuery({ query: "(max-width: 700px)" })

  // GET SEARCH QUERY FROM USER INPUT
  const handleQueryChange = (e) => {
    if (noSearchResults) setNoSearchResults(false)
    setQuery(e.target.value)
  }

  // FOR CLEARING ERROR AFTER SUCCESSFUL SEARCH
  const clearError = () => {
    if (error) setError(null)
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
      // Handle no search results returned from API
      if (images.length === 0) setNoSearchResults(true)
      else if (noSearchResults) setNoSearchResults(false)

      clearError()
      return images
    } catch (error) {
      // Catch error, ensure noSearchResults is false, display error message, and return empty array of images
      if (noSearchResults) setNoSearchResults(false)
      setError("Something went wrong with the search. Please try again.")
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

  // FETCH FAVORITES FROM BACKEND
  const fetchFavorites = async () => {
    try {
      const response = await fetch(baseUrl + `/favorites`)
      const json = await response.json()
      const favorites = json.map(({ id, unsplash_id, url, description }) => {
        return { id, unsplash_id, description, url }
      })
      clearError()
      setFavorites(favorites)
    } catch (error) {
      // Catch error and return empty array of images
      console.error(error)
    }
  }

  // FETCH FAVORITES WHEN COMPONENT MOUNTS
  useEffect(() => {
    fetchFavorites()
  }, [])

  // UPDATE BACKEND WHEN IMAGE IS FAVORITED
  const handleFavorite = async (image) => {
    try {
      await fetch(baseUrl + "/favorites", {
        method: "POST",
        body: JSON.stringify(image),
        headers: {
          "Content-Type": "application/json",
        },
      })

      fetchFavorites()
    } catch {
      setError(
        "Something went wrong when favoriting that image. Please try again."
      )
      console.error(error)
    }
  }

  return (
    <Container textAlign="center">
      <Segment className="wrapper">
        <Header as="h1">ReSplash</Header>
        <SearchForm
          handleSubmit={handleSubmit}
          handleQueryChange={handleQueryChange}
          error={error}
          noSearchResults={noSearchResults}
          query={query}
        />
        {favorites.length > 0 ? (
          <Favorites favorites={favorites} isMobile={isMobile} />
        ) : null}
        {images.length > 0 ? (
          <Images
            images={images}
            favorites={favorites}
            handleFavorite={handleFavorite}
            isMobile={isMobile}
          />
        ) : null}
      </Segment>
    </Container>
  )
}

export default App
