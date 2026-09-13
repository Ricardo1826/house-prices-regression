import joblib
import json
import pandas as pd
import numpy as np

# Chargement du modele et des metadonnees, une seule fois au demarrage
model = joblib.load('model_ridge.pkl')
model_columns = joblib.load('model_columns.pkl')

with open('default_values.json', 'r') as f:
    default_values = json.load(f)

def predict_price(gr_liv_area, overall_qual, neighborhood, garage_cars, year_built, total_bsmt_sf):
    """
    Predit le prix d'une maison a partir de 6 caracteristiques principales.
    Les autres variables sont fixees a leur valeur par defaut (mediane/mode du dataset d'entrainement).
    """
    # Depart : un profil de maison "typique", toutes colonnes a leur valeur par defaut
    input_data = default_values.copy()
    # Ecrasement des 6 valeurs fournies par l'utilisateur
    input_data['GrLivArea'] = gr_liv_area
    input_data['OverallQual'] = overall_qual
    input_data['GarageCars'] = garage_cars
    input_data['YearBuilt'] = year_built
    input_data['TotalBsmtSF'] = total_bsmt_sf
     # Le quartier est une colonne one-hot : on remet toutes les colonnes Neighborhood_* a 0,
    # puis on met la bonne a 1
    for col in model_columns:
        if col.startswith('Neighborhood_'):
            input_data[col] = 0
    neighborhood_col = f'Neighborhood_{neighborhood}'
    if neighborhood_col in input_data:
        input_data[neighborhood_col] = 1
    # Si le quartier correspond a la categorie de reference (retiree par drop_first),
    # on laisse toutes les colonnes Neighborhood_* a 0, c'est le comportement correct

    # Construction du vecteur dans le bon ordre de colonnes attendu par le modele
    X_input = pd.DataFrame([input_data])[model_columns]

    # Prediction en log, puis conversion en dollars reels
    price_log = model.predict(X_input)[0]
    price_dollars = np.expm1(price_log)

    return round(price_dollars, 2)