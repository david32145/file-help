import React from 'react';
import {StatusBar} from 'react-native';

import 'react-native-gesture-handler';

import FileProvider from './files';

import AppRoutes from './routes';

const Application: React.FC = () => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <FileProvider>
        <AppRoutes />
      </FileProvider>
    </>
  );
};

export default Application;
