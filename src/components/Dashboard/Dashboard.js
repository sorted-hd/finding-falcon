import { useEffect, useState } from 'react';

import axios from 'axios';
import config from '../../config';
import styles from './Dashboard.module.css';

const Dashboard = ({ findFalcone }) => {
  const [planets, setPlanets] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [timeTaken, setTimeTaken] = useState(0);
  useEffect(() => {
    makePlanetsAPICall();
    makeVehiclesAPICall();
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

  const ifDestinationSelected = (destinationName) => {
    let flag = false;
    planets.forEach((planet) => {
      if (planet.selectedBy === destinationName && planet.isSelected) {
        flag = !flag;
      }
    });
    return flag;
  };

  const makeVehiclesAPICall = async () => {
    const responseReceived = await axios.get(config.VEHICLES_API_URL);
    let originalData = responseReceived.data;
    originalData = originalData.map((data) => ({
      ...data,
      isSelected: false,
      nTotal: data.total_no,
      selectedBy: [],
    }));
    setVehicles(originalData);
  };

  const onSelectHandler = (event) => {
    event.preventDefault();
    const curr = event.target;
    const selectedValue = curr.value;
    const selectedName = curr.name;

    let nPlanets = [...planets];
    let nVehicles = [...vehicles];
    nPlanets = nPlanets.map((nPlanet) => {
      if (nPlanet.name === selectedValue) {
        nPlanet = { ...nPlanet, isSelected: true, selectedBy: selectedName };
        return nPlanet;
      } else {
        return nPlanet;
      }
    });

    nPlanets = nPlanets.map((nPlanet) => {
      if (
        nPlanet.selectedBy === selectedName &&
        nPlanet.name !== selectedValue
      ) {
        return { ...nPlanet, isSelected: false, selectedBy: '' };
      }
      return nPlanet;
    });

    nVehicles = nVehicles.map((nVehicle) => {
      if (nVehicle.selectedBy.includes(selectedName)) {
        let idx = nVehicle.selectedBy.indexOf(curr.name);
        nVehicle.selectedBy.splice(idx, 1);
        return {
          ...nVehicle,
          nTotal: nVehicle.nTotal + 1,
          isSelected: false,
          selectedBy: nVehicle.selectedBy,
        };
      }
      return nVehicle;
    });

    setVehicles(nVehicles);
    setPlanets(nPlanets);
  };

  const onVehicleSelectHandler = (event) => {
    const curr = event.target;

    let nVehicles = [...vehicles];
    let nPlanets = [...planets];
    let selectedPlanetDistance = [];
    let selectedVehicleSpeed = 0;
    let nTimeTaken = 0;
    nVehicles = nVehicles.map((nVehicle) => {
      if (nVehicle.name === curr.value) {
        selectedVehicleSpeed = nVehicle.speed;
        return {
          ...nVehicle,
          isSelected: true,
          nTotal: nVehicle.nTotal - 1,
          selectedBy: [...nVehicle.selectedBy, curr.name],
        };
      }
      return nVehicle;
    });

    nVehicles = nVehicles.map((nVehicle) => {
      if (
        nVehicle.selectedBy.includes(curr.name) &&
        nVehicle.name !== curr.value
      ) {
        let idx = nVehicle.selectedBy.indexOf(curr.name);
        nVehicle.selectedBy.splice(idx, 1);
        return {
          ...nVehicle,
          isSelected: false,
          nTotal: nVehicle.nTotal + 1,
          selectedBy: nVehicle.selectedBy,
        };
      }
      return nVehicle;
    });
    console.log(nVehicles);

    nPlanets.forEach((nPlanet) => {
      if (nPlanet.isSelected) {
        selectedPlanetDistance.push(nPlanet);
      }
    });

    nVehicles.forEach((nVehicle) => {
      selectedPlanetDistance.forEach((planetDistance) => {
        if (nVehicle.selectedBy.includes(planetDistance.selectedBy)) {
          nTimeTaken += Math.round(planetDistance.distance / nVehicle.speed);
        }
      });
    });

    setTimeTaken(nTimeTaken);
    setVehicles(nVehicles);
  };

  const getPlanetSelectedFor = (destinationName) => {
    const nPlanets = [...planets];
    for (let idx = 0; idx < nPlanets.length; idx++) {
      if (nPlanets[idx].selectedBy === destinationName) {
        return nPlanets[idx];
      }
    }

    return {};
  };

  const checkVehicleEligibility = (nVehicle, destinationName) => {
    if (nVehicle.nTotal === 0) return true;
    if (nVehicle.max_distance < getPlanetSelectedFor(destinationName).distance)
      return true;

    return false;
  };

  return (
    <div className={styles.dashboard}>
      <span className={styles.dashboard__text}>
        Select planets you want to search in:
      </span>
      <div className={styles.dashboard__selectAction}>
        {config.DESTINATION_LIST.map((destination, idx) => (
          <div className={styles.dashboard__select} key={idx}>
            <span>{destination}</span>
            <select
              onChange={onSelectHandler}
              defaultValue={'default'}
              name={destination}
            >
              <option value="default" disabled={true} hidden={true}>
                SELECT
              </option>
              {planets.map(
                (planet, idx) =>
                  (!planet.isSelected || planet.selectedBy === destination) && (
                    <option key={idx} value={planet.name}>
                      {planet.name}
                    </option>
                  )
              )}
            </select>
            <div className={styles.radioActionBtn}>
              {ifDestinationSelected(destination) && (
                <>
                  {vehicles.map((vehicle, idx) => (
                    <div key={idx}>
                      <input
                        type="radio"
                        name={destination}
                        onChange={onVehicleSelectHandler}
                        value={vehicle.name}
                        disabled={checkVehicleEligibility(vehicle, destination)}
                        checked={vehicle.selectedBy.includes(destination)}
                      />
                      {`${vehicle.name} ${vehicle.nTotal}`}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        ))}
        <div className={styles.dashboard__select}>Time Taken: {timeTaken}</div>
      </div>

      <div className={styles.dashboard__btnAction}>
        <button onClick={findFalcone.bind(null, vehicles, planets, timeTaken)}>
          <span>Find Falcone!</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
