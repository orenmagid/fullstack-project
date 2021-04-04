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
          // TODO: Should probably be using unsplash_id rather than url, even though the latter is also unique, but haven't passed it in yet.
          const alreadyFavorited =
            favorites.map((favorite) => favorite.url).indexOf(url) > -1
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
