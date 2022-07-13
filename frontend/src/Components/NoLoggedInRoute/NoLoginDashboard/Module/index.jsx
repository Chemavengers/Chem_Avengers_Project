import { Card, Container } from 'semantic-ui-react'

const Module = () => {
    return (<>
        <Container>
            <Card.Group>
        <Card>
        <Card.Content>
            <Card.Header>Matthew Harris</Card.Header>
            <Card.Meta>Co-Worker</Card.Meta>
            <Card.Description>
            Matthew is a pianist living in Nashville.
            </Card.Description>
        </Card.Content>
        </Card>            
        </Container>
    </> );
}
 
export default Module;