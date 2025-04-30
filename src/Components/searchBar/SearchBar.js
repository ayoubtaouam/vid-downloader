import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

export default function SearchBar() {
    const [url, setUrl] = useState('');
    let isUrlEmpty = !url;
    const handleChange = ({target}) => {
        setUrl(target.value);
    }
    const handleClick = async () => {
        try {    
            const response = await fetch('http://localhost:8080/api/download', {method: 'POST', headers: {'content-type': 'application/json'}, body: JSON.stringify({url})});
            if (response.ok) {
                const textResponse = await response.text();
                console.log(textResponse);
            }
        } catch(error) {
            console.log(error.message);
        }
    }
    return (
        <div className="d-flex justify-content-center align-items-center">
            <InputGroup size="lg" className="p-5 w-50">
                <Form.Control value={url} type="text" placeholder="Enter link here" onChange={handleChange} />
                <Button disabled={isUrlEmpty} variant="danger" onClick={handleClick}>Download</Button>
            </InputGroup>
        </div>
    );
}