import React from "react"
import { Segment, Grid, Header } from "semantic-ui-react"
import Image from "./Image"

const Favorites = ({ favorites, isMobile }) => {
  return (
    <Segment>
      <Header as="h2">Favorites</Header>
      <Grid columns={isMobile ? 1 : 4}>
        {favorites.map(({ id, url, description, alt_description }) => {
          return (
            <Image
              key={id}
              url={url}
              description={description}
              alt_description={alt_description}
              buttonDisabled={true}
            />
          )
        })}
      </Grid>
    </Segment>
  )
}

export default Favorites
