import React from "react";



function About (){
    return (
        <div id='About'className="About border-b border-neutral-900 pb-4">
  <h2 className="my-20 text-center text-4xl">
    About <span className="text-neutral-500">Me</span>
  </h2>

  <div className="flex justify-center pb-10">
    <div className="w-full lg:w-2/3 px-4">
      <p className="text-center text-2xl leading-relaxed text-neutral-500">
            Hi! I’m <span className="text-neutral-300">Aditya Potdar</span>, an <span className="text-neutral-100"> Electronics and Computer Engineering student </span> deeply interested 
            in <span className="text-neutral-300"> Data Structures & Algorithms, Full Stack Development, and Competitive Programming. </span>
             I actively practice DSA using Striver’s Sheet and regularly participate in coding contests to sharpen my <span className="text-neutral-300">problem-solving skills. </span>
             I’m also learning the<span className="text-neutral-300"> MERN STACK </span>to build scalable, real-world web applications. Previously, I’ve worked on ML-based projects like<span className="text-neutral-300"> crop disease detection </span> , but my current focus is on writing clean code, solving complex problems, 
             and becoming a<span className="text-neutral-300"> well-rounded developer. </span>
             I'm driven by a<span className="text-neutral-300"> strong curiosity </span>  and a constant desire to grow through<span className="text-neutral-300"> hands-on learning. </span> 
      </p>
    </div>
  </div>
</div>


    )
}


export default About;