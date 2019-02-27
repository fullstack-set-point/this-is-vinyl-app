import React from 'react'
import {Segment, Button, Header} from 'semantic-ui-react'

const CategoryFilter = props => {
  return (
    <Segment>
      <Header as="h4">Shop by Genre</Header>
      <Button.Group vertical>
        <Button value={1} onClick={props.handleCategoryClick}>
          Rock
        </Button>
        <Button value={2} onClick={props.handleCategoryClick}>
          Classical
        </Button>
        <Button value={3} onClick={props.handleCategoryClick}>
          Country
        </Button>
        <Button value={4} onClick={props.handleCategoryClick}>
          Jazz
        </Button>
        <Button value={5} onClick={props.handleCategoryClick}>
          Rap
        </Button>
        <Button value={6} onClick={props.handleCategoryClick}>
          Electronic
        </Button>
        <Button value={7} onClick={props.handleCategoryClick}>
          Pop
        </Button>
      </Button.Group>
    </Segment>
  )
}

export default CategoryFilter
