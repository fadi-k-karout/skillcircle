// src/App.tsx
import React from 'react';
import AppRoutes from './routes/Routes';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import { ErrorProvider } from './context/ErrorContext';

const App: React.FC = () => (
  <ErrorProvider>
    <AuthProvider>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </AuthProvider>
  </ErrorProvider>
);

export default App;