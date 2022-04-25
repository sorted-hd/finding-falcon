import config from '../../config';

const Destination = ({ destination, onChange, planets }) => {
  return (
    <>
      <span>{destination}</span>
      <select
        onChange={onChange}
        defaultValue={config.DEFAULT}
        name={destination}
      >
        <option value={config.DEFAULT} disabled={true} hidden={true}>
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
    </>
  );
};

export default Destination;
