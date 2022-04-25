import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import config from '../../config';
import { removeResult } from '../../utilities';
import styles from './Result.module.css';

const Result = () => {
  const [result, setResult] = useState({});
  useEffect(() => {
    const nResult = JSON.parse(localStorage.getItem(config.RESULT));
    removeResult();
    return () => {
      setResult(nResult);
    };
  }, []);

  let domDisplayResult;
  if (result) {
    if (result.status === 'success') {
      domDisplayResult = (
        <>
          <h2>
            Success! Congratulations on finding falcone. King Shan is mighty
            pleased.! 😀
          </h2>
          <h2>Time Taken: {result.timeTaken}</h2>
          <h2>Planet found: {result.planet_name}</h2>
        </>
      );
    } else {
      domDisplayResult = (
        <h2>Oops! You were unable to find falcone. Please try again! 🫤</h2>
      );
    }
  } else {
    domDisplayResult = (
      <h2>Oops! No results to display, make sure to play the game. 🫤</h2>
    );
  }

  return (
    <div className={styles.result}>
      {domDisplayResult}
      <Link
        to="/reset"
        className={styles.link}
        onClick={() => {
          removeResult();
        }}
      >
        <span className={styles.actionItem__text}>Play Again</span>
      </Link>
    </div>
  );
};

export default Result;
