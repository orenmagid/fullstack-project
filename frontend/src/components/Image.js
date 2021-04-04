import React from "react"
import {
  Card,
  Grid,
  Button,
  Icon,
  Image as SemanticImage,
} from "semantic-ui-react"

const Image = ({
  id,
  url,
  description,
  alt_description,
  buttonDisabled,
  handleFavorite,
}) => {
  return (
    <Grid.Column>
      <Card>
        <Button
          icon
          labelPosition="left"
          disabled={buttonDisabled}
          onClick={() =>
            handleFavorite({
              unsplash_id: id,
              url,
              description,
              alt_description,
            })
          }
        >
          <Icon name="heart" />
          {buttonDisabled ? "You love this image!" : "Save to Favorites"}
        </Button>

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
