import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../store/AuthContext'
import { Link } from 'react-router-dom'
import ClipLoader  from 'react-spinners/ClipLoader'

const MyBookings = () => {
   const {user, loading, setLoading} = useContext(UserContext);

   const [bookings, setBookings] = useState([])

   useEffect(() => {
      const fetchBookings = async () => {
         try {
            setLoading(true)
            const response = await axios.get('/api/booking/my-bookings')
            setBookings(response.data);
            console.log(response);
         } catch (error) {
            console.log('Error fetching bookings', error)
         } finally{
            setLoading(false)
         }
      }

      fetchBookings();
   },[])
  return (
   <div className="max-w-7xl mx-auto p-6">
      {loading && (
         <div className="flex items-center justify-center w-full h-80">
            <ClipLoader color="#3b82f6" size={50} />
         </div>
      )}
         <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">My Bookings</h2>
         {bookings.length === 0 ? (
            <p className="text-xl text-gray-500 text-center">No bookings found.</p>
         ) : (
            <ul className="space-y-6">
               {bookings.map((booking) => (
                  <li
                     key={booking._id}
                     className="bg-white rounded-2xl shadow-lg p-6 transition-transform duration-300 ease-in-out transform hover:shadow-xl"
                  >
                     <h3 className="text-2xl font-semibold text-gray-800 mb-2">{booking.place.title}</h3>
                     <p className="text-gray-600">Location: {booking.place.address}</p>
                     <p className="text-gray-600">
                        Dates: {new Date(booking.checkIn).toLocaleDateString()} →{' '}
                        {new Date(booking.checkOut).toLocaleDateString()}
                     </p>
                     <p className="text-gray-600">Guests: {booking.guests}</p>
                     <p className="text-xl font-bold text-pink-600">Total: ₹{booking.totalPrice}</p>
                     <Link
                        to={`/place/${booking.place._id}`}
                        className="text-blue-500 hover:text-blue-700 mt-4 inline-block text-lg font-medium hover:underline"
                     >
                        View Place
                     </Link>
                  </li>
               ))}
            </ul>
         )}
      </div>
  )
}

export default MyBookings