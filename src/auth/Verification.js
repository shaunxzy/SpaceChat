import {Button, Card, Form} from "react-bootstrap";

const Verification = props => {
    return (
        <Card>
            <Card.Header>Verification</Card.Header>
            <Card.Body>
                <Form>

                    <Button type={"submit"} className={"mt-2"}>Verify</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default Verification