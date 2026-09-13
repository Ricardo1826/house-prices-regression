from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from predict import predict_price

app = FastAPI(title="House Prices Prediction API")

# Autorise le frontend React (autre port) a appeler cette API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class HouseFeatures(BaseModel):
    gr_liv_area: float = Field(..., ge=334, le=4476, description="Surface habitable en pieds carres")
    overall_qual: int = Field(..., ge=1, le=10, description="Qualite generale de 1 a 10")
    neighborhood: str = Field(..., description="Nom du quartier")
    garage_cars: int = Field(..., ge=0, le=4, description="Capacite du garage en nombre de voitures")
    year_built: int = Field(..., ge=1872, le=2010, description="Annee de construction")
    total_bsmt_sf: float = Field(..., ge=0, le=3206, description="Surface du sous-sol en pieds carres")


@app.post("/predict")
def predict(features: HouseFeatures):
    prix = predict_price(
        gr_liv_area=features.gr_liv_area,
        overall_qual=features.overall_qual,
        neighborhood=features.neighborhood,
        garage_cars=features.garage_cars,
        year_built=features.year_built,
        total_bsmt_sf=features.total_bsmt_sf
    )
    return {"predicted_price": prix}