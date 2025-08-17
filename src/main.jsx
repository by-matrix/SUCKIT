import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Header from './components/Header';
import CartSidebar from './components/CartSidebar';
import HomePage from './pages/HomePage';
import ToastContainer from './components/ToastContainer';
import { useCartStore } from './stores/cartStore';

const App = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const isCartOpen = useCartStore((state) => state.isOpen);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header onSearch={handleSearch} />
            <HomePage searchQuery={searchQuery} />
            {isCartOpen && <CartSidebar />}
            <ToastContainer />
        </div>
    );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
