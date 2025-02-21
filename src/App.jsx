import {Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css'

import Index from './Pages/User/Index';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import GameList from './Pages/User/Game/GameList';
import GameDetail from './Pages/User/Game/GameDetail';
import VenueDetail from './Pages/User/Venue/VenueDetail';
import VenueList from './Pages/User/Venue/VenueList';
import BookVenue from './Pages/User/Venue/BookVenue';

export default function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/venue" element={<VenueList />} />
      <Route path="/venueDetail/:id" element={<VenueDetail />} />
      <Route path="/bookVenue/:id" element={<BookVenue />} />

      <Route path="/game" element={<GameList />} />
      <Route path="/gameDetail" element={<GameDetail />} />
    </Routes>
  </BrowserRouter>
  );
}

