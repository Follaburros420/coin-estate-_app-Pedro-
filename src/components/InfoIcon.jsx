import React from 'react';
import { Tooltip, Button } from '@mui/material';
import StyledImage from './StyedImage';
import clsxm from '@/utils/clsxm';

const InfoTooltip = ({ message, className }) => {
  return (
      <Tooltip title={message} arrow placement='top' sx={{ fontSize: '16px' }} className={clsxm('text-16', className)}>
        {/* <Button className={`w-fit p-0 ${className}`} sx={{ padding: 0 }}> */}
          <StyledImage src='/assets/svg/Exclamation.svg' className='w-5 h-5 ' />
        {/* </Button> */}
      </Tooltip>
  );
};

export default InfoTooltip;
