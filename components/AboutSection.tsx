import React from "react";
import Image from "next/image";
import { getAboutSections } from "@/lib/supabase";

const AboutSection = async () => {
  let aboutSections = [];

  try {
    aboutSections = await getAboutSections();
  } catch (error) {
    console.error("Error fetching about sections:", error);
  }

  // Fallback if no data
  if (!aboutSections || aboutSections.length === 0) {
    return (
      <section id="about" className="container p-4 md:px-8">
        <div className="content mt-16 text-center text-muted-foreground">
          <h2 className="tracking-widest uppercase font-bold text-2xl mb-6">
            About <span className="text-primary">me</span>
          </h2>
          <p>Content coming soon...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="container p-4 md:px-8">
      <div className="content mt-16">
        <h2 className="tracking-widest uppercase font-bold text-2xl mb-6">
          About <span className="text-primary">me</span>
        </h2>

        {aboutSections.map((item, index) => (
          <div key={item.id} className="flex flex-col lg:flex-row gap-8 my-6">
            {/* Text Content */}
            <div
              className={`w-full lg:w-1/2 ${index % 2 === 1 ? "lg:order-2" : "lg:order-1"}`}
            >
              {item.title && (
                <h2 className="font-semi-bold text-2xl my-4 text-primary">
                  {item.title}
                </h2>
              )}
              <div className="whitespace-pre-wrap">{item.content}</div>
            </div>

            {/* Image */}
            {item.image_url && (
              <div
                className={`w-full lg:w-1/2 rounded-xl overflow-hidden ${index % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}
              >
                <Image
                  src={item.image_url}
                  alt={item.title || "About image"}
                  width={500}
                  height={300}
                  className="object-cover hover:scale-105 w-full h-[400px] lg:h-[400px] transition-transform duration-500"
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
