import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import styles from './Vehicles.module.css';

const Vehicles = ({ destination, onChange, vehicle, disabled, checked }) => {
  return (
    <div>
      <input
        type="radio"
        name={destination}
        onChange={onChange}
        value={vehicle.name}
        disabled={disabled}
        checked={checked}
      />
      <label htmlFor={vehicle.name}>
        {`${vehicle.name} (${vehicle.nTotal})`}{' '}
        {checked && (
          <FontAwesomeIcon icon={faCheck} className={styles.checkedIcon} />
        )}
      </label>
    </div>
  );
};

export default Vehicles;
