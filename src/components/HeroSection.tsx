
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-medical-light to-white">
      <div className="container mx-auto px-4 py-20 lg:py-32 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 lg:pr-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Healthcare Made <span className="text-medical-primary">Simple</span>
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Book appointments with specialists, check medication interactions, and take control of your health journey - all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              className="bg-medical-primary hover:bg-medical-dark text-white text-lg px-6 py-6"
              asChild
            >
              <Link to="/appointments">Book Appointment</Link>
            </Button>
            <Button 
              variant="outline" 
              className="border-medical-primary text-medical-primary hover:bg-medical-primary hover:text-white text-lg px-6 py-6"
              asChild
            >
              <Link to="/medications">Check Medications</Link>
            </Button>
          </div>
        </div>
        <div className="lg:w-1/2 mt-12 lg:mt-0">
          <img 
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80" 
            alt="Doctor with patient" 
            className="w-full rounded-lg shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
