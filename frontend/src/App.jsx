import { useState } from 'react';
import PredictionForm from './PredictionForm';
import PredictionResult from './PredictionResult';

function App() {
  const [prediction, setPrediction] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);

  const handleResult = (price, formData) => {
    setPrediction(price);
    setSubmittedData(formData);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto mb-10 text-center">
        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
          Regression Ridge · R² 0.91
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
          Estimation de prix immobilier
        </h1>
        <p className="text-slate-600 max-w-xl mx-auto">
          Modèle de machine learning entrainé sur le dataset Kaggle House Prices (Ames, Iowa),
          base sur une regression lineaire régularisée (Ridge).
        </p>
      </div>
      <div className="mb-8">
        <PredictionResult price={prediction} formData={submittedData} />
      </div>
      <PredictionForm onResult={handleResult} />

      <div className="max-w-2xl mx-auto mt-12 text-center text-sm text-slate-400">
        <p>
          Projet open source disponible sur{' '}
          <a 
            href="https://github.com/Ricardo1826/house-prices-regression"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            GitHub
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;