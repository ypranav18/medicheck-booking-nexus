
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppointmentForm from '@/components/AppointmentForm';

const Appointments = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Book Your Appointment</h1>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Find the right specialist for your needs and schedule an appointment at a time that works for you. Our easy booking system will help you get the care you need.
          </p>
          
          <AppointmentForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Appointments;
