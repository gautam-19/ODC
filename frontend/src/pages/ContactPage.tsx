import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you'd send this data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600">
          Have questions or feedback? We'd love to hear from you.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="col-span-1 space-y-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-primary-100 p-2 rounded-full mr-3">
                <MapPin className="h-5 w-5 text-primary-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-800">Location</h3>
            </div>
            <p className="text-gray-600 pl-10">
              National Institute of Technology <br />
              Jote<br />
              Itanagar, Arunachal Pradesh
            </p>
          </div>
          
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-primary-100 p-2 rounded-full mr-3">
                <Mail className="h-5 w-5 text-primary-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-800">Email</h3>
            </div>
            <p className="text-gray-600 pl-10">
              <a 
                href="mailto:abc@gmail.com" 
                className="text-primary-600 hover:text-primary-700"
              >
                abc@gmail.com
              </a>
            </p>
          </div>
          
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-primary-100 p-2 rounded-full mr-3">
                <Phone className="h-5 w-5 text-primary-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-800">Phone</h3>
            </div>
            <p className="text-gray-600 pl-10">
              <a 
                href="tel:+14155550123" 
                className="text-primary-600 hover:text-primary-700"
              >
                +1 (415) 555-0123
              </a>
            </p>
          </div>
        </div>
        
        <div className="col-span-2">
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Send us a message</h2>
            
            {submitted ? (
              <div className="bg-success-50 border border-success-200 text-success-700 px-4 py-3 rounded">
                <p className="font-medium">Thank you for your message!</p>
                <p className="text-sm">We'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="label">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="input"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="label">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="input"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="label">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="input"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="input resize-none"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                
                <div>
                  <button 
                    type="submit" 
                    className="btn btn-primary flex items-center"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;