import React, { useContext, useEffect, useState } from 'react'
import PlaceCard from './PlaceCard';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserContext } from '../store/AuthContext';

const Places = () => {
  const {loading, setLoading} = useContext(UserContext);
  const [places, setPlaces] = useState([])

  useEffect(() => {
    fetchPlaces()
  },[])

  const fetchPlaces = async () => {
    try {
      console.log("loading is true")
      setLoading(true)
      const response = await axios.get('/api/place');
      //console.log("All places:",response)
      setPlaces(response.data);
    } catch (error) {
      console.error("Error fetching places:", error);
    } finally{
      setLoading(false);
      console.log("loading is false")
    }
  }



  return (
    <>

    
    
        {places.map(place => (
          <Link to={`/place/${place._id}`} key={place._id}>
            <PlaceCard
              image={place.image[0]}
              location={place.address}
              price={place.price}
              rating={place.rating}
           />
          </Link>
           
        ))}
     
    
      
    </>
  )
}

export default Places