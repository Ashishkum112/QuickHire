import Navbar from './shared/Navbar';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useColorMode } from '@chakra-ui/react'; // Assuming you're using Chakra UI for color mode
import Footer from './shared/Footer';
import satyam from '../assets/satyam.jpeg';
import ashish from '../assets/ashish.jpeg'
const AboutUs = () => {
  const { colorMode } = useColorMode(); // Get the current color mode
  
  useGSAP(() => {
    gsap.from('#about-header', {
      duration: 2,
      y: -50,
      opacity: 0,
    });
  });

  const liftBox = (box) => {
    gsap.to(box, {
      y: -10,
      duration: 0.3,
      ease: 'power1.out',
    });
  };

  const resetBox = (box) => {
    gsap.to(box, {
      y: 0,
      duration: 0.3,
      ease: 'power1.in',
    });
  };

  const developers = [
    {
      name: 'Ashish Kumar',
      photo: ashish,
      linkedin: 'https://www.linkedin.com/in/ashish-web-dev/',
      contact: 'ashishkumarr0214@gmail.com',
      bio: "MERN Stack Developer",
    },
    {
      name: 'Satyam Mohanty',
      photo: satyam,
      linkedin: 'https://www.linkedin.com/in/satyam-mohanty-43882918a/',
      contact: 'satyammohanty@myyahoo.com',
      bio: "MERN Stack Developer",
    },
    // Add more developers as needed
  ];

  return (
    <div className={`${colorMode === 'light' 
      ? 'bg-gradient-to-r from-purple-100 via-gray-100 to-blue-50 text-black' 
      : 'bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-100'}`}>
      <Navbar />
      <div className="min-h-screen mx-auto my-5 p-5">
        <h1 
          className={'text-3xl md:text-4xl font-bold text-center mb-8 md:mb-10 text-purple-500'}
        >
          Developers
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-10 ">
          {developers.map((dev, index) => (
            <div
              key={index}
              className="flex flex-col items-center border p-4 md:p-5 rounded-lg shadow-lg"
              style={{ boxShadow: '0 4px 14px rgba(128, 0, 128, 0.7)' }} // Purple box shadow
              onMouseEnter={(e) => liftBox(e.currentTarget)}
              onMouseLeave={(e) => resetBox(e.currentTarget)}
            >
              <div className="w-32 h-32 md:w-40 md:h-40 flex justify-center">
                <img src={dev.photo} alt={dev.name} className="w-full h-full object-cover" />
              </div>
              <div className="mt-4 text-center">
                <h2 className="text-xl md:text-2xl font-bold">{dev.name}</h2>
                <h3 className="text-sm md:text-md text-purple-500 font-bold">{dev.bio}</h3>
                <a
                  href={dev.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 flex items-center justify-center mt-2"
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn" className="w-5 h-5 mr-2" />
                  LinkedIn Profile
                </a>
                <p className={`text-sm mt-2 ${colorMode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
  For any inquiries, feel free to reach out to us at: <span className="font-medium">{dev.contact}</span>
</p>

              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default AboutUs;
