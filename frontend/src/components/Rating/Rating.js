import Star from './Star';
import PropTypes from 'prop-types';

const stars = ['star-01', 'star-02', 'star-03', 'star-04', 'star-05'];

const Rating = ({ value, text }) => {
  return (
    <div className='rating'>
      {stars.map((star, index) => (
        <Star index={index} value={value} key={star} />
      ))}
      <span className='p-2'>{text && text}</span>
    </div>
  );
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string,
};

export default Rating;
