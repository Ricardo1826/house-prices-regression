function PredictionResult({ price, formData }) {
  if (!price) return null;

  const MAE = 15400;
  const lowerBound = Math.round(price - MAE);
  const upperBound = Math.round(price + MAE);

  const formatPrice = (value) =>
    new Intl.NumberFormat('fr-FR').format(Math.round(value));

  const factors = [
    { label: 'Qualite generale', value: `${formData.overall_qual}/10` },
    { label: 'Quartier', value: formData.neighborhood },
    { label: 'Surface habitable', value: `${formData.gr_liv_area} pi²` },
    { label: 'Capacite garage', value: `${formData.garage_cars} voiture(s)` },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-xl p-8 max-w-2xl mx-auto mt-8 text-white animate-fade-in">
      <p className="text-slate-300 text-sm mb-2">Prix estime</p>
      <p className="text-4xl font-bold mb-1">{formatPrice(price)} $</p>
      <p className="text-slate-400 text-sm mb-6">
        Fourchette probable : {formatPrice(lowerBound)} $ - {formatPrice(upperBound)} $
      </p>

      <div className="border-t border-slate-700 pt-5">
        <p className="text-sm text-slate-300 mb-3">Principaux facteurs pris en compte</p>
        <div className="grid grid-cols-2 gap-3">
          {factors.map((f) => (
            <div key={f.label} className="bg-slate-700/50 rounded-lg px-3 py-2">
              <p className="text-xs text-slate-400">{f.label}</p>
              <p className="text-sm font-medium">{f.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PredictionResult;