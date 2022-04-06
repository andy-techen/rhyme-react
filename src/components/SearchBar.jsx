import './SearchBar.css';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect, useRef } from 'react';

const SearchBar = (props) => {
    const wordRef = useRef();

    const datamuseRequest = (url, callback) => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                callback(data);
            }, (err) => {
                console.error(err);
            });
    }

    const getRhymeUrl = (rel_rhy) => {
        return `https://api.datamuse.com/words?${(new URLSearchParams({ 'rel_rhy': rel_rhy })).toString()}`;
    }

    const getSimilarToUrl = (ml) => {
        return `https://api.datamuse.com/words?${(new URLSearchParams({ 'ml': ml })).toString()}`;
    }

    const sendOutput = (input, type) => {
        props.setLoading(true);
        let url = (type == 'rhymes') ? getRhymeUrl(input) : getSimilarToUrl(input);
        datamuseRequest(url, res => {
            console.log(res);
            props.setOutput(res);
            props.setType(type);
            props.setTerm(input);
            props.setLoading(false);
        });
    }

    return (
        <Row>
            <InputGroup className="mb-3">
                <Form.Control ref={wordRef} type="text" placeholder="Enter a word" />
                <Button onClick={() => sendOutput(wordRef.current.value, "rhymes")} variant="primary" type="submit">
                    Show rhyming words
                </Button>
                <Button onClick={() => sendOutput(wordRef.current.value, "synonyms")} variant="secondary" type="submit">
                    Show synonyms
                </Button>
            </InputGroup>
        </Row>
    );
}

export default SearchBar;