import React from 'react';
import { FaStar } from 'react-icons/fa';

const PlaceCard = ({image, location, rating, price}) => {
  return (
    <div className='w-72 mt-6'>
      <img
        src={image} // using first image from the array
        className="w-72 h-64 rounded-2xl object-cover mb-1"
      />
      <div>
         <div className='flex justify-between'>
            <h2 className="text-lg font-semibold">{location}</h2>
            <span className="flex items-center gap-1">
               <FaStar /> {rating}
            </span>
         </div>

        <div className="flex items-center justify-between">
          <span className="text-md">{price}/ night</span>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
