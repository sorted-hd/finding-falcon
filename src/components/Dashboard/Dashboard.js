import { useEffect, useState } from 'react';

import axios from 'axios';
import config from '../../config';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [planets, setPlanets] = useState([]);
  useEffect(() => {
    makePlanetsAPICall();
  }, []);

  const makePlanetsAPICall = async () => {
    const responseReceived = await axios.get(config.PLANETS_API_URL);
    let originalData = responseReceived.data;
    originalData = originalData.map((data) => ({
      ...data,
      isSelected: false,
      selectedBy: '',
    }));
    setPlanets(originalData);
  };

  const onSelectHandler = (event) => {
    const curr = event.target;
    const selectedValue = curr.value.toLowerCase();
    const selectedName = curr.name.toLowerCase();
    console.log(selectedValue);
    let nPlanets = [...planets];
    nPlanets = nPlanets.map((nPlanet) => {
      if (nPlanet.name.toLowerCase() === selectedValue) {
        nPlanet = { ...nPlanet, isSelected: true, selectedBy: selectedName };
        return nPlanet;
      } else {
        return nPlanet;
      }
    });

    nPlanets = nPlanets.map((nPlanet) => {
      if (
        nPlanet.selectedBy === selectedName &&
        nPlanet.name.toLowerCase() !== selectedValue
      ) {
        return { ...nPlanet, isSelected: false, selectedBy: '' };
      }
      return nPlanet;
    });
    console.log(nPlanets);
    setPlanets(nPlanets);
  };

  return (
    <div className={styles.dashboard}>
      <span className={styles.dashboard__text}>
        Select planets you want to search in:
      </span>
      <div className={styles.dashboard__selectAction}>
        <div className={styles.dashboard__select}>
          <span>Destination 1</span>
          <select
            onChange={onSelectHandler}
            defaultValue={'default'}
            name="destination1"
          >
            <option value="default" disabled={true} hidden={true}>
              SELECT
            </option>
            {planets.map(
              (planet, idx) =>
                (!planet.isSelected ||
                  planet.selectedBy === 'destination1') && (
                  <option key={idx} value={planet.name}>
                    {planet.name}
                  </option>
                )
            )}
          </select>
        </div>
        <div className={styles.dashboard__select}>
          <span>Destination 2</span>
          <select
            onChange={onSelectHandler}
            name="destination2"
            defaultValue={'default'}
          >
            <option value="default" disabled={true} hidden={true}>
              SELECT
            </option>
            {planets.map(
              (planet, idx) =>
                (!planet.isSelected ||
                  planet.selectedBy === 'destination2') && (
                  <option key={idx} value={planet.name}>
                    {planet.name}
                  </option>
                )
            )}
          </select>
        </div>
        <div className={styles.dashboard__select}>
          <span>Destination 3</span>
          <select
            onChange={onSelectHandler}
            name="destination3"
            defaultValue={'default'}
          >
            <option value="default" disabled={true} hidden={true}>
              SELECT
            </option>
            {planets.map(
              (planet, idx) =>
                (!planet.isSelected ||
                  planet.selectedBy === 'destination3') && (
                  <option key={idx} value={planet.name}>
                    {planet.name}
                  </option>
                )
            )}
          </select>
        </div>
        <div className={styles.dashboard__select}>
          <span>Destination 4</span>
          <select
            onChange={onSelectHandler}
            name="destination4"
            defaultValue={'default'}
          >
            <option value="default" disabled={true} hidden={true}>
              SELECT
            </option>
            {planets.map(
              (planet, idx) =>
                (!planet.isSelected ||
                  planet.selectedBy === 'destination4') && (
                  <option key={idx} value={planet.name}>
                    {planet.name}
                  </option>
                )
            )}
          </select>
        </div>
        <div className={styles.dashboard__select}>Time Taken: 50</div>
      </div>

      <div className={styles.dashboard__btnAction}>
        <button>
          <span>Find Falcone!</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
