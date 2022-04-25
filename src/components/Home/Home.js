import Dashboard from '../Dashboard/Dashboard';
import axios from 'axios';
import config from '../../config';
import styles from './Home.module.css';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const history = useHistory();

  const handleFalconeSearch = async (vehicles, planets, timeTaken) => {
    let planet_names = [];
    let vehicle_names = [];
    planets.forEach((planet) => {
      if (planet.isSelected) {
        return planet_names.push(planet.name);
      }
    });
    vehicles.forEach((vehicle) => {
      let diffCount = vehicle.total_no - vehicle.nTotal;
      while (diffCount-- > 0) {
        vehicle_names.push(vehicle.name);
      }
    });

    const result = await performFalconeAPICall({ vehicle_names, planet_names });
    const payload = { ...result, timeTaken };
    localStorage.setItem(config.RESULT, JSON.stringify(payload));
    history.push('/results');
  };

  const performFalconeAPICall = async (payload) => {
    const token = await axios
      .post(config.TOKEN_URL, {}, config.API_CONFIG)
      .then((response) => response.data);

    payload.token = token.token;

    const falconeStatus = await axios
      .post(config.FIND_API_URL, JSON.stringify(payload), config.API_CONFIG)
      .then((response) => response.data);

    return falconeStatus;
  };
  return (
    <div className={styles.home}>
      <Dashboard findFalcone={handleFalconeSearch} />
    </div>
  );
};

export default Home;
