import './SavedWords.css';

const SavedWords = (props) => {
    return (
        <div>
            Saved words: <span id="saved_words">{props.words.length > 0 ? props.words.join(', ') : '(none)'}</span>
        </div>
    );
}

export default SavedWords;