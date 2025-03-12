import {Routes, Route, BrowserRouter, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from './Context/AppContext';
import Nav from './Components/App/Dashboard/Nav';
import './App.css'

import Index from './Pages/User/Index';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import ResetPassword from './Pages/Auth/ResetPassword';
import VerifyEmail from './Pages/Auth/VerifyEmail';
import Settings from './Pages/Profile/Settings';
import GameList from './Pages/User/Game/GameList';
import GameDetail from './Pages/User/Game/GameDetail';
import VenueDetail from './Pages/User/Venue/VenueDetail';
import VenueList from './Pages/User/Venue/VenueList';
import BookVenue from './Pages/User/Venue/BookVenue';
import BookingDetail from './Pages/User/Booking/Detail'
import BookingConfirm from './Pages/User/Booking/Confirm';
import BookingInfoRenter from './Pages/User/Booking/InfoRenter';
import Dashboard from './Pages/User/Manager/Renter/Booking/Dashboard';
import BookedCourt from './Pages/User/Manager/Renter/Booking/BookedCourt';
import ListGame from './Pages/User/Manager/Renter/Games/ListGame';

export default function App() {
  const { user } = useContext(AppContext);
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />

      <Route path="/login" element={user ? <Index/> : <Login />} />
      <Route path="/register" element={user ? <Index/> : <Register />} />
      <Route path="/email/verify/:id/:hash" element={<VerifyEmail/>} />

      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="/profile" element={<Settings />} />

      <Route path="/venue" element={<VenueList />} />
      <Route path="/venueDetail/:id" element={<VenueDetail />} />

      <Route path="/bookingInfoRenter" element={<BookingInfoRenter />} />
      <Route path="/bookingConfirm" element={<BookingConfirm />} />
      <Route path="/bookingDetail" element={<BookingDetail />} />
      <Route path="/bookingTable/:id" element={<BookVenue />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/bookings" element={<BookedCourt />} />
      <Route path="/my_games" element={<ListGame />} />

      <Route path="/game" element={<GameList />} />
      <Route path="/gameDetail" element={<GameDetail />} />
    </Routes>
  </BrowserRouter>
  );
}

