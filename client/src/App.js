import React from 'react';
import SalaryForm from './components/SalaryForm';

function App() {
  const handleEstimate = ({ salary, raise }) => {
    console.log('Estimate values:', salary, raise);
    // You'll later pass this to a function that calculates 15-year salary projection
  };

  return (
      <div>
        <h1>Social Security Income Estimator</h1>
        <SalaryForm onCalculate={handleEstimate} />
      </div>
  );
}

export default App;
