import React from "react"
import { Card, Grid, Image as SemanticImage } from "semantic-ui-react"

const Image = ({ id, url, description, alt_description }) => {
  return (
    <Grid.Column>
      <Card>
        <SemanticImage
          src={url}
          href={url}
          target="_blank"
          alt={alt_description ? alt_description : `Unsplash image ${id}`}
        />
        {description || alt_description ? (
          <Card.Content>
            {description ? description : alt_description}
          </Card.Content>
        ) : null}
      </Card>
    </Grid.Column>
  )
}

export default Image
