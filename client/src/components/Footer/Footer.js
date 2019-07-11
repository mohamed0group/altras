import React, { Component } from 'react'
import { Divider, List} from 'semantic-ui-react'

export default class Footer extends Component {
  render() {
    return (
      <div>
        <Divider inverted section />
        <List horizontal inverted divided link size='small'>
          <List.Item as='a' href='https://github.com/mohamed0group'>
            Mohamed Abdeen
          </List.Item>
          <List.Item as='a' href='https://github.com/mohamed0group'>
            Github
          </List.Item>
        </List>
      </div>
    )
  }
}
