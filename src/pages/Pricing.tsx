import React from 'react';
import { Check, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Free',
      price: '$0',
      features: [
        'AI-powered music generation',
        'Basic editing tools',
        'Community access',
        '5 tracks per month',
        'No commercial license',
      ],
      notIncluded: [
        'Distribution to streaming platforms',
        'Advanced editing tools',
        'Unlimited tracks',
      ],
    },
    {
      name: 'Pro',
      price: '$19.99',
      features: [
        'Everything in Free, plus:',
        'Distribution to major streaming platforms',
        'Advanced editing tools',
        'Unlimited tracks',
        'Commercial license',
        '70% revenue share on distributed tracks',
      ],
      notIncluded: [],
    },
  ];

  const handleSubscribe = (planName: string) => {
    if (!currentUser) {
      navigate('/login');
    } else {
      // Implement subscription logic here
      console.log(`Subscribing to ${planName} plan`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Choose Your Plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {plans.map((plan) => (
          <div key={plan.name} className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
            <div className="text-4xl font-bold mb-4">{plan.price}</div>
            <p className="text-gray-300 mb-6">per month</p>
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>{feature}</span>
                </li>
              ))}
              {plan.notIncluded.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-400">
                  <X className="w-5 h-5 text-red-500 mr-2" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleSubscribe(plan.name)}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-2 px-4 rounded hover:from-pink-600 hover:to-purple-600 transition-colors"
            >
              {currentUser ? (plan.name === 'Free' ? 'Current Plan' : 'Upgrade Now') : 'Sign Up'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;