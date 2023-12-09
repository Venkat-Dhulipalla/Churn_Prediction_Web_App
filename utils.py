import pickle
import json
import pandas as pd

def load_model():
    with open('ANN.pkl', 'rb') as model_file:
        model = pickle.load(model_file)
    return model

__model = None

def predict_churn(data):
    global __model

    # Convert input JSON to the format expected by the model
    converted_data = {
        "creditscore": data["creditscore"],
        "age": data["age"],
        "tenure": data["tenure"],
        "balance": data["balance"],
        "numofproducts": data["numofproducts"],
        "hascrcard": data["hascrcard"],
        "isactivemember": data["isactivemember"],
        "estimatedsalary": data["estimatedsalary"],
        "geography_france": 0,
        "geography_germany": 0,
        "geography_spain": 0,
        "gender_female": 0,
        "gender_male": 0
    }

    # Map geography and gender based on input data
    if data["geography"] == "France":
        converted_data["geography_france"] = 1
    elif data["geography"] == "Germany":
        converted_data["geography_germany"] = 1
    elif data["geography"] == "Spain":
        converted_data["geography_spain"] = 1

    if data["gender"] == "1":
        converted_data["gender_male"] = 1
    elif data["gender"] == "0":
        converted_data["gender_female"] = 1

    new_customer_df = pd.DataFrame([converted_data])

    if __model is None:
        __model = load_model()

    # Get the predicted class (0 or 1)
    prediction = __model.predict(new_customer_df)[0]

    result = {
        "prediction": int(prediction)
    }

    return json.dumps(result)
