import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ClipLoader  from 'react-spinners/ClipLoader'
import { UserContext } from '../store/AuthContext'

const MyListings = () => {
  const {loading, setLoading} = useContext(UserContext)
  const [userListings, setUserListings] = useState([])

  useEffect(()=> { 
    const fetchUserListings = async () => {
      try {
        setLoading(true)
        const response = await axios.get('/api/place/user', {withCredentials: true});
        setUserListings(response.data);
      } catch (error) {
        console.error("Error fetching user listings:", error);  
      } finally {
        setLoading(false)
      }
    }
    fetchUserListings();
  }, [])
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {loading && (
        <div className="flex items-center justify-center w-full h-80">
          <ClipLoader color="#3b82f6" size={50} />
        </div>
      )}
      {userListings.length > 0 ? (
        <>
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">My Listings</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {userListings.map((listing) => (
              <Link
                to={`/place/${listing._id}`} 
                key={listing._id}
                className="bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all ease-in-out duration-300 hover:shadow-2xl"
              >
                <img
                  src={listing.image[0]}
                  alt={listing.title}
                  className="w-full h-64 object-cover rounded-t-3xl"
                />
                <div className="p-6 space-y-3">
                  <h2 className="text-2xl font-semibold text-gray-900">{listing.title}</h2>
                  <p className="text-sm text-gray-600 line-clamp-3">{listing.description}</p>
                  <p className="text-lg font-bold text-red-600">₹{listing.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <h1 className="text-gray-400 text-center text-xl mt-10">No Listings Found</h1>
      )}
    </div>
  )
}

export default MyListings