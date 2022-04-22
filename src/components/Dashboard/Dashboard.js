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
      selectedBy: '',
    }));
    setVehicles(originalData);
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

  const onVehicleSelectHandler = (event) => {
    const curr = event.target;
    console.dir(curr.value);
    console.log(curr.name);

    let nVehicles = [...vehicles];
    let nPlanets = [...planets];
    let selectedPlanetDistance = 0;
    let selectedVehicleSpeed = 0;
    nVehicles = nVehicles.map((nVehicle) => {
      if (nVehicle.name === curr.value) {
        selectedVehicleSpeed = nVehicle.speed;
        return {
          ...nVehicle,
          isSelected: true,
          nTotal: nVehicle.nTotal - 1,
          selectedBy: curr.name,
        };
      }
      return nVehicle;
    });

    nVehicles = nVehicles.map((nVehicle) => {
      if (nVehicle.selectedBy === curr.name && nVehicle.name !== curr.value) {
        return {
          ...nVehicle,
          isSelected: false,
          nTotal: nVehicle.nTotal + 1,
          selectedBy: '',
        };
      }
      return nVehicle;
    });

    nPlanets.forEach((nPlanet) => {
      if (nPlanet.isSelected && nPlanet.selectedBy === curr.name) {
        selectedPlanetDistance = nPlanet.distance;
      }
    });

    setTimeTaken(
      (current) =>
        current + Math.round(selectedPlanetDistance / selectedVehicleSpeed)
    );
    setVehicles(nVehicles);
  };

  const getPlanetSelectedFor = (destinationName) => {
    const nPlanets = [...planets];
    for (let idx = 0; idx < nPlanets.length; idx++) {
      if (
        nPlanets[idx].selectedBy.toLowerCase() === destinationName.toLowerCase()
      ) {
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
          <div className={styles.radioActionBtn}>
            {ifDestinationSelected('destination1') && (
              <>
                {vehicles.map((vehicle, idx) => (
                  <div key={idx}>
                    <input
                      type="radio"
                      name="destination1"
                      onChange={onVehicleSelectHandler}
                      value={vehicle.name}
                      disabled={checkVehicleEligibility(
                        vehicle,
                        'destination1'
                      )}
                    />
                    {`${vehicle.name} ${vehicle.nTotal}`}
                  </div>
                ))}
              </>
            )}
          </div>
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
          <div className={styles.radioActionBtn}>
            {ifDestinationSelected('destination2') && (
              <>
                {vehicles.map((vehicle, idx) => (
                  <div key={idx}>
                    <input
                      type="radio"
                      name="destination2"
                      onChange={onVehicleSelectHandler}
                      value={vehicle.name}
                      disabled={checkVehicleEligibility(
                        vehicle,
                        'destination2'
                      )}
                    />
                    {`${vehicle.name} ${vehicle.nTotal}`}
                  </div>
                ))}
              </>
            )}
          </div>
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
          <div className={styles.radioActionBtn}>
            {ifDestinationSelected('destination3') && (
              <>
                {vehicles.map((vehicle, idx) => (
                  <div key={idx}>
                    <input
                      type="radio"
                      name="destination3"
                      onChange={onVehicleSelectHandler}
                      value={vehicle.name}
                      disabled={checkVehicleEligibility(
                        vehicle,
                        'destination3'
                      )}
                    />
                    {`${vehicle.name} ${vehicle.nTotal}`}
                  </div>
                ))}
              </>
            )}
          </div>
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
          <div className={styles.radioActionBtn}>
            {ifDestinationSelected('destination4') && (
              <>
                {vehicles.map((vehicle, idx) => (
                  <div key={idx}>
                    <input
                      type="radio"
                      name="destination4"
                      onChange={onVehicleSelectHandler}
                      value={vehicle.name}
                      disabled={checkVehicleEligibility(
                        vehicle,
                        'destination4'
                      )}
                    />
                    {`${vehicle.name} ${vehicle.nTotal}`}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
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
