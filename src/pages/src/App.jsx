import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';

// Pages
import Home from './pages/Home.jsx';
import Services from './pages/Services.jsx';
import Academy from './pages/Academy.jsx';
import Portfolio from './pages/Portfolio.jsx';
import About from './pages/About.jsx';
import Testimonials from './pages/Testimonials.jsx';
import Booking from './pages/Booking.jsx';
import Contact from './pages/Contact.jsx';
import CourseDetails from './pages/CourseDetails.jsx';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin.jsx';
import AdminLayout from './pages/admin/AdminLayout.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminBookings from './pages/admin/AdminBookings.jsx';
import AdminServices from './pages/admin/AdminServices.jsx';
import AdminPortfolio from './pages/admin/AdminPortfolio.jsx';
import AdminEnquiries from './pages/admin/AdminEnquiries.jsx';
import AdminVideos from './pages/admin/AdminVideos.jsx';
import AdminAcademy from './pages/admin/AdminAcademy.jsx';

// Scroll to top component
const ScrollToTop = () => {
    const { pathname } = useLocation();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

// Application Content (Needs useLocation hook, so placed inside Router)
const AppContent = () => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');

    // Pages that have full-screen hero sections that should overlap the navbar
    const overlapHeroPages = ['/'];
    const hasOverlapHero = overlapHeroPages.includes(location.pathname);

    return (
        <div className="min-h-screen flex flex-col font-sans bg-luxury-black text-luxury-nude selection:bg-luxury-gold selection:text-luxury-black">
            {!isAdminRoute && <Navbar />}

            <main className={`flex-grow w-full ${!isAdminRoute && !hasOverlapHero ? 'pt-[80px] lg:pt-[110px]' : ''}`}>
                <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>
                        {/* Public Routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/academy" element={<Academy />} />
                        <Route path="/portfolio" element={<Portfolio />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/testimonials" element={<Testimonials />} />
                        <Route path="/booking" element={<Booking />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/course-details" element={<CourseDetails />} />

                        {/* Admin Routes */}
                        <Route path="/admin/login" element={<AdminLogin />} />
                        <Route path="/admin" element={<AdminLayout />}>
                            <Route index element={<AdminDashboard />} />
                            <Route path="dashboard" element={<AdminDashboard />} />
                            <Route path="bookings" element={<AdminBookings />} />
                            <Route path="enquiries" element={<AdminEnquiries />} />
                            <Route path="services" element={<AdminServices />} />
                            <Route path="portfolio" element={<AdminPortfolio />} />
                            <Route path="academy" element={<AdminAcademy />} />
                            <Route path="videos" element={<AdminVideos />} />
                        </Route>
                    </Routes>
                </AnimatePresence>
            </main>

            {!isAdminRoute && <Footer />}
        </div>
    );
};

function App() {
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        // Hide loading screen after 2.5 seconds
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Router>
            <ScrollToTop />
            {/* The actual layout structure rendering beneath */}
            <div>
                <AppContent />
            </div>

            {/* Render loading overlay on top until it finishes */}
            <AnimatePresence>
                {isLoading && <LoadingScreen key="loading" />}
            </AnimatePresence>
        </Router>
    );
}

export default App;
