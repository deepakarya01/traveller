import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast'

const PlaceEdit = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    address: "",
    image: [],
    amenities: [],
    rating: "",
    maxGuests: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const allAmenities = ["WiFi", "TV", "Kitchen", "Parking", "AC", "Pool", "Washer", "Heater"]

  useEffect(() => {
    const fetchPlace = async () => {
      try {      
        const response = await axios.get(`/api/place/${id}`);
        console.log('Fetched place data:', response.data);
        setFormData({
          title: response.data.title,
          description: response.data.description,
          price: response.data.price,
          address: response.data.address,
          image: response.data.image,
          amenities: response.data.amenities,
          rating: response.data.rating,
          maxGuests: response.data.maxGuests,
        }); 
      } catch (error) {
        console.error('Error fetching place data:', error);
      }
    }
    fetchPlace();
  },[id]); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleAmenity = (amenity) => {
    setFormData((prev) => {
      const amenities = prev.amenities.includes(amenity) ?
      prev.amenities.filter((a) => a !== amenity) :
      [...prev.amenities, amenity];
      return {...prev, amenities };
    });
  };


  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push(reader.result);
        if (newImages.length === files.length) {
          setFormData((prev) => ({
            ...prev,
            image: [...prev.image, ...newImages],
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...formData,
        price: Number(formData.price),
        rating: Number(formData.rating),
        maxGuests: Number(formData.maxGuests),
      };

      const response = await axios.put(`/api/place/${id}`, updatedData, {
        withCredentials: true,
      });
      console.log(response.data);
      toast.success("Property updated")
      navigate('/property');
    } catch (error) {
      console.error("Error updating listing:", error);
      toast.error(error.message || "Something went wrong");
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">
        Edit Listing
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            placeholder="Rating (1–5)"
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <input
            type="number"
            name="maxGuests"
            value={formData.maxGuests}
            onChange={handleChange}
            placeholder="Max Guests"
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        {/* Image Upload */}
        <div>
          <p className="font-semibold mb-2">Upload Images:</p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="mb-2"
          />
          <div className="grid grid-cols-3 gap-2 mt-2">
            {formData.image.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`upload-${idx}`}
                className="w-full h-32 object-cover rounded shadow"
              />
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div>
          <p className="font-semibold mb-2">Select Amenities:</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {allAmenities.map((amenity) => (
              <label
                key={amenity}
                className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded shadow-sm"
              >
                <input
                  type="checkbox"
                  checked={formData.amenities.includes(amenity)}
                  onChange={() => toggleAmenity(amenity)}
                />
                {amenity}
              </label>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate('/property')}
            className="w-full bg-gray-500 text-white font-semibold py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default PlaceEdit