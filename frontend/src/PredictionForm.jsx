import { useState } from 'react';

const NEIGHBORHOODS = [
  'Blmngtn', 'Blueste', 'BrDale', 'BrkSide', 'ClearCr', 'CollgCr',
  'Crawfor', 'Edwards', 'Gilbert', 'IDOTRR', 'MeadowV', 'Mitchel',
  'NAmes', 'NoRidge', 'NPkVill', 'NridgHt', 'NWAmes', 'OldTown',
  'Sawyer', 'SawyerW', 'Somerst', 'StoneBr', 'Timber', 'Veenker'
];

const QUALITY_LABELS = {
  1: '1 - Tres faible', 2: '2 - Faible', 3: '3 - Mediocre',
  4: '4 - En dessous de la moyenne', 5: '5 - Moyenne',
  6: '6 - Au dessus de la moyenne', 7: '7 - Bonne',
  8: '8 - Tres bonne', 9: '9 - Excellente', 10: '10 - Tres excellente'
};

function PredictionForm({ onResult }) {
    const [formData, setFormData] = useState({
        gr_liv_area: '',
        overall_qual: 7,
        neighborhood: 'NAmes',
        garage_cars: 2,
        year_built: '',
        total_bsmt_sf: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://127.0.0.1:8000/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    gr_liv_area: parseFloat(formData.gr_liv_area),
                    overall_qual: parseInt(formData.overall_qual),
                    neighborhood: formData.neighborhood,
                    garage_cars: parseInt(formData.garage_cars),
                    year_built: parseInt(formData.year_built),
                    total_bsmt_sf: parseFloat(formData.total_bsmt_sf)
                })
           });
           if (!response.ok) {
                const errData = await response.json();
                throw new Error (errData?.[0]?.msg || 'Valeurs invalides, vérifiez les champs')
            }
            const data = await response.json();
            onResult(data.predicted_price, formData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto'>
            <h2 className='text-2xl font-semibold text-slate-800 mb-6'>
                Caractéristiques de la maison
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>
                    <label className='block text-sm font-medium text-slate-600 mb-1'>Quartier</label>
                    <select name="neighborhood" value={formData.neighborhood} onChange={handleChange}
                        className='w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'>
                        {NEIGHBORHOODS.map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                </div>

                <div>
                    <label className='block text-sm font-medium text-slate-600 mb-1'>Qualité générale de la maison</label>
                    <select name="overall_qual" value={formData.overall_qual} onChange={handleChange} className='w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'>
                        {Object.entries(QUALITY_LABELS).map(([val, label]) => (
                            <option key={val} value={val}>{label}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className='block text-sm font-medium text-slate-600 mb-1'>Capacité du garage</label>
                    <select name="garage_cars" value={formData.garage_cars} onChange={handleChange} className='w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'>
                        {[0, 1, 2, 3, 4].map(n => (
                            <option key={n} value={n}>{n} voiture{n > 1 ? 's' : ''}</option>
                        ))}
                    </select>
                </div>
                
                <div>
                    <label className='block text-sm font-medium text-slate-600 mb-1'>Année de construction</label>
                    <input type="number" name='year_built' value={formData.year_built} onChange={handleChange} placeholder='Ex: 2005 (entre 1872 et 2010)' min='1872' max='2010' required className='w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'/>
                </div>

                <div>
                    <label className='block text-sm font-medium text-slate-600 mb-1'>Surface habitable (pieds carrés)</label>
                    <input type="number" name='gr_liv_area' value={formData.gr_liv_area} onChange={handleChange} placeholder='Ex: 1500 (entre 334 et 4476)' min='334' max='4476' required className='w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'/>
                </div>

                <div>
                    <label className='block text-sm font-medium text-slate-600 mb-1'>Surface du sous-sol</label>
                    <input type="number" name='total_bsmt_sf' value={formData.total_bsmt_sf} onChange={handleChange} placeholder='Ex: 800 (entre 0 et 3206, 0 si pas de sous-sol)' min='0' max='3206' required className='w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'/>
                </div>
            </div>

            {error && (
                <p className='mt-4 text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2'>{error}</p>
            )}
            <button type='submit' disabled={loading} className='mt-6 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3 rounded-lg transition-colors'>
                {loading ? 'Estimation en cours...' : 'Estimer le prix'}
            </button>
        </form>
    );
}

export default PredictionForm;
