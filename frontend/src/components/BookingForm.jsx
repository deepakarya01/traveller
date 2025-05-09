// BookingCard.jsx
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from 'react-hot-toast'
import  {UserContext}  from "../store/AuthContext.jsx";

const BookingCard = ({ placeData }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);

  const calculateNights = () => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = (end - start) / (1000 * 60 * 60 * 24);
    return diff > 0 ? diff : 0;
  };

  const nights = calculateNights();

  if (!placeData) return <div>Loading...</div>;

  const totalPrice = nights * placeData.price;

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please log in to book");
      return;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      alert("Check-out must be after check-in.");
      return;
    }

    try {
      setLoading(true);
      console.log({checkIn, checkOut, guests, totalPrice});
      await axios.post("/api/booking",{
          place: placeData._id,
          user:user._id,
          checkIn,
          checkOut,
          guests,
          totalPrice,
        },
        { withCredentials: true }
      );

      toast.success("Booked successfully");
      navigate("/my-bookings");
    } catch (err) {
      console.error("Booking error:", err);
      toast.error(err.message || "Booking failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-6 rounded-2xl shadow-lg w-full max-w-sm mx-auto">
      <div className="text-xl font-semibold mb-2">
        ₹{totalPrice || placeData.price}
        {nights > 0 && (
          <span className="text-gray-600 text-sm"> for {nights} night{nights > 1 && "s"}</span>
        )}
      </div>

      <form onSubmit={handleBooking} className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-sm text-gray-600">Check-in</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Check-out</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-600">Guests</label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full border rounded px-2 py-1"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} guest{num > 1 && "s"}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded"
          disabled={loading}
        >
          {loading ? "Booking..." : "Book"}
        </button>
      </form>
    </div>
  );
};

export default BookingCard;
