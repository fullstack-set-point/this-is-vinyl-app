import _ from 'lodash'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Search} from 'semantic-ui-react'

class SearchBar extends Component {
  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => {
    this.setState({isLoading: false, results: [], value: ''})
  }

  handleResultSelect = (e, {result}) => {
    this.setState({value: result.title})
    this.props.history.push(`/albums/${result.id}`)
  }

  handleSearchChange = (e, {value}) => {
    this.setState({isLoading: true, value})

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(this.props.albums, isMatch)
      })
    }, 300)
  }

  render() {
    const {isLoading, value, results} = this.state

    return (
      <Search
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={_.debounce(this.handleSearchChange, 500, {
          leading: true
        })}
        results={results}
        value={value}
        placeholder="Search..."
        {...this.props}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    albums: state.album.albums
  }
}

export default connect(mapStateToProps)(SearchBar)
