import React from "react"
import { Segment, Grid, Header } from "semantic-ui-react"
import Image from "./Image"

const Images = ({ images, handleFavorite, favorites, isMobile }) => {
  return (
    <Segment>
      <Header as="h2">Search Results</Header>

      <Grid columns={isMobile ? 1 : 4}>
        {images.map(({ id, url, description, alt_description }) => {
          // Determine which results are already favorites so as to disable button
          const alreadyFavorited =
            favorites.map((favorite) => favorite.unsplash_id).indexOf(id) > -1
              ? true
              : false
          return (
            <Image
              key={id}
              id={id}
              url={url}
              description={description}
              alt_description={alt_description}
              handleFavorite={handleFavorite}
              buttonDisabled={alreadyFavorited}
            />
          )
        })}
      </Grid>
    </Segment>
  )
}

export default Images
