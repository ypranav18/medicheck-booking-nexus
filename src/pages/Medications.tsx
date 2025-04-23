
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DDIChecker from '@/components/DDIChecker';

const Medications = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Medication Interaction Checker</h1>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Check for potential interactions between your medications to ensure your safety. 
            Our drug-drug interaction tool helps identify conflicts between medications that could be harmful.
          </p>
          
          <DDIChecker />
          
          <div className="mt-16 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">About Medication Interactions</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Drug-drug interactions (DDIs) occur when one medication affects how another medication works. 
                These interactions can reduce the effectiveness of medications or increase the risk of harmful side effects.
              </p>
              <p>
                Some medication combinations can be dangerous, leading to serious health complications. 
                That's why it's important to check for potential interactions before taking multiple medications together.
              </p>
              <p>
                While our tool provides information about potential interactions, it's always important to 
                consult with your healthcare provider or pharmacist about all medications you are taking.
              </p>
              <p className="font-medium text-medical-primary">
                This tool is not a substitute for professional medical advice, diagnosis, or treatment. 
                Always seek the advice of your physician or other qualified health provider with any questions 
                you may have regarding a medical condition or medication.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Medications;
