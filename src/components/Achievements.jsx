import React from 'react';
import pict1 from '../assets/pict1.png';
import snbp1 from '../assets/snbp1.png';
import lc from '../assets/lc.png';
import cc from '../assets/codechef.png';
import cer from '../assets/cer.png'
const Achievements = () => {
  return (
    <div  className="border-b border-neutral-800 pb-26 px-4" id="achievements">
      <h2 className="my-20 text-center text-4xl">
        <span className="bg-gradient-to-br from-dark via-slate-100 to-darkest text-transparent bg-clip-text">
          Education & Achievements
        </span>
      </h2>

      {/* === TOP TWO ROWS (2 Cards Per Row) === */}
      <div className="edu flex flex-wrap justify-center items-stretch mt-10 gap-10">

        {/* Card 1 */}
        <div className="flex items-center border border-neutral-700 rounded-2xl flex-row p-5 w-full max-w-xl h-45 hover:border-primary transition">
          <div className="logos mr-5 flex-shrink-0">
            <img src={pict1} alt="PICT" className="h-20 w-20 object-contain" />
          </div>
          <div className="overflow-hidden">
            <h3 className="text-lg lg:text-2xl text-left text-white">
              B.E Electronics and Computer Engineering
            </h3>
            <p className="text-sm lg:text-base mt-2 text-left text-slate-400">
              2023–2027
            </p>
            <p className="mt-4 text-slate-200">
              Grade: 9.73 / 10 CGPA
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex items-center border border-neutral-700 rounded-2xl flex-row p-5 w-full max-w-xl h-45 hover:border-primary transition">
          <div className="logos mr-5 flex-shrink-0">
            <img src={snbp1} alt="SNBP" className="h-20 w-20 object-contain" />
          </div>
          <div className="overflow-hidden">
            <h3 className="text-lg lg:text-2xl text-left text-white">
              HSC, SSC
            </h3>
            <p className="text-sm lg:text-base mt-2 text-left text-slate-400">
              2020–2023
            </p>
            <p className="mt-4 text-slate-200 text-left leading-6">
              <span className="text-slate-400">Grades:</span> HSC – 88.17%, SSC – 91.4%
            </p>
          </div>
        </div>
      </div>
      <div className='pt-5'>
        {/* === 3 Small Cards Below === */}
        <div className="flex flex-wrap  justify-center gap-6 mt-14">
          {/* Small Card 1 */}
          <a href="https://leetcode.com/u/adityaapotdar/" target="_blank" rel="noopener noreferrer" className="text-white border border-neutral-700 rounded-xl p-4 w-full max-w-xs h-50 flex flex-col justify-center items-center hover:border-primary transition">
            <img src={lc} alt="Leetcode" className='h-20 w-20'/>
            <h4 className="text-lg font-semibold">Leetcode</h4>
            <p className="text-sm text-slate-400 mt-2">Solved more than 250+ problems</p>
          </a>

          {/* Small Card 2 */}
          <a href="https://www.codechef.com/users/plush_free_44" target="_blank" rel="noopener noreferrer" className="text-white border border-neutral-700 rounded-xl p-4 w-full max-w-xs h-50 flex flex-col justify-center items-center hover:border-primary transition">
            <img src={cc} alt="CodeChef" className='h-20 w-20'/>
            <h4 className="text-lg font-semibold">CodeChef</h4>
            <p className="text-sm text-slate-400 mt-2">Solved more than 500+ problems and 1star</p>
          </a>

          {/* Small Card 3 */}
          <a href="https://drive.google.com/drive/folders/134iJv4O8wXgg672m9SrzSzy5dFlcznex?usp=drive_link" target="_blank" rel="noopener noreferrer" className="text-white border border-neutral-700 rounded-xl p-4 w-full max-w-xs h-50 flex flex-col justify-center items-center hover:border-primary transition">
            <img src={cer} alt="Certifications" className='h-20 w-20'/>
            <h4 className="text-lg font-semibold">Certifications</h4>
            <p className="text-sm text-slate-400 mt-2">Certifications from Deloitte , Udemy  etc.</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Achievements;

