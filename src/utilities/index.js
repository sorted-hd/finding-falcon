import { StatusCodes } from 'http-status-codes';
import axios from 'axios';
import config from '../config';

const makeAPICallForPlanets = async () => {
  let responseReceived = await axios.get(config.PLANETS_API_URL);
  if (responseReceived.status !== StatusCodes.OK) {
    throw new Error('Something happened while making a network call');
  }
  let originalData = responseReceived.data;
  return originalData.map((data) => ({
    ...data,
    isSelected: false,
    selectedBy: '',
  }));
};

const makeAPICallForVehicles = async () => {
  let responseReceived = await axios.get(config.VEHICLES_API_URL);
  if (responseReceived.status !== StatusCodes.OK) {
    throw new Error('Something happened while making a network call');
  }
  let originalData = responseReceived.data;
  return originalData.map((data) => ({
    ...data,
    isSelected: false,
    nTotal: data.total_no,
    selectedBy: [],
  }));
};

const checkPlanetsSelected = (destinationName, planets) => {
  const selected = (planet) =>
    planet.selectedBy === destinationName && planet.isSelected;
  return planets.some(selected);
};

const getPlanetSelectedFor = (destinationName, planets) => {
  for (let idx = 0; idx < planets.length; idx++) {
    if (planets[idx].selectedBy === destinationName) {
      return planets[idx];
    }
  }

  return {};
};

const checkVehicleEligibility = (vehicle, destinationName, planets) => {
  if (vehicle.nTotal === 0) return true;
  return (
    vehicle.max_distance <
    getPlanetSelectedFor(destinationName, planets).distance
  );
};

const checkFindButtonEligibility = (planets, vehicles) => {
  let selectionsRequired = config.DESTINATION_LIST.length;
  let planetSelectionsAvailable = planets.reduce((total, planet) => {
    if (planet.isSelected) {
      return (total += 1);
    }
    return total;
  }, 0);

  let vehicleSelectionsAvailable = vehicles.reduce((total, vehicle) => {
    return (total += vehicle.selectedBy.length);
  }, 0);

  return !(
    planetSelectionsAvailable === selectionsRequired &&
    vehicleSelectionsAvailable === selectionsRequired
  );
};

const calculateTimeTaken = (vehicles, planets) => {
  let selectedPlanetDistance = [];
  let nTimeTaken = 0;

  planets.forEach((nPlanet) => {
    if (nPlanet.isSelected) {
      selectedPlanetDistance.push(nPlanet);
    }
  });

  vehicles.forEach((nVehicle) => {
    selectedPlanetDistance.forEach((planetDistance) => {
      if (nVehicle.selectedBy.includes(planetDistance.selectedBy)) {
        nTimeTaken += Math.round(planetDistance.distance / nVehicle.speed);
      }
    });
  });

  return nTimeTaken;
};

const handleSelectionForPlanets = (
  vehicles,
  planets,
  selectedValue,
  selectedName
) => {
  planets = planets.map((nPlanet) => {
    if (nPlanet.name === selectedValue) {
      nPlanet = { ...nPlanet, isSelected: true, selectedBy: selectedName };
      return nPlanet;
    } else {
      return nPlanet;
    }
  });

  planets = planets.map((nPlanet) => {
    if (nPlanet.selectedBy === selectedName && nPlanet.name !== selectedValue) {
      return { ...nPlanet, isSelected: false, selectedBy: '' };
    }
    return nPlanet;
  });

  vehicles = vehicles.map((nVehicle) => {
    if (nVehicle.selectedBy.includes(selectedName)) {
      let idx = nVehicle.selectedBy.indexOf(selectedName);
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

  return { mPlanets: planets, mVehicles: vehicles };
};

const handleSelectionForVehicles = (vehicles, selectedValue, selectedName) => {
  vehicles = vehicles.map((nVehicle) => {
    if (nVehicle.name === selectedValue) {
      return {
        ...nVehicle,
        isSelected: true,
        nTotal: nVehicle.nTotal - 1,
        selectedBy: [...nVehicle.selectedBy, selectedName],
      };
    }
    return nVehicle;
  });

  vehicles = vehicles.map((nVehicle) => {
    if (
      nVehicle.selectedBy.includes(selectedName) &&
      nVehicle.name !== selectedValue
    ) {
      let idx = nVehicle.selectedBy.indexOf(selectedName);
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

  return vehicles;
};

const removeResult = () => {
  localStorage.removeItem(config.RESULT);
};

export {
  makeAPICallForPlanets,
  makeAPICallForVehicles,
  checkPlanetsSelected,
  checkFindButtonEligibility,
  checkVehicleEligibility,
  calculateTimeTaken,
  handleSelectionForPlanets,
  handleSelectionForVehicles,
  removeResult,
};
