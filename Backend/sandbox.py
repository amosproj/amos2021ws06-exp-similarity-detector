from azureml.core import Workspace, Webservice
from azureml.core.conda_dependencies import CondaDependencies
from azureml.core.image import ContainerImage
from azureml.core.model import Model
from azureml.core.webservice import AciWebservice


def write_yml():
    # here, we write the yml file once like so
    salenv = CondaDependencies()
    salenv.add_conda_package("scikit-learn")

    with open("salenv.yml", "w") as f:
        f.write(salenv.serialize_to_string())
    with open("salenv.yml", "r") as f:
        print(f.read())


def deploy_model(workspace=Workspace.from_config()):
    # todo here, we register the model as a pickle once
    model = Model.register(model_path="outputs/sal_model.pkl", model_name="sal_model", tags={"key": "1"},
                           description="Salary Prediction", workspace=workspace)
    # todo here, we deploy the model
    # ACI = Azure Container Instance
    aciconfig = AciWebservice.deploy_configuration(cpu_cores=1, memory_gb=1,
                                                   tags={"data": "Salary", "method": "sklearn"},
                                                   description="Predict Salary")
    # todo deploy the container containing the yml and score file
    image_config = ContainerImage.image_configuration(execution_script="score.py", runtime="python",
                                                      conda_file="salenv.yml")
    # now, we expose the container as a service such that it can be used externally
    service = Webservice.deploy_from_model(workspace=workspace, name="salary-svc", deployment_config=aciconfig,
                                           models=[model], image_config=image_config)
    service.wait_for_deployment(show_output=True)


if __name__ == '__main__':
    ws = Workspace.from_config()
    print(ws.get_details())
    deploy_model()
