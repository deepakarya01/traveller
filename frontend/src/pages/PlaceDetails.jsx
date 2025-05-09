import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { UserContext } from '../store/AuthContext.jsx';
import BookingForm from '../components/BookingForm.jsx';
import toast from 'react-hot-toast';

const PlaceDetail = ({placeData}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState([]);
  const { user } = useContext(UserContext);

  //console.log("place ",place);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const res = await axios.get(`/api/place/${id}`);
        setPlace(res.data);
        console.log("Fetched place data:", res.data);
         console.log("User Id:", user?._id);
      } catch (err) {
        console.error("Error fetching place:", err);
      }
    };

    fetchPlace();
  }, [id]);

  const handleEdit = (placeId) => {
      navigate(`/place/edit/${placeId}`);
  }

  const handleDelete = async (placeId) => {
      try {
          await axios.delete(`/api/place/${placeId}`);
          toast.success("Listings deleted successfully!")
          navigate('/property');
      } catch (err) {
          console.error("Error deleting place:", err);
          toast.error(err.message || "Something went wrong")
      }
  }

  if (!place) return <div>Loading...</div>;

  return (
   <div className="max-w-5xl mx-auto p-6 space-y-6">
     <h2 className="text-4xl font-bold text-gray-800">{place.title}</h2>
 
     {user?._id === (place?.owner?._id) && (
       <div className="flex gap-3">
         <button
           onClick={() => handleEdit(place._id)}
           className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg"
         >
           Edit
         </button>
         <button
           onClick={() => handleDelete(place._id)}
           className="bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-2 rounded-lg"
         >
           Delete
         </button>
       </div>
     )}
 
     {/* Image Grid */}
     <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-3 h-[400px] rounded overflow-hidden">
       {place?.image?.[0] && (
         <img
           src={place.image[0]}
           alt="Main"
           className="col-span-2 row-span-2 w-full h-full object-cover rounded-lg"
         />
       )}
       {place?.image?.slice(1, 5).map((imgUrl, idx) => (
         <img
           key={idx}
           src={imgUrl}
           alt={`Image ${idx + 2}`}
           className="w-full h-full object-cover rounded-lg"
         />
       ))}
     </div>
 
     <div className="space-y-2 text-gray-700">
       <p className="text-lg font-medium">{place.address}</p>
       <p>{place.description}</p>
       <p className="text-2xl text-pink-600 font-semibold">₹{place.price} / night</p>
       <p>Max Guests: {place.maxGuests}</p>
 
       <div className="flex items-center gap-2 text-yellow-500">
         <FaStar /> <span className="text-gray-700">Rating: {place.rating}</span>
       </div>
     </div>
 
     {/* Amenities */}
     {place?.amenities?.length > 0 && (
       <div>
         <h3 className="text-lg font-semibold mb-2">What this place offers:</h3>
         <ul className="grid grid-cols-2 gap-1 list-disc list-inside text-gray-600">
           {place.amenities.map((item, idx) => (
             <li key={idx}>{item}</li>
           ))}
         </ul>
       </div>
     )}
 
     {/* Booking Form */}
     <div className="pt-6 border-t">
       <BookingForm placeData={place} />
     </div>
   </div>
 );
 
};

export default PlaceDetail;
