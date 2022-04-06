import './App.css';
import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import SavedWords from './components/SavedWords';
import WordOutput from './components/WordOutput';
import Container from 'react-bootstrap/Container';

function App() {
  const [savedWords, setSavedWords] = useState([]);
  const [term, setTerm] = useState('');
  const [type, setType] = useState('');
  const [output, setOutput] = useState('none');
  const [loading, setLoading] = useState(false);

  return (
    <Container>
      <h1>Rhyme Finder (579 Problem Set 6)</h1>
      <a href="https://github.com/andy-techen/rhyme-react" target="_blank">Github Repo</a>
      <SavedWords words={savedWords} />
      <SearchBar setOutput={setOutput} setType={setType} setTerm={setTerm} setLoading={setLoading} />
      <WordOutput loading={loading} output={output} type={type} term={term} onSave={(word) => setSavedWords((savedWords) => [...savedWords, word])} />
    </Container>
  );
}

export default App;
