import React from 'react';
// import { Button } from '@mui/material'

const VerificationButton = ({ token, label = 'Start Verification', configs }) => {
  const startVerification = async () => {
    if (token) {
      console.log('🚀 ~ startVerification ~ token:', token, window);
      const complyCubeInstance = await window.ComplyCube?.mount({
        token: token,
        shouldCloseOnOverlayClick: true,
        onModalClose: function () {
          console.log('Modal manually closed');
          complyCubeInstance.updateSettings({ isModalOpen: false });
        },
        ...configs,
      });
    }
  };

  return (
    <>
      <div id='complycube-mount'></div>
      <button
        onClick={() => startVerification()}
        className='bg-yellow text-black px-4 py-2 rounded-md mt-4 w-full font-bold text-black-200'>
        {label}
      </button>
    </>
  );
};

export default VerificationButton;
