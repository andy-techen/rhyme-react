import './WordOutput.css';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

const WordOutput = (props) => {
    const groupBy = (objects, property) => {
        // If property is not a function, convert it to a function that accepts one argument (an object) and returns that object's
        // value for property (obj[property])
        if (typeof property !== 'function') {
            const propName = property;
            property = (obj) => obj[propName];
        }

        const groupedObjects = new Map(); // Keys: group names, value: list of items in that group
        for (const object of objects) {
            const groupName = property(object);
            //Make sure that the group exists
            if (!groupedObjects.has(groupName)) {
                groupedObjects.set(groupName, []);
            }
            groupedObjects.get(groupName).push(object);
        }

        // Create an object with the results. Sort the keys so that they are in a sensible "order"
        const result = {};
        for (const key of Array.from(groupedObjects.keys()).sort()) {
            result[key] = groupedObjects.get(key);
        }
        return result;
    }

    const displayRhymes = () => {
        if (props.loading) {
            return 'loading...'
        } else {
            const result = []
            let output_grouped = groupBy(props.output, "numSyllables");
            for (var num in output_grouped) {
                result.push(<h3 key={`syllables_${num}`}>Syllables: {num}</h3>);
                let result_syl = output_grouped[num].map((term, idx) => {
                    return <li key={`${num}_${idx}`}>{term['word']}<Button onClick={() => props.onSave(term['word'])} variant="outline-success" className="save-btn">Save</Button></li>;
                });
                result.push(result_syl);
            }
            return result;
        }
    }

    const displaySynonyms = () => {
        if (props.loading) {
            return 'loading...'
        } else {
            let result = props.output.map((term, idx) => {
                return <li key={idx}>{term['word']}<Button onClick={() => props.onSave(term['word'])} variant="outline-success" className="save-btn">Save</Button></li>;
            });
            return result;
        }
    }

    if (props.output.length === 0) {
        return (
            <p>(no results)</p>
        );
    } else if (props.type == 'rhymes') {
        return (
            <>
                <h2>Words that rhyme with {props.term}</h2>
                {displayRhymes()}
            </>
        );
    } else if (props.type == 'synonyms') {
        return (
            <>
                <h2>Words with a similar meaning to {props.term}</h2>
                {displaySynonyms()}
            </>
        );
    } else {
        return (null);
    }
}

export default WordOutput;