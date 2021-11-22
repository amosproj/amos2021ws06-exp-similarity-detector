# without this code, the pickle file is useless --> needs to be put into Azure ML with the pickle

# these dependencies need to be specified in yml file
import json
import numpy as np
import os
import pickle
import joblib
from sklearn.linear_model import LogisticRegression

from azureml.core.model import Model


def init():
    """
    initialize the model and load it according to Azure ML Studio Requirements
    """
    global model
    # retrieve the path from the model file using the model name
    model_path = Model.get_model_path("sal_model")
    model = joblib.load(model_path)


def run(raw_data):
    """
    This is where the magic is supposed to happen: Make prediction.
    :param raw_data: Data that is passed as REST request.
    :return: prediction as json
    """
    data = np.array(json.loads(raw_data)["data"])
    # make prediction
    y_hat = model.predict(data)
    return json.dumps(y_hat.tolist())
