const Star = ({ index, value, color }) => {
  return (
    <span>
      <i
        style={{ color }}
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

export default Star;
