import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ListProperty = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    image: [],
    amenities: [],
    price: "",
    rating: "",
    maxGuests: "",
  });
  const [imageUrl, setImageUrl] = useState('');

  const allAmenities = ["WiFi", "TV", "Kitchen", "Parking", "AC", "Pool", "Washer", "Heater"]

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddImage = () => {
    if(!imageUrl) return;
    setFormData((prev) => ({
      ...prev, image: [...prev.image, imageUrl]
    }))
    console.log("Image added", formData.image);
    setImageUrl('');
  }

  const toggleAmenity = (amenity) => {
    setFormData((prev) => {
      const amenities = prev.amenities.includes(amenity) ?
      prev.amenities.filter((a) => a !== amenity) :
      [...prev.amenities, amenity];
      return {...prev, amenities };
  })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const placeData = {
        ...formData,
        price: Number(formData.price),
        rating: Number(formData.rating),
        maxGuests: Number(formData.maxGuests),
      };

      const response = await axios.post("http://localhost:3000/api/place/create", placeData, {
        withCredentials: true,
      });
      toast.success("Property listed")
      navigate("/mylistings");
    } catch (error) {
      console.error("Error creating listing:", error);
      toast.error(error.message || "Something went wrong")
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">List Your Property</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <div className="flex items-center gap-1 mb-4">
          <input
            type="text"
            name="image"
            placeholder={`Image URL`}
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <button
            type="button"
            onClick={handleAddImage}
            className="bg-pink-400 p-2 text-white rounded hover:bg-pink-500"
          >
            Add</button>
        </div>

        {/* Display added images */}
        {formData.image.length > 0 &&  (
          <div className="grid grid-cols-3 gap-2">
          {formData.image.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Property iamge ${index}`}
              className="w-full h-32 object-cover rounded"
            />
          ))}
        </div>
        )}
        
        

        {/* Amenities */}

        <div>
          <p className="font-medium mb-2"> Amenities:</p>
          <div className="grid grid-cols-2 gap-2">
            {allAmenities.map((amenity) => (
              <label key={amenity} className="flex items-center space-x-2">
                <input 
                  type="checkbox"
                  checked={formData.amenities.includes(amenity)}
                  onChange={() => toggleAmenity(amenity)} />
                <span>{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        <input
          type="number"
          name="price"
          placeholder="Price per night"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="rating"
          placeholder="Rating (e.g. 4.5)"
          value={formData.rating}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="maxGuests"
          placeholder="Max Guests"
          value={formData.maxGuests}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-pink-600 text-white font-semibold py-2 rounded hover:bg-pink-700"
        >
          Submit Listing
        </button>
      </form>
    </div>
  );
};

export default ListProperty
