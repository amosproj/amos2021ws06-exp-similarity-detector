#!flask/bin/python
from flask import jsonify, Flask
import joblib

filename = "outputs/sal_model.pkl"
app = Flask(__name__)


@app.route("/")
def index():
    return "Salary Predictor"


@app.route("/sal/<int:x>", methods=["GET"])
def predict(x):
    # todo this is where we are using / loading our model
    model = joblib.load(filename)
    y = model.predict([[x]])[0][0]
    sal = jsonify({"salary": round(y, 2)})
    return sal


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
