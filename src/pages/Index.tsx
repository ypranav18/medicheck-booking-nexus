
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Calendar, Search, Shield, User } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        
        {/* Features */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="border-none shadow-md transition-transform hover:-translate-y-1">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-medical-light rounded-full flex items-center justify-center mb-4">
                    <Calendar className="w-8 h-8 text-medical-primary" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">Appointment Booking</h3>
                  <p className="text-gray-600 mb-4">Schedule appointments with specialists at your convenience.</p>
                  <Button variant="link" className="text-medical-primary mt-auto" asChild>
                    <Link to="/appointments">Book Now</Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md transition-transform hover:-translate-y-1">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-medical-light rounded-full flex items-center justify-center mb-4">
                    <Shield className="w-8 h-8 text-medical-primary" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">Medication Safety</h3>
                  <p className="text-gray-600 mb-4">Check for potential interactions between your medications.</p>
                  <Button variant="link" className="text-medical-primary mt-auto" asChild>
                    <Link to="/medications">Check Now</Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md transition-transform hover:-translate-y-1">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-medical-light rounded-full flex items-center justify-center mb-4">
                    <User className="w-8 h-8 text-medical-primary" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">Doctor Profiles</h3>
                  <p className="text-gray-600 mb-4">Explore detailed profiles of our qualified medical specialists.</p>
                  <Button variant="link" className="text-medical-primary mt-auto" asChild>
                    <Link to="/appointments">View Doctors</Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md transition-transform hover:-translate-y-1">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-medical-light rounded-full flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-medical-primary" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">Easy Search</h3>
                  <p className="text-gray-600 mb-4">Find the right specialist for your healthcare needs quickly.</p>
                  <Button variant="link" className="text-medical-primary mt-auto" asChild>
                    <Link to="/appointments">Search Now</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* DDI Feature Highlight */}
        <section className="py-16 bg-medical-light">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6">Drug-Drug Interaction Checker</h2>
                <p className="text-gray-700 mb-6">
                  Our advanced DDI checker helps you identify potential harmful interactions between your medications.
                  Stay informed and safe by using our comprehensive database to check your prescriptions.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "Check multiple medications at once",
                    "Get detailed information about interaction severity",
                    "Receive recommendations for safer medication use",
                    "Easy-to-understand results and explanations"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-3 text-medical-primary">
                        <Check className="h-5 w-5" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="bg-medical-primary hover:bg-medical-dark text-white px-6 py-3"
                  asChild
                >
                  <Link to="/medications">Try DDI Checker Now</Link>
                </Button>
              </div>
              <div className="md:w-1/2 bg-white rounded-lg shadow-xl p-6">
                <img 
                  src="https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Medication Safety" 
                  className="rounded-lg w-full"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-medical-primary to-medical-dark text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">Ready to Take Control of Your Health?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Book appointments with specialists and check your medications for interactions, all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-white text-medical-primary hover:bg-gray-100 px-6 py-3"
                asChild
              >
                <Link to="/appointments">Book Appointment</Link>
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 px-6 py-3"
                asChild
              >
                <Link to="/medications">Check Medications</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

// Helper component for the check icon in the DDI feature section
const Check = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

export default Index;
