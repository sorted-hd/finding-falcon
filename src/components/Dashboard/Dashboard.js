import {
  calculateTimeTaken,
  checkFindButtonEligibility,
  checkPlanetsSelected,
  checkVehicleEligibility,
  handleSelectionForPlanets,
  handleSelectionForVehicles,
  makeAPICallForPlanets,
  makeAPICallForVehicles,
} from '../../utilities';
import { useEffect, useState } from 'react';

import Destination from '../Destination/Destination';
import { StatusCodes } from 'http-status-codes';
import Vehicles from '../Vehicles/Vehicles';
import config from '../../config';
import styles from './Dashboard.module.css';

const Dashboard = ({ findFalcone }) => {
  const [planets, setPlanets] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [timeTaken, setTimeTaken] = useState(0);
  const [error, setError] = useState({});

  useEffect(() => {
    performAPICallFor(config.PLANETS);
    performAPICallFor(config.VEHICLES);
  }, []);

  const performAPICallFor = async (keyword) => {
    try {
      if (keyword === config.PLANETS) {
        let responseReceived = await makeAPICallForPlanets();
        setPlanets(responseReceived);
      }
      if (keyword === config.VEHICLES) {
        let responseReceived = await makeAPICallForVehicles();
        setVehicles(responseReceived);
      }
    } catch (error) {
      const statusCode = error.response.status
        ? error.response.status
        : StatusCodes.BAD_REQUEST;
      setError({ statusCode, message: error.message });
    }
  };

  const onSelectHandler = (event) => {
    event.preventDefault();
    const curr = event.target;
    const selectedValue = curr.value;
    const selectedName = curr.name;

    let nPlanets = [...planets];
    let nVehicles = [...vehicles];

    let { mPlanets, mVehicles } = handleSelectionForPlanets(
      nVehicles,
      nPlanets,
      selectedValue,
      selectedName
    );

    setVehicles(mVehicles);
    setPlanets(mPlanets);
  };

  const onVehicleSelectHandler = (event) => {
    const curr = event.target;
    const selectedValue = curr.value;
    const selectedName = curr.name;

    let nVehicles = [...vehicles];
    let nPlanets = [...planets];

    nVehicles = handleSelectionForVehicles(
      nVehicles,
      selectedValue,
      selectedName
    );

    setTimeTaken(calculateTimeTaken(nVehicles, nPlanets));
    setVehicles(nVehicles);
  };

  if (error.message) {
    return <h1 className={styles.error}>{error.message}</h1>;
  }

  return (
    <div className={styles.dashboard}>
      <span className={styles.dashboard__text}>
        Select planets you want to search in:
      </span>
      <div className={styles.dashboard__selectAction}>
        {config.DESTINATION_LIST.map((destination, idx) => (
          <div className={styles.dashboard__select} key={idx}>
            <Destination
              destination={destination}
              planets={planets}
              onChange={onSelectHandler}
            />

            <div className={styles.radioActionBtn}>
              {checkPlanetsSelected(destination, planets) && (
                <>
                  {vehicles.map((vehicle, idx) => (
                    <Vehicles
                      key={idx}
                      destination={destination}
                      onChange={onVehicleSelectHandler}
                      vehicle={vehicle}
                      disabled={checkVehicleEligibility(
                        vehicle,
                        destination,
                        planets
                      )}
                      checked={vehicle.selectedBy.includes(destination)}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        ))}
        <div className={styles.timeTaken}>Time Taken: {timeTaken}</div>
      </div>

      <div className={styles.dashboard__btnAction}>
        <button
          onClick={findFalcone.bind(null, vehicles, planets, timeTaken)}
          disabled={checkFindButtonEligibility(planets, vehicles)}
        >
          <span>Find Falcone!</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
