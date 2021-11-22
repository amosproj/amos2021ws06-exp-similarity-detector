# file: train your model
# simple model: predict salaries from a specific company depending on work experience in years


# imports for training
import datetime
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import joblib
from sklearn.metrics import mean_squared_error

# imports necessary for Azure ML Studio
import azureml.core
from azureml.core import Workspace
from azureml.core import Experiment
from azureml.core.webservice import Webservice
from azureml.core.image import ContainerImage

from azureml.core.conda_dependencies import CondaDependencies


def main():
    # first, we get the workspace that has already been created in Azure ML Studio from a config file
    ws = Workspace.from_config()

    # now, we create an experiment like so
    exp = Experiment(workspace=ws, name="amos_test")

    # create logs --> these are useful to not just print your runs in the console but save them as experiments
    # todo --> runs can later be loops
    # but to also find everything logged in AzureML
    run = exp.start_logging()
    run.log("Experiment Start Time: ", str(datetime.datetime.now()))

    # let us finally get the dataset
    # todo put the data into a dataframe here where ever it comes from
    # in this case, we use years of experience (x) and salary data (y)
    sal = pd.read_csv("sal.csv", header=0, index_col=None)
    X = sal[["x"]]
    y = sal[["y"]]

    # split the data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=10)

    # init the model
    lm = LinearRegression()
    # train the model
    lm.fit(X_train, y_train)

    # this is where we actually save the data into the experiment
    run.log("Intercept : ", lm.intercept_[0])
    run.log("Slope : ", lm.coef_[0][0])

    # if we log it in azure ML, we dont neet to print it anymore
    print("Intercept : ", round(lm.intercept_[0], 2))
    print("Slope : ", round(lm.coef_[0][0], 2))

    # predict on test data
    y_predict = lm.predict(X_test)
    # difference between true values and prediction
    mse = mean_squared_error(y_test, y_predict)
    print("MSE : ", round(mse, 2))

    # save the end time for the experiment
    run.log("Experiment End Time : ", str(datetime.datetime.now()))
    # end the experiment
    run.complete()
    # fyi: print the portal_url
    print(run.get_portal_url())

    # name of the model as a pickle
    filename = "outputs/sal_model.pkl"
    # dump the model to use later
    joblib.dump(lm, filename)


if __name__ == '__main__':
    main()
