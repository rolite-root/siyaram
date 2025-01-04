import React from 'react';
import Image from 'next/image';

const Features = () => {
    return (
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
              <Image
                src={feature.image}
                alt={feature.name}
                width={500}
                height={300}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <h2 className="text-xl font-bold mt-4">{feature.name}</h2>
              <p className="text-gray-300 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
};

export default Features;
