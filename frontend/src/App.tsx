import React from 'react';
import POForm from './components/POForm'; // Import the POForm component
import './styles/app.css'; 
import POTable from './components/POTable';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <h1>Purchase Order Generator</h1>
      <POForm />
      <POTable/>
    </div>
  );
};

export default App;
