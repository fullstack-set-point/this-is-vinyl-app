import React from 'react'
import {Segment, Button, Header} from 'semantic-ui-react'

const CategoryFilter = props => {
  return (
    <div>
      <Header as="h5">Shop by Genre</Header>
      <Button.Group vertical>
        <Button value={1} onClick={props.handleCategoryClick}>
          Rock
        </Button>
        <Button value={2} onClick={props.handleCategoryClick}>
          Reggae
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
        <Button value={8} onClick={props.handleCategoryClick}>
          Metal
        </Button>
        <Button value={9} onClick={props.handleCategoryClick}>
          Folk
        </Button>
        <Button value={10} onClick={props.handleCategoryClick}>
          Classical
        </Button>
      </Button.Group>
    </div>
  )
}

export default CategoryFilter
