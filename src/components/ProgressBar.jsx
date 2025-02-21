import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ totalValue, value }) => {
  const percentage = (value / totalValue) * 100;
  return (
    <div className='w-full bg-gray-800 rounded-full h-4 border border-yellow relative overflow-hidden'>
      <motion.div
        className='h-full bg-yellow rounded-full border border-yellow'
        initial={{ width: '0%' }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />
    </div>
  );
};

export default ProgressBar;
