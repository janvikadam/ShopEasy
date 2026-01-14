import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useState } from 'react'              // ✅ NEW: import useState
import Navbar from './components/Navbar.jsx'
import Footer from './components/footer.jsx'
import Signup from './components/signup.jsx'
import Login from './components/login.jsx' 
import Home from './components/Home.jsx'
import Product from './components/product.jsx'   // ✅ Product page
import Contact from './components/contact.jsx'   // ✅ Contact
import Deals from './components/deals.jsx'       // ✅ Deals
import Profile from './components/profile.jsx'   // ✅ Profile
import Cart from './components/cart.jsx'         // ✅ Cart

function AppContent() {
  const location = useLocation();
  const hideLayout = location.pathname === '/signup' || location.pathname === '/login';

  // ✅ NEW: global search state (used by Navbar + Home)
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      {/* ✅ Pass setSearchQuery to Navbar so search bar can update it */}
      {!hideLayout && <Navbar setSearchQuery={setSearchQuery} />}

      <Routes>
        {/* ✅ Pass searchQuery into Home so it can filter products */}
        <Route path="/" element={<Home searchQuery={searchQuery} />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App

