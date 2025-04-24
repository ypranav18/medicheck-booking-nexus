
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto py-4 px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-medical-primary font-bold text-2xl">MediCheck</span>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-medical-primary font-medium">
            Home
          </Link>
          <Link to="/appointments" className="text-gray-700 hover:text-medical-primary font-medium">
            Appointments
          </Link>
          <Link to="/medications" className="text-gray-700 hover:text-medical-primary font-medium">
            Medication Checker
          </Link>
          
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span className="font-medium">{user.user_metadata?.name || user.email}</span>
              </div>
              <Button 
                variant="outline"
                className="border-medical-primary text-medical-primary hover:bg-medical-primary hover:text-white transition-colors"
                onClick={() => signOut()}
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <>
              <Button 
                variant="outline" 
                className="border-medical-primary text-medical-primary hover:bg-medical-primary hover:text-white transition-colors"
                onClick={() => navigate('/signin')}
              >
                Sign In
              </Button>
              <Button 
                className="bg-medical-primary text-white hover:bg-medical-dark"
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </Button>
            </>
          )}
        </nav>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md z-50">
            <div className="flex flex-col p-4 space-y-3">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-medical-primary font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/appointments" 
                className="text-gray-700 hover:text-medical-primary font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Appointments
              </Link>
              <Link 
                to="/medications" 
                className="text-gray-700 hover:text-medical-primary font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Medication Checker
              </Link>

              {user ? (
                <>
                  <div className="flex items-center gap-2 py-2">
                    <User size={16} />
                    <span className="font-medium">{user.user_metadata?.name || user.email}</span>
                  </div>
                  <Button 
                    variant="outline"
                    className="w-full border-medical-primary text-medical-primary"
                    onClick={() => {
                      setIsMenuOpen(false);
                      signOut();
                    }}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    className="w-full border-medical-primary text-medical-primary mt-2"
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate('/signin');
                    }}
                  >
                    Sign In
                  </Button>
                  <Button 
                    className="w-full bg-medical-primary text-white"
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate('/signup');
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
