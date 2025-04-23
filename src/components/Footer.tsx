
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center">
              <span className="text-medical-primary font-bold text-2xl">MediCheck</span>
            </Link>
            <p className="text-gray-600 mt-4 max-w-xs">
              Your one-stop platform for booking medical appointments and checking medication interactions.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-medical-primary">Home</Link>
              </li>
              <li>
                <Link to="/appointments" className="text-gray-600 hover:text-medical-primary">Book Appointment</Link>
              </li>
              <li>
                <Link to="/medications" className="text-gray-600 hover:text-medical-primary">Check Medications</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-medical-primary">Help Center</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-medical-primary">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-medical-primary">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} MediCheck. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
