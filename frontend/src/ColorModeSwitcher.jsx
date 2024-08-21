import React from 'react';
import { IconButton, useColorMode } from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ColorModeSwitcher = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      aria-label="Toggle color mode"
      icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
      position={'fixed'}
      top='4'
      right={'4'}
      onClick={toggleColorMode}
      {...props}
    />
  );
};

export default ColorModeSwitcher;