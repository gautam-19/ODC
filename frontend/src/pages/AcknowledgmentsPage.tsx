import React from 'react';
import { Award, ExternalLink } from 'lucide-react';

interface Acknowledgment {
  id: number;
  name: string;
  contribution: string;
  link?: string;
}

const AcknowledgmentsPage: React.FC = () => {
  const acknowledgments: Acknowledgment[] = [
    {
      id: 1,
      name: '1.	H. Dietz, D. Abney, P. Eberhart,“ESP32-CAM as a Programmable Camera Research Platform',
      contribution: 'For their generous grant supporting our research and development efforts.',
      link: 'https://scholar.archive.org/work/uiguk67mcndkfkvwltqnqn4wlu/access/wayback/https://library.imaging.org/admin/apis/public/api/sandbox/website/downloadArticle/ei/34/7/ISS-232'
    },
    {
      id: 2,
      name: '2.	“Multisensor Obstacle Detection and Tracking,” ScienceDirect',
      contribution: 'For their guidance in field testing our monitoring systems.',
      link: 'https://www.sciencedirect.com/science/article/abs/pii/S0957417419306152'
    },
    {
      id: 3,
      name: '3.	A. Sharma, “Robust Obstacle Detection in Hilly Region,” ResearchGate',
      contribution: 'For the valuable libraries and frameworks that made this project possible.',
      link: 'https://www.researchgate.net/publication/379398876_Robust_Obstacle_Detection_in_Hilly_Region'
    },
    {
      id: 4,
      name: '4.	M. Vacha, “Security of IoT Devices Based on ESP32,” Bachelor’s thesis',
      contribution: 'For providing testing grounds and regulatory support for autonomous vehicle testing.',
      link: 'https://dspace.cvut.cz/bitstream/handle/10467/89988/F8-DP-2020-Vacha-Michal-thesis.pdf.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Acknowledgments</h1>
        <p className="text-lg text-gray-600">
          We extend our sincere gratitude to the organizations and individuals who have supported this project.
        </p>
      </div>
      
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-0.5 rounded-lg mb-10">
        <div className="bg-white rounded-md p-6">
          <div className="flex items-center mb-6">
            <Award className="h-8 w-8 text-primary-500 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">Our Supporters</h2>
          </div>
          
          <div className="space-y-6">
            {acknowledgments.map((ack) => (
              <div key={ack.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">{ack.name}</h3>
                    <p className="text-gray-600 mt-2">{ack.contribution}</p>
                  </div>
                  
                  {ack.link && (
                    <a 
                      href={ack.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      <span className="text-sm mr-1">Visit</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Special Thanks</h2>
        <p className="text-gray-700 mb-4">
          We would also like to extend our gratitude to all the team members, advisors, and beta testers 
          who have contributed their time, expertise, and feedback to help make this project a success.
        </p>
        <p className="text-gray-700">
          Your contributions have been invaluable in creating a system that is helping to advance 
          the field of autonomous vehicle monitoring and safety.
        </p>
      </div>
    </div>
  );
};

export default AcknowledgmentsPage;