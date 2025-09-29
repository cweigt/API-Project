import { useState } from 'react';
import { buttonStyles, resultStyles } from '../styles/GenerateRand.styles.jsx';

const GenRand = () => {
    const [randomPassage, setRandomPassage] = useState(null);
    const [loading, setLoading] = useState(false);

    const generateRandom = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://labs.bible.org/api/?passage=random');
            const text = await response.text();
            setRandomPassage(text);
        } catch (error) {
            console.error('Error fetching random passage:', error);
            setRandomPassage('Error fetching passage. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button 
                onClick={generateRandom}
                style={buttonStyles}
                onMouseOver={(e) => e.target.style.backgroundColor = '#005a9e'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#007acc'}
                disabled={loading}
            >
                {loading ? 'Loading...' : 'Generate Random Passage'}
            </button>
            {randomPassage && (
                <div style={resultStyles}>
                    <h3>Random Bible Passage:</h3>
                    <p dangerouslySetInnerHTML={{ __html: randomPassage.replace('</b>', '</b><br>') }}></p>
                </div>
            )}
        </div>
    );

}

export default GenRand;