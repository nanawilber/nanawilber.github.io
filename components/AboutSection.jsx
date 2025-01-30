import React from "react";
import { about } from "../lib/data";

const AboutSection = () => {
  return (
    <section id="about" className="container p-4 md:px-8">
      <div className="content mt-16">
        <h2 className="tracking-widest uppercase font-bold text-2xl mb-6">
          About <span className="text-primary">me</span>
        </h2>
        {/* <div className="w-full lg:max-w-[50%]">
          <h2 className="font-semi-bold text-2xl my-4">
            Background and Education
          </h2>
          <p>
            Born Nanabanyin Wilberforce, Brapurple had his Montessori education
            at Woodbridge International School and continued his high school
            education at St. Augustine’s College, one of the oldest single-sex
            schools in Ghana, up until 2014. He then pursued further studies at
            Methodist University College in Dansoman, Accra, Ghana.
          </p>
        </div> */}
        {about.map((item, index) => (
          <div key={index} className="w-full lg:max-w-[50%] my-6">
            <h2 className="font-semi-bold text-2xl my-4">{item.title}</h2>
            <p>{item.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
