import PropTypes from 'prop-types';

const Star = ({ index, value, color }) => {
  return (
    <span>
      <i
        style={{ color: color || '#ffa534' }}
        className={
          value >= index + 1
            ? 'fas fa-star'
            : value >= index + 0.5
            ? 'fas fa-star-half-alt'
            : 'far fa-star'
        }
      ></i>
    </span>
  );
};

Star.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.number,
  color: PropTypes.string,
};

export default Star;
