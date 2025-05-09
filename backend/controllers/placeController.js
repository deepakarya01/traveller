import Place from '../models/place.js';

export const createPlace = async (req, res) => {
  const { title, description, address, image, amenities, price, rating, maxGuests } = req.body;
  const owner = req.user._id;

  try {
    const newPlace = await Place.create({
      owner,
      title,
      description,
      address,
      image,
      amenities,
      price,
      rating,
      maxGuests
    });

    res.status(201).json(newPlace);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getAllPlaces = async (req, res) => {
  try {
    const places = await Place.find({}).populate('owner', 'name email');
    res.status(200).json(places);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getPlaceById = async (req, res) => {
  const { id } = req.params;

  try {
    const place = await Place.findById(id).populate('owner', 'name email');
    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }
    res.status(200).json(place);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export const updatePlace = async (req, res) => {
  const { id } = req.params;
  const { title, description, address, image, amenities, price, rating, maxGuests } = req.body;

  const bodySize = JSON.stringify(req.body).length / 1024 / 1024;
  console.log("Request body size in MB:", bodySize);

  try {
    const updatedPlace = await Place.findByIdAndUpdate(id, {
      title,
      description,
      address,
      image,
      amenities,
      price,
      rating,
      maxGuests
    }, { new: true });

    if (!updatedPlace) {
      return res.status(404).json({ message: 'Place not found' });
    }

    res.status(200).json(updatedPlace);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const deletePlace = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPlace = await Place.findByIdAndDelete(id);

    if (!deletedPlace) {
      return res.status(404).json({ message: 'Place not found' });
    }

    res.status(200).json({ message: 'Place deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getUserPlaces = async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized - no user ID" });
  }

  try {
    const places = await Place.find({ owner: userId }).populate('owner', 'name email');
    res.status(200).json(places);
  } catch (error) {
    console.error("Error fetching user places:", error);
    res.status(500).json({ message: error.message });
  }
}


