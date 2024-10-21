import React from 'react';
import { Link } from 'react-router-dom';
import { Music, Share2, DollarSign } from 'lucide-react';

const Home = () => {
  return (
    <div className="text-center">
      <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
        Welcome to Ledi AI
      </h1>
      <p className="text-xl mb-12">
        Generate, distribute, and share your music with AI-powered tools
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <FeatureCard
          icon={<Music className="w-12 h-12 text-pink-500" />}
          title="AI Music Generation"
          description="Create unique tracks with our advanced AI algorithms"
        />
        <FeatureCard
          icon={<Share2 className="w-12 h-12 text-purple-500" />}
          title="Music Distribution"
          description="Distribute your music to major platforms with ease"
        />
        <FeatureCard
          icon={<DollarSign className="w-12 h-12 text-indigo-500" />}
          title="Revenue Sharing"
          description="Earn 70% of the revenue from your distributed music"
        />
      </div>
      <Link
        to="/studio"
        className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-6 rounded-full hover:from-pink-600 hover:to-purple-600 transition-all duration-300"
      >
        Start Creating
      </Link>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 transform hover:scale-105 transition-all duration-300">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

export default Home;