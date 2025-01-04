"use client";
import React, { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import Image from "next/image";

const AboutPage = () => {
  useEffect(() => {
    AOS.init({ duration: 100 });
    document.title = "About | SiyaRam";
  }, []);

  return (
    <div className="about-page">
      <section
        id="page-header"
        className="about-header py-10 text-center w-full h-[40vh] bg-cover flex justify-center items-center flex-col p-14"
        style={{ backgroundImage: "url('/images/about/banner.png')" }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-indigo-500">
          # Know Us
        </h2>
        <p className="text-lg md:text-xl mt-4 text-gray-600">
          Discover Goa's most comprehensive ornamental plant database at SiyaRam
          Nursery!
        </p>
      </section>

      <section
        id="about-head"
        className="section-p1 flex flex-col md:flex-row items-center p-8 bg-purple-100"
      >
        <div
          className="w-full md:w-1/2 rounded-lg overflow-hidden"
          data-aos="fade-right"
        >
          <Image
            src="/images/about/a6.jpeg"
            alt="About SiyaRam Nursery"
            width={1200}
            height={800}
            className="rounded-lg"
          />
        </div>
        <div className="md:pl-10 mt-6 md:mt-0" data-aos="fade-left">
          <h2 className="text-3xl font-bold text-indigo-500">Who We Are?</h2>
          <p className="text-gray-700 mt-4 leading-relaxed">
            Welcome to SiyaRam Nursery.com! We provide accurate and authentic
            information on ornamental plants that you can get and grow in India.
            Our extensive database is packed with a wide range of plant
            information, enhanced by user-friendly search and presentation
            tools, beneficial not only for India but also for all tropical
            regions.
          </p>
          <p className="text-gray-700 mt-4 leading-relaxed">
            Our journey began in 2015, and due to growing demand, SiyaRam
            Nursery.com now features three times more plants and over ten times
            more photographs. Environmental horticulture plays a crucial role in
            combating pollution and global warming. Embracing the green mantra,
            our database simplifies and explains plants, catering to everyone
            from hobbyists to professionals.
          </p>
          <ul className="list-disc list-inside mt-4 text-gray-700">
            <li>Plant lovers and garden enthusiasts</li>
            <li>Nurserymen</li>
            <li>Landscapists</li>
            <li>Architects</li>
            <li>City planners</li>
            <li>Hotel and resort managers</li>
            <li>Interior designers</li>
            <li>Students of Agriculture, Horticulture, and Botany</li>
            <li>Builders and contractors</li>
            <li>Government Agriculture and Horticulture Departments</li>
            <li>Agriculture and Horticulture colleges and libraries</li>
          </ul>
          <p className="mt-6 italic text-indigo-400">
            "Discover the ultimate guide to ornamental plants at SiyaRam
            Nursery.com – your one-stop destination for authentic information,
            extensive plant databases, and invaluable resources for all plant
            enthusiasts!"
          </p>
        </div>
      </section>

      <section
        id="about-video"
        className="section-p1 text-center p-8 bg-purple-100"
      >
        <h1 className="text-3xl font-bold text-indigo-500">Watch Us Serve You</h1>
        <div className="video mt-6 mx-auto w-full md:w-3/4">
          <video
            className="w-full h-auto rounded-xl"
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="none"
          >
            <source src="/videos/about/1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
      <section id="feature-heading" className="text-center p-8 bg-purple-100">
        <h1 className="text-3xl font-bold text-indigo-500">What we serve</h1>
      </section>
      <section
        id="feature"
        className="section-p1 grid grid-cols-2 md:grid-cols-3 gap-6 p-8 bg-purple-100"
      >
        {[ 
          { img: "/images/features/f1.png", title: "Free Shipping" },
          { img: "/images/features/f2.png", title: "Online Order" },
          { img: "/images/features/f3.png", title: "Save Money" },
          { img: "/images/features/f4.png", title: "Promotions" },
          { img: "/images/features/f5.png", title: "Happy Sell" },
          { img: "/images/features/f6.png", title: "24/7 Support" },
        ].map((feature, index) => (
          <div
            key={index}
            className="fe-box text-center p-6 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
            data-aos="fade-up"
            data-aos-delay={`${index * 100}`}
          >
            <Image
              src={feature.img}
              alt={feature.title}
              width={128}
              height={128}
              className="mx-auto mb-4"
            />
            <h6 className="text-lg font-semibold text-gray-700">
              {feature.title}
            </h6>
          </div>
        ))}
      </section>
    </div>
  );
};

export default AboutPage;
