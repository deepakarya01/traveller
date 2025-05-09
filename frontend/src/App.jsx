import {BrowserRouter, Routes, Route} from 'react-router-dom'
import axios from 'axios'
import Home from "./pages/Home"
import NavBar from './components/NavBar'
import Login from './pages/Login'
import Register from './pages/Register'
import { useContext } from 'react'
import { UserContext } from './store/AuthContext'
import PlaceDetails from './pages/PlaceDetails'
import PlaceEdit from './pages/PlaceEdit'
import BookingForm from './components/BookingForm'
import MyBookings from './pages/MyBookings'
import {Toaster} from 'react-hot-toast'
import ListProperty from './components/ListProperty'
import MyListings from './components/MyListings'

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

function App() {

  const {user} = useContext(UserContext);
  

  return (
    <div className='font-sans mx-20'>
    
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/place/:id" element={<PlaceDetails />} />
        <Route path="/place/edit/:id" element={user? <PlaceEdit /> : <Login/>} />
        <Route path='/listproperty' element={user? <ListProperty/> : <Login/>} />
        <Route path='/mylistings' element={user? <MyListings/> : <Login/>} />
        <Route path='/booking' element={<BookingForm/>}/>
        <Route path='/my-bookings' element={user ?<MyBookings/> : <Login/> }/>
        
      </Routes>
      <Toaster/>
    </BrowserRouter>
    </div>
  )
}

export default App
