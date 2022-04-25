import { useEffect, useState } from 'react';

import styles from './Result.module.css';

const Result = () => {
  const [result, setResult] = useState({});
  useEffect(() => {
    const nResult = JSON.parse(localStorage.getItem('result'));
    setResult(nResult);
  }, []);

  let domDisplayResult;
  if (result) {
    if (result.status === 'success') {
      domDisplayResult = (
        <div className={styles.result}>
          <h2>
            Success! Congratulations on finding falcone. King Shan is mighty
            pleased.! 😀
          </h2>
          <h2>Time Taken: {result.timeTaken}</h2>
          <h2>Planet found: {result.planet_name}</h2>
        </div>
      );
    } else {
      domDisplayResult = (
        <div className={styles.result}>
          <h2>Oops! You were unable to find falcone. Please try again! 🫤</h2>
        </div>
      );
    }
  } else {
    domDisplayResult = (
      <div className={styles.result}>
        <h2>Oops! No results to display, make sure to play the game. 🫤</h2>
      </div>
    );
  }

  return domDisplayResult;
};

export default Result;
