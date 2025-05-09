import  Booking  from "../models/Booking.js";

export const bookingController = async (req, res) => {
   const {place, checkIn, checkOut, totalPrice, guests} = req.body;
   try {
      if(!place || !checkIn || !checkOut || !totalPrice || !guests) {
         return res.status(400).json({ message: "All fields are required" });
      }
      const booking = await Booking.create({
         place,
         user : req.user._id,
         checkIn,
         checkOut,
         totalPrice,
         guests,
      })

      res.status(201).json({ message: "Booking created successfully", booking });
   } catch (error) {
      console.error("Error creating booking:", error);
      return res.status(500).json({ message: "Internal server error" });
   }
}

export const getMyBookings = async (req, res) => {
   try {
      const bookings = await Booking.find({user: req.user._id}).populate("place")
      if(!bookings) {
         return res.status(404).json({ message: "No bookings found" });
      }
      res.status(200).json(bookings);
   } catch (error) {
      console.error("Error fetching bookings:", error);
      return res.status(500).json({ message: "Internal server error" });
   }
}