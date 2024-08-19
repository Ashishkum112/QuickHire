import React from 'react';
import Navbar from './shared/Navbar';

const AboutUs = () => {
  const developers = [
    {
      name: 'Ashish Kumar',
      photo: 'https://media.licdn.com/dms/image/v2/D4D03AQFa6PIz6xI9Wg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1714852892017?e=1729728000&v=beta&t=m6_weLA7FyDyEopyny2oC4as1O3cD5NcRYmFk0Mw3pw',
      linkedin: 'https://www.linkedin.com/in/johndoe/',
      contact: 'john.doe@example.com',
    },
    {
      name: 'Satyam Mohanty',
      photo: 'https://media.licdn.com/dms/image/v2/D4D03AQGY8QpyoxU_4w/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1684141655554?e=1729728000&v=beta&t=y-hHWPo8LkzDQ4fGCyujgrUbYBiL4-YT6__UIeU39Fg',
      linkedin: 'https://www.linkedin.com/in/ashish-web-dev/',
      contact: 'jane.smith@example.com',
    },
    // Add more developers as needed
  ];

  return (
    <div>
    <Navbar/>
    <div className="max-w-7xl mx-auto my-20 p-5">
      <h1 className="text-4xl font-bold text-center mb-10">About Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {developers.map((dev, index) => (
          <div key={index} className="flex flex-col md:flex-row items-center border p-5 rounded-lg shadow-lg">
            <div className="w-full md:w-1/2 flex justify-center">
              <img src={dev.photo} alt={`${dev.name}`} className="w-40 h-40 rounded-full object-cover" />
            </div>
            <div className="w-full md:w-1/2 mt-5 md:mt-0 md:ml-10">
              <h2 className="text-2xl font-bold">{dev.name}</h2>
              <a 
                href={dev.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-500 flex items-center mt-2"
              >
                <img src="/path-to-linkedin-logo.png" alt="LinkedIn" className="w-5 h-5 mr-2" />
                LinkedIn Profile
              </a>
              <p className="mt-2 text-gray-700">{dev.contact}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default AboutUs;
