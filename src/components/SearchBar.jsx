import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function SearchBar(props) {
    const { onSubmit } = props;
    const [innerSearch, setInnerSearch] = useState("");
    return (
        <div>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                    name="search"
                    id="search"
                    type="search"
                    value={innerSearch}
                    onChange={(e) => setInnerSearch(e.target.value)}
                />
                <Button variant="outline-secondary" id="button-addon2" onClick={() => onSubmit(innerSearch)}>
                    Submit
                </Button>
            </InputGroup>
        </div>
    );
}