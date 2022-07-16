import React, { useState } from 'react';
import HoverRating from './HoverRating';

const RatingMain = () => {
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);
  const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }
  
  
  return (
    <>
      <HoverRating value={value} setValue={setValue} hover={hover} setHover={setHover} labels={labels} getLabelText={getLabelText}/>
    </>
  )
}

export default RatingMain