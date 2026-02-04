
import React, { useState, useEffect } from 'react';
import { CertificateData } from './types';
import Editor from './components/Editor';
import VerificationView from './components/VerificationView';
import Home from './components/Home';
import Settings from './components/Settings';

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash || '#/');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
  };

  const renderRoute = () => {
    if (currentPath === '#/settings') {
      return <Settings navigate={navigate} />;
    }

    if (currentPath.startsWith('#/edit')) {
      const id = currentPath.split('=')[1];
      return <Editor id={id} navigate={navigate} />;
    }
    
    if (currentPath.startsWith('#/verify')) {
      const params = new URLSearchParams(currentPath.split('?')[1]);
      const id = params.get('id');
      const dataParam = params.get('data');
      
      return <VerificationView id={id} dataParam={dataParam} navigate={navigate} />;
    }

    if (currentPath === '#/create') {
      return <Editor navigate={navigate} />;
    }

    return <Home navigate={navigate} />;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {renderRoute()}
    </div>
  );
};

export default App;
