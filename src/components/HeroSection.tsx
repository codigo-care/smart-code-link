
import React from 'react';
import CodeMatchDemo from './CodeMatchDemo';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  return (
    <section className="w-full bg-gradient-to-br from-gray-50 to-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              <span className="text-gray-600">Streamline</span> your medical billing with AI
            </h1>
            
            <p className="text-lg text-gray-700">
              Codigo's intelligent RCM software uses AI to optimize medical coding, 
              boost claim accuracy, and maximize reimbursements for healthcare providers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Request Demo
              </Button>
              
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Learn More
              </Button>
            </div>
            
            <div className="text-sm text-gray-500 italic border-l-4 border-gray-300 pl-4 mt-4">
              Currently working in stealth mode. More information will be available soon.
            </div>
          </div>
          
          {/* Right side - Code Match Demo */}
          <div className="relative">
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-100 to-orange-100 opacity-70 blur"></div>
            <div className="relative z-10">
              <CodeMatchDemo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
