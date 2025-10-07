
import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Services from './components/Services';
import Contact from './components/Contact';
import { useLayoutEffect } from 'react';

// Wrapper to scroll to top on page change
const Wrapper: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="bg-neutral-900 text-gray-200 min-h-screen flex flex-col font-sans">
        <Header />
        <main className="flex-grow">
          <Wrapper>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Wrapper>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;