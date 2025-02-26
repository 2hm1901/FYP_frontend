import {Routes, Route, BrowserRouter } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from './Context/AppContext';
import './App.css'

import Index from './Pages/User/Index';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import GameList from './Pages/User/Game/GameList';
import GameDetail from './Pages/User/Game/GameDetail';
import VenueDetail from './Pages/User/Venue/VenueDetail';
import VenueList from './Pages/User/Venue/VenueList';
import BookVenue from './Pages/User/Venue/BookVenue';
import BookingDetail from './Pages/User/Booking/Detail'
import BookingConfirm from './Pages/User/Booking/Confirm';
import BookingInfoRenter from './Pages/User/Booking/InfoRenter';

export default function App() {
  const { user } = useContext(AppContext);
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />

      <Route path="/login" element={user ? <Index/> : <Login />} />
      <Route path="/register" element={user ? <Index/> : <Register />} />

      <Route path="/venue" element={<VenueList />} />
      <Route path="/venueDetail/:id" element={<VenueDetail />} />

      <Route path="/bookingInfoRenter" element={<BookingInfoRenter />} />
      <Route path="/bookingConfirm" element={<BookingConfirm />} />
      <Route path="/bookingDetail" element={<BookingDetail />} />
      <Route path="/bookingTable/:id" element={<BookVenue />} />

      <Route path="/game" element={<GameList />} />
      <Route path="/gameDetail" element={<GameDetail />} />
    </Routes>
  </BrowserRouter>
  );
}

