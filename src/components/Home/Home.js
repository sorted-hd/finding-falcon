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
    console.log(planet_names, vehicle_names);
    const result = await performFalconeAPICall({ vehicle_names, planet_names });
    const payload = { ...result, timeTaken };
    localStorage.setItem('result', JSON.stringify(payload));
    history.push('/results');
  };

  const performFalconeAPICall = async (payload) => {
    const configProp = {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
    };
    const token = await axios
      .post(config.TOKEN_URL, {}, configProp)
      .then((response) => response.data);

    payload.token = token.token;
    console.log(payload);
    const falconeStatus = await axios
      .post(config.FIND_API_URL, JSON.stringify(payload), configProp)
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
