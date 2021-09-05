import Star from './Star';

const stars = ['star-01', 'star-02', 'star-03', 'star-04', 'star-05'];

const Rating = ({ value, text }) => {
  return (
    <div className='rating'>
      {stars.map((star, index) => (
        <Star index={index} value={value} key={star} color='#ffa534' />
      ))}
      <span className='p-3'>{text && text}</span>
    </div>
  );
};

export default Rating;
