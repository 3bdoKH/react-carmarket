import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { Suspense, lazy } from 'react';

const Home = lazy(() => import('./pages/Home.tsx'));
const Services = lazy(() => import('./pages/Services.tsx'));
const Blog = lazy(() => import('./pages/Blog.tsx'));
const About = lazy(() => import('./pages/About.tsx'));
const Contact = lazy(() => import('./pages/Contact.tsx'));
const ServiceDetails = lazy(() => import('./pages/service/ServiceDetails.tsx'));
const Category = lazy(() => import('./pages/category/Category.tsx'));
const City = lazy(() => import('./pages/city/City.tsx'));
const BlogDetails = lazy(() => import('./pages/blog/BlogDetails.tsx'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard.tsx'));
const AdminLogin = lazy(() => import('./pages/admin/Login.tsx'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:blog" element={<BlogDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service/:id" element={<ServiceDetails />} />
          <Route path="/category/:category" element={<Category />} />
          <Route path="/city/:city" element={<City />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
