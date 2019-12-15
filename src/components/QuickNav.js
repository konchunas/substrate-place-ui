import React from "react";

import { Segment, Header, Input, Button } from "semantic-ui-react";

const QuickNavSegment = props => {
  let [x, setX] = React.useState(0)
  let [y, setY] = React.useState(0)

  return (
    <Segment>
      <Header>Quickly navigate</Header>
      <Input
        style={{ width: '8em', marginRight: '1em'}}
        placeholder='X' 
        onChange={event => setX(event.target.value)} />
      <Input 
        style={{ width: '8em', marginRight: '1em'}}
        placeholder='Y'
        onChange={event => setY(event.target.value)} />
      <Button onClick={event => props.onNavigate(x,y)}>Go</Button>
    </Segment>
    )
}

export default QuickNavSegment;
