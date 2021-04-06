import React from "react"
import { Form, Button, Message } from "semantic-ui-react"

const SearchForm = ({
  handleSubmit,
  handleQueryChange,
  error,
  noSearchResults,
  query,
}) => {
  // Set message in the case of error or no search results
  let message = ""
  if (error) message = error
  else if (noSearchResults) message = "Your search returned no results"

  return (
    //  If empty string in search form (i.e. no user input), no submit handler attached to form
    // TODO: look into best practices. Is it better to check for empty string in handleSubmit and return from the handler if found? Maybe, but is it also less testable in isolation? See second test in frontend/src/components/SearchForm.test.js.
    <Form onSubmit={query ? handleSubmit : null}>
      <Form.Field>
        <label>
          Search for Unsplash Images
          <input
            placeholder="Enter your search term here"
            name="search"
            value={query}
            onChange={handleQueryChange}
          />
        </label>
      </Form.Field>
      {message ? (
        <Message negative={error ? true : false}>
          <Message.Header>{message}</Message.Header>
        </Message>
      ) : null}
      <Button type="submit">Submit</Button>
    </Form>
  )
}

export default SearchForm
