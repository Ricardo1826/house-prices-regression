# House Prices Regression

Estimation du prix de vente d'une maison à partir de ses caractéristiques, avec un modèle de régression linéaire régularisée (Ridge), entraîné sur le dataset Kaggle **House Prices - Advanced Regression Techniques** (Ames, Iowa).

## Aperçu

Interface web (React) connectée à une API (FastAPI) qui sert un modèle de machine learning entraîné en Python (scikit-learn).

## Objectif

Prédire le prix de vente d'une maison à partir de 6 caractéristiques principales (surface habitable, qualité générale, quartier, capacité du garage, année de construction, surface du sous-sol), en s'appuyant sur un modèle entraîné sur 1458 maisons réelles.

## Résultats du modèle

| Métrique | Valeur |
|---|---|
| R² | 0.9107 |
| MAE | ~15 400 $ |
| RMSE | 0.1227 (échelle log) |

Modèle retenu : régression Ridge (alpha=10), après comparaison avec une régression linéaire classique et un traitement de la multicolinéarité entre variables.

## Méthodologie

1. **Nettoyage des données** (`01_cleaning.ipynb`) : traitement des valeurs manquantes selon leur signification réelle, suppression de 2 outliers, transformation logarithmique de la variable cible (skewness réduite de 1.88 à 0.12)
2. **Analyse exploratoire** (`02_eda.ipynb`) : corrélations, analyse des quartiers et des variables de qualité
3. **Feature engineering** (`03_feature_engineering.ipynb`) : encodage ordinal des variables de qualité, encodage one-hot des variables nominales, traitement de la multicolinéarité
4. **Modélisation** (`04_modeling.ipynb`) : entraînement, évaluation, analyse des résidus, comparaison régression linéaire vs Ridge

## Structure du dépôt

Le dépôt contient les notebooks d'analyse, le code de l'API, le frontend React et les données du projet :

- `notebooks/` — les 4 notebooks du pipeline (nettoyage, EDA, feature engineering, modélisation)
- `data/` — données brutes et transformées
- `src/` — modèle entraîné, script de prédiction (`predict.py`), API (`api.py`)
- `frontend/` — application React (formulaire de prédiction, affichage des résultats)

## Lancer le projet en local

**API (dans `src/`) :**
```bash
uvicorn api:app --reload
```

**Frontend (dans `frontend/`) :**
```bash
npm install
npm run dev
```

## Outils utilisés

Python (pandas, scikit-learn, matplotlib, seaborn), FastAPI, React, Tailwind CSS

## Auteur

Richard GNALOU