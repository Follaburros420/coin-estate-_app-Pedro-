import React from 'react';
import { Tooltip, Button } from '@mui/material';
import StyledImage from './StyedImage';

const InfoTooltip = ({ message, className }) => {
  return (
      <Tooltip title={message} arrow placement='top' className={className}>
        {/* <Button className={`w-fit p-0 ${className}`} sx={{ padding: 0 }}> */}
          <StyledImage src='/assets/svg/Exclamation.svg' className='w-5 h-5 ' />
        {/* </Button> */}
      </Tooltip>
  );
};

export default InfoTooltip;
