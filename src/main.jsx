import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

const Header = () => {
    return (
        <header className="bg-white shadow-lg py-4 mb-8 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-8 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        S
                    </div>
                    <span className="text-2xl font-bold text-gray-800">SUCKIT</span>
                </div>
                <nav>
                    <ul className="flex list-none gap-8 m-0 p-0">
                        <li>
                            <a href="#home" className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300 px-4 py-2 rounded hover:bg-gray-100">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#about" className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300 px-4 py-2 rounded hover:bg-gray-100">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="#services" className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300 px-4 py-2 rounded hover:bg-gray-100">
                                Services
                            </a>
                        </li>
                        <li>
                            <a href="#contact" className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300 px-4 py-2 rounded hover:bg-gray-100">
                                Contact
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

const App = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <main className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-500 to-purple-600 text-white -mt-32 pt-32">
                <h1 className="text-6xl font-bold text-center drop-shadow-lg">
                    suck it
                </h1>
            </main>
        </div>
    );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
