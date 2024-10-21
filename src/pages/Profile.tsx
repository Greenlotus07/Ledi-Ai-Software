import React, { useState, useEffect } from 'react';
import { User, Music, Share2, Settings, DollarSign } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getEarnings } from '../services/musicDistribution';

const Profile = () => {
  const { currentUser } = useAuth();
  const [earnings, setEarnings] = useState(0);

  useEffect(() => {
    const fetchEarnings = async () => {
      if (currentUser) {
        try {
          const earningsData = await getEarnings(currentUser.uid);
          setEarnings(earningsData.total);
        } catch (error) {
          console.error('Error fetching earnings:', error);
        }
      }
    };

    fetchEarnings();
  }, [currentUser]);

  if (!currentUser) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 mb-8">
        <div className="flex items-center mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
          <div className="ml-6">
            <h1 className="text-3xl font-bold">{currentUser.displayName || 'User'}</h1>
            <p className="text-gray-300">{currentUser.email}</p>
          </div>
        </div>
        <div className="flex space-x-4 text-center">
          <div>
            <div className="text-2xl font-bold">{earnings.toFixed(2)}</div>
            <div className="text-gray-300">Total Earnings ($)</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ProfileCard
          icon={<Music className="w-8 h-8 text-pink-500" />}
          title="My Tracks"
          description="Manage and edit your generated tracks"
        />
        <ProfileCard
          icon={<Share2 className="w-8 h-8 text-purple-500" />}
          title="Distribution"
          description="Track your music distribution and earnings"
        />
        <ProfileCard
          icon={<Settings className="w-8 h-8 text-indigo-500" />}
          title="Settings"
          description="Adjust your account and privacy settings"
        />
      </div>
    </div>
  );
};

const ProfileCard = ({ icon, title, description }) => (
  <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6">
    <div className="flex items-center mb-4">
      {icon}
      <h2 className="text-xl font-semibold ml-2">{title}</h2>
    </div>
    <p className="text-gray-300">{description}</p>
    <button className="mt-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-2 px-4 rounded hover:from-pink-600 hover:to-purple-600 transition-colors">
      View
    </button>
  </div>
);

export default Profile;