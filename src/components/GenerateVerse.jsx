import { useState } from 'react';
import { buttonStyles, resultStyles, inputStyles } from '../styles/GenerateRand.styles.jsx';

const GenSpecific = () => {
    const [passage, setPassage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [book, setBook] = useState(''); //for the name of the book

    const splitPassage = (input) => {
        //split "John 3:16-17" into parts
        const parts = input.trim().split(' ');
        if (parts.length >= 2) {
            const book = parts[0]; // "John"
            const chapterVerse = parts.slice(1).join(' '); // "3:16-17"
            return `${book} ${chapterVerse}`;
        }
        return input; //return as-is if can't split properly
    };

    const generateVerse = async () => {
        if (!book.trim()) {
            alert('Please enter a valid passage (e.g., John 3:16-17)');
            return;
        }
        
        setLoading(true);
        try {
            const formattedPassage = splitPassage(book);
            const response = await fetch(`https://labs.bible.org/api/?passage=${encodeURIComponent(formattedPassage)}`);
            const text = await response.text();
            
            setPassage(text);
        } catch (error) {
            console.log(error);
            setPassage('Error fetching passage. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input 
                type="text"
                placeholder="Enter passage (e.g., John 3:16-17)"
                style={inputStyles}
                value={book}
                onChange={(e) => setBook(e.target.value)}
            />
            <button 
                onClick={generateVerse}
                style={buttonStyles}
                onMouseOver={(e) => e.target.style.backgroundColor = '#005a9e'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#007acc'}
                disabled={loading}
            >
                {loading ? 'Loading...' : 'Generate Passage'}
            </button>
            {passage && (
                <div style={resultStyles}>
                    <h3>Bible Passage:</h3>
                    <p dangerouslySetInnerHTML={{ __html: passage.replace('</b>', '</b><br>') }}></p>
                </div>
            )}
        </div>
    );
};

export default GenSpecific;