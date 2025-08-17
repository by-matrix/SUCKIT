import React from 'react';

const LoadingSpinner = ({ size = 'md', color = 'yellow' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    yellow: 'border-yellow-400',
    green: 'border-green-500',
    blue: 'border-blue-500'
  };

  return (
    <div className="flex items-center justify-center">
      <div 
        className={`${sizeClasses[size]} ${colorClasses[color]} border-2 border-solid border-r-transparent rounded-full animate-spin`}
      />
    </div>
  );
};

export default LoadingSpinner;
