import React from "react"
import { Segment, Grid, Header } from "semantic-ui-react"
import Image from "./Image"
const Images = ({ images }) => {
  return (
    <Segment>
      <Header as="h2">Search Results</Header>

      <Grid columns={4}>
        {images.map(({ id, url, description, alt_description }) => {
          return (
            <Image
              key={id}
              url={url}
              description={description}
              alt_description={alt_description}
            />
          )
        })}
      </Grid>
    </Segment>
  )
}

export default Images
