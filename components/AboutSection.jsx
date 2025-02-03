import React from "react";
import { about } from "../lib/data";
import Image from "next/image";

const images = [
  { src: "/images/001.jpg", alt: "image1" },
  { src: "/images/002.jpg", alt: "image2" },
  { src: "/images/003.jpg", alt: "image3" },
  { src: "/images/005.jpg", alt: "image5" },
];

const AboutSection = () => {
  return (
    <section id="about" className="container p-4 md:px-8">
      <div className="content mt-16">
        <h2 className="tracking-widest uppercase font-bold text-2xl mb-6">
          About <span className="text-primary">me</span>
        </h2>

        {about.map((item, index) => (
          <div key={index} className="flex flex-col lg:flex-row gap-8 my-6">
            {/* Text Content (Left on lg:) */}
            <div className="w-full lg:w-1/2 lg:order-1">
              <h2 className="font-semi-bold text-2xl my-4">{item.title}</h2>
              <p>{item.content}</p>
            </div>

            {/* Image (Right on lg:) */}
            {images[index] && (
              <div className="w-full lg:w-1/2 lg:order-2 rounded-xl overflow-hidden">
                <Image
                  src={images[index].src}
                  alt={images[index].alt}
                  width={500}
                  height={300}
                  className="object-cover hover:scale-105 w-full h-[400px] lg:h-[250px]"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
