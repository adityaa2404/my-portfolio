import React from 'react';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  const contactInfo = [
    {
      icon: <FaEnvelope className="text-2xl" />,
      label: 'Email',
      value: 'aditya.inv10@gmail.com',
      link: 'mailto:aditya.inv10@gmail.com'
    },
    {
      icon: <FaPhone className="text-2xl" />,
      label: 'Phone',
      value: '+91 77450 60502',
      link: 'tel:+917745060502'
    },
    {
      icon: <FaLinkedin className="text-2xl" />,
      label: 'LinkedIn',
      value: 'www.linkedin.com/in/adityapotdar24',
      link: 'www.linkedin.com/in/adityapotdar24'
    },
    {
      icon: <FaGithub className="text-2xl" />,
      label: 'GitHub',
      value: 'github.com/adityaa2404',
      link: 'https://github.com/adityaa2404'
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl" />,
      label: 'Location',
      value: 'Pune, Maharashtra, India',
      link: null
    }
  ];

  return (
    <div className="border-b border-neutral-800 pb-26 px-4" id="contact">
      <h2 className="my-20 text-center text-4xl">
        <span className="bg-gradient-to-br from-dark via-slate-100 to-darkest text-transparent bg-clip-text">
          Contact Me
        </span>
      </h2>

      <div className="max-w-6xl mx-auto">
        {/* Contact Cards Grid - Single Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {contactInfo.map((contact, index) => (
            <div key={index} className="text-white border border-neutral-700 rounded-xl p-4 hover:border-primary transition-colors duration-300">
              {contact.link ? (
                <a
                  href={contact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center text-center group"
                >
                  <div className="text-primary mb-3 group-hover:scale-110 transition-transform duration-300">
                    {contact.icon}
                  </div>
                  <h3 className="text-sm font-semibold mb-2">{contact.label}</h3>
                  <p className="text-slate-300 text-xs group-hover:text-primary transition-colors duration-300">
                    {contact.value}
                  </p>
                </a>
              ) : (
                <div className="flex flex-col items-center text-center">
                  <div className="text-primary mb-3">
                    {contact.icon}
                  </div>
                  <h3 className="text-sm font-semibold mb-2">{contact.label}</h3>
                  <p className="text-slate-300 text-xs">
                    {contact.value}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
