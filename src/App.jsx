import { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [quote, setQuote] = useState({});
  const [clip, setClip] = useState(false);

  const handleClick = () => {
    setCount((count) => count + 1);
  };

  const handleClip = () => {
    setClip(true);
  };

  useEffect(() => {
    const getQuote = async () => {
      const res = await fetch(
        'https://api.api-ninjas.com/v1/jokes?limit=1',
        {
          headers: {
            'X-Api-Key': '9WGxlZVMAugLQgr4V2TgvA==XvVN5Eyx3OgNPX14',
          },
        }
      );

      const quote = await res.json();

      setQuote(quote.at(0));
    };
    getQuote();
  }, [count]);

  useEffect(() => {
    if (navigator.clipboard) {
      if (clip) {
        const clipData = async () => {
          try {
            await navigator.clipboard.writeText(quote.joke);
          } catch (error) {
            console.error(error.message);
          }
        };
        clipData();
      }
    }
  }, [clip]);

  return (
    <div className="box">
      <div>
        <i className="fa-solid fa-quote-left"></i>
        <h2>Jokes for the Day</h2>
        <i className="fa-solid fa-quote-right"></i>
      </div>
      <blockquote>{quote.joke}</blockquote>

      <div className="bottom">
        <button onClick={handleClip}>
          <i className="fa-solid fa-copy fa-xs copy"></i>
          <span>{clip ? 'copied' : 'copy'}</span>
        </button>
        <button onClick={() => handleClick()}>New Quote</button>
      </div>
    </div>
  );
}

export default App;
