import React from 'react';
// Import your project images here
// import cropDiseaseImg from '../assets/crop-disease.png';
// import mhtCetImg from '../assets/mht-cet.png';
import pro1 from '../assets/pro1.png';
import pro2 from '../assets/pro2.png';

const projectsData = [
  {
    id: 1,
    title: 'ML Crop Disease Diagnosis',
    description: 'An intelligent machine learning system that analyzes crop images to diagnose diseases early. Uses computer vision and deep learning techniques to identify various plant diseases, helping farmers take preventive measures and improve crop yield.',
    technologies: ['Python', 'TensorFlow', 'OpenCV', 'CNN'],
    imageUrl: pro1, // Replace with actual import
    imageFirst: true // Image on left, description on right
  },
  {
    id: 2,
    title: 'MHT CET Rank Predictor',
    description: 'A comprehensive ML-based rank prediction system for MHT CET exam. Analyzes historical data, mock test scores, and various parameters to provide accurate rank predictions, helping students plan their college admissions strategy.',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'React'],
    imageUrl: pro2, // Replace with actual import
    imageFirst: false // Image on right, description on left
  }
];

const Projects = () => {
  return (
    <div id= 'Projects' className="border-b border-neutral-800 pb-26 px-4">
      <h2 className="my-20 text-center text-4xl">
        <span className="bg-gradient-to-br from-dark via-slate-100 to-darkest text-transparent bg-clip-text">
          Projects
        </span>
      </h2>

      <div className="flex flex-col gap-16 mt-10">
        {projectsData.map(({ id, title, description, technologies, imageUrl, imageFirst }) => (
          <div 
            key={id} 
            className={`flex flex-col lg:flex-row items-center gap-8 ${
              imageFirst ? '' : 'lg:flex-row-reverse'
            }`}
          >
            {/* Image Section */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <img
                src={imageUrl}
                alt={title}
                className="max-w-md h-64 object-contain rounded-xl border border-neutral-700 hover:border-primary transition-colors duration-300"
              />
            </div>

            {/* Description Section */}
            <div className="w-full lg:w-1/2 text-white">
              <h3 className="text-2xl lg:text-3xl font-semibold mb-4 text-center lg:text-left">
                {title}
              </h3>
              <p className="text-base lg:text-lg text-slate-300 mb-6 leading-relaxed text-center lg:text-left">
                {description}
              </p>
              
              {/* Technologies Used */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-neutral-800 text-slate-300 rounded-full text-sm border border-neutral-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
