import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

// Import local images
import binaRaiImg from '../images/Bina Rai.jpg';
 import shaluYadavImg from '../images/Shalu Yadav.jpg';
 import gautamSinghImg from '../images/Gautam Singh.jpg';
 import yejjuEsaniImg from '../images/Akshaya.jpg';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

const TeamPage: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Bina Rai',
      role: 'Car Systems Integrator',
      bio: 'Assisted in the development and integration of a functional car prototype, contributing to both hardware setup and system coordination.',
      avatar: binaRaiImg,
      social: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com'
      }
    },
    {
      id: 2,
      name: 'Shalu Yadav',
      role: 'UX/UI Designer',
      bio: ' Specializes in full-stack development with expertise in real-time data processing systems.',
      avatar: shaluYadavImg,
      social: {
        github: 'https://github.com',
        linkedin: 'https://www.linkedin.com/in/shalu-yadav-a8a618229/'
      }
    },
    {
      id: 3,
      name: 'Gautam Singh',
      role: 'Embedded Systems Engineer',
      bio: ' Contributed to building a functional car prototype, integrating sensors and a camera for real-time data and automation.',
      avatar: gautamSinghImg,
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com'
      }
    },
    {
      id: 4,
      name: 'Yejju Esani Aiswarya Akshya',
      role: 'Full-Stack Developer',
      bio: 'Experienced in software development, AI, and ML, focused on real-world problem solving. Built web apps and worked on ML algorithms.',
      avatar: yejjuEsaniImg,
      social: {
        github: 'https://github.com',
        linkedin: 'https://www.linkedin.com/in/akshaya-yejju-65995a337?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
      }
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h1>
        <p className="text-lg text-gray-600">
          Meet the talented individuals behind the Autonomous Car Monitoring System.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {teamMembers.map((member) => (
          <div key={member.id} className="card overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0 md:w-1/3">
                <img 
                  className="h-48 w-full object-cover md:h-full" 
                  src={member.avatar} 
                  alt={member.name} 
                />
              </div>
              <div className="p-6 md:w-2/3">
                <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 mb-4">{member.bio}</p>

                <div className="flex space-x-4">
                  {member.social.github && (
                    <a 
                      href={member.social.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )}

                  {member.social.linkedin && (
                    <a 
                      href={member.social.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-primary-600 transition-colors duration-200"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}

                  {member.social.twitter && (
                    <a 
                      href={member.social.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-blue-400 transition-colors duration-200"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
