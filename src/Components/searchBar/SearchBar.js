import { Button, Form, InputGroup } from "react-bootstrap";

export default function SearchBar() {
    return (
        <div className="d-flex justify-content-center align-items-center">
            <InputGroup size="lg" className="p-5 w-50">
                <Form.Control type="text" placeholder="Enter link here" />
                <Button variant="danger">Download</Button>
            </InputGroup>
        </div>
    );
}