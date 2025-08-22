import React from 'react';
import { Info, Shield, Zap, HelpCircle } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">About the Project</h1>
        <p className="text-lg text-gray-600">
          Learn about our autonomous vehicle monitoring system, how it works, and why it matters.
        </p>
      </div>
      
      <div className="prose max-w-none">
        <p className="text-gray-700 mb-6">
          The Autonomous Car Monitoring System is a state-of-the-art platform designed to provide real-time 
          monitoring and status updates for autonomous vehicle fleets. Our system combines advanced 
          telemetry, GPS tracking, and obstacle detection to ensure the safety and efficiency of 
          autonomous operations.
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Key Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <div className="bg-primary-100 p-2 rounded-md mr-4">
                <Shield className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-800">Safety Monitoring</h3>
            </div>
            <p className="text-gray-600">
              Real-time obstacle detection and safety alerts ensure vehicles respond appropriately to
              their environment, preventing potential accidents.
            </p>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <div className="bg-secondary-100 p-2 rounded-md mr-4">
                <Zap className="h-6 w-6 text-secondary-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-800">Real-time Tracking</h3>
            </div>
            <p className="text-gray-600">
              GPS integration allows for precise location tracking, with direct links to mapping services
              for visual representation of vehicle positions.
            </p>
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Our Mission</h2>
        
        <p className="text-gray-700 mb-6">
          Our mission is to enhance the safety, reliability, and efficiency of autonomous vehicle 
          operations through advanced monitoring technology. We believe that by providing comprehensive
          real-time data, we can help accelerate the adoption of autonomous vehicles while ensuring
          they operate safely in diverse environments.
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Technology Stack</h2>
        
        <p className="text-gray-700 mb-6">
          The Autonomous Car Monitoring System is built using the MERN stack (MongoDB, Express.js, 
          React.js, and Node.js), providing a robust, scalable platform for handling real-time 
          data processing and visualization.
        </p>
        
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-10">
          <div className="flex items-start">
            <HelpCircle className="h-6 w-6 text-primary-500 mr-3 mt-1" />
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Have Questions?</h3>
              <p className="text-gray-600">
                If you have any questions about our system or would like to learn more about
                how it can benefit your autonomous vehicle operations, please don't hesitate to
                <a href="/contact" className="text-primary-600 hover:text-primary-700 underline ml-1">contact us</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;