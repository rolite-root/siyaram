'use client';

import React, { useEffect } from 'react';
import { MongoClient } from '../lib/mongodb';
import 'aos/dist/aos.css';
import AOS from 'aos';
import Link from 'next/link';

export default function Home({ features }) {
  useEffect(() => {
    AOS.init({ duration: 900 });
    document.title = "Home | SiyaRam";
  }, []);

  return (
    <div className="relative text-white min-h-screen overflow-hidden">
      <div
        className="flex flex-col items-center text-center px-6 py-20 lg:px-12"
        data-aos="fade-up"
      >
        <h1 className="text-4xl lg:text-5xl font-bold leading-snug mt-10">
          {features[0].title}
        </h1>
        <p className="text-lg mt-4 max-w-2xl">
          {features[0].description}
        </p>

        <Link
          href="/signup"
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md text-lg font-semibold transition"
        >
          Get Started
        </Link>
      </div>

      <section className="text-center py-16" data-aos="fade-up">
        <h2 className="text-4xl font-bold mb-6">Our Features</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8">
          {features[1].description}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.slice(2).map((feature, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-lg p-4 bg-gray-800 text-white"
              data-aos="fade-up"
            >
              <img
                src={feature.image}
                alt={feature.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <h2 className="text-xl font-bold mt-4">{feature.name}</h2>
              <p className="text-gray-300 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-gray-900" data-aos="fade-left">
        <h2 className="text-4xl font-bold text-center mb-8">What Our Customers Say</h2>
        <div className="flex flex-col lg:flex-row justify-center items-center space-y-6 lg:space-y-0 lg:space-x-8">
          <blockquote
            className="w-96 h-40 p-6 text-gray-300 bg-gray-800 rounded-md shadow-lg"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {features[2].testimonial}
            <footer className="mt-4 text-blue-400">- {features[2].author}</footer>
          </blockquote>
          <blockquote
            className="w-96 h-40 p-6 text-gray-300 bg-gray-800 rounded-md shadow-lg"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {features[3].testimonial}
            <footer className="mt-4 text-blue-400">- {features[3].author}</footer>
          </blockquote>
        </div>
      </section>
    </div>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db('flexi-db');
  const features = await db.collection('features').find().toArray();

  client.close();

  return {
    props: {
      features: JSON.parse(JSON.stringify(features)),
    },
  };
}
