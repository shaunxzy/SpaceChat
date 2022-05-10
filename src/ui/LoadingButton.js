import {Spinner, Button} from "react-bootstrap";

const LoadingButton = props => {

    return (
        <Button className={props.className} variant="primary" disabled>
            <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
            />
            Loading...
        </Button>
    )
}

export default LoadingButton;