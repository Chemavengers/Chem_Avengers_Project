import React, { useEffect, useState } from "react";
import { Container, Header,Grid, Segment, Button, Divider,Card } from "semantic-ui-react";
import { Link } from "react-router-dom"

import { GetModules } from "../../../utils/CanvasRequests";

const NoLoginDashboard = () => {
  let [state, setState] = useState([]);

  useEffect(()=>{
    GetModules();
  }, [state])

    console.log(state)
    return (<>
<Grid columns='equal' divided inverted padded>
    <Grid.Row color='black' textAlign='center'>
      <Grid.Column>
        <Segment color='black' inverted>
            <Link to="/"><Button secondary content="Home Page"/></Link>
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment color='black' inverted>
          
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment color='black' inverted>
        <Link to="/login"><Button secondary content="Login"/></Link>
        </Segment>
      </Grid.Column>
    </Grid.Row>
    <Divider horizontal></Divider>
    <Grid.Row>
        <Grid.Column>
        <Card.Group>
        </Card.Group>
          
        </Grid.Column>
    </Grid.Row>
  </Grid>
    </>);
}
 
export default NoLoginDashboard;