import { useEffect, useState } from 'react';

const Result = () => {
  const [result, setResult] = useState({});
  useEffect(() => {
    const nResult = JSON.parse(localStorage.getItem('result'));
    setResult(nResult);
  }, []);

  let domDisplayResult;
  if (result) {
    if (!result.status) {
      domDisplayResult = (
        <div>
          <h1>Oops! You were unable to find falcone. Please try again! 🫤</h1>
        </div>
      );
    } else {
      domDisplayResult = (
        <div>
          <h1>
            Success! Congratulations on finding falcone. King Shan is mighty
            pleased.! 😀
          </h1>
          <h3>Time Taken: {result.timeTaken}</h3>
          <h3>Planet found: {result.planet_name}</h3>
        </div>
      );
    }
  } else {
    domDisplayResult = (
      <div>
        <h1>Oops! No results to display, make sure to play the game. 🫤</h1>
      </div>
    );
  }

  return domDisplayResult;
};

export default Result;
