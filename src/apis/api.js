import axios from "axios";
import { aws4Interceptor } from "aws4-axios";

const interceptor = aws4Interceptor(
  {
    region: "eu-east-2",
    service: "execute-api",
  },
  {
    accessKeyId: "", // My AWS IAM Access key
    secretAccessKey: "", // My AWS IAM Secret Access key
  }
);

const api = axios.create({
  baseURL:
    "http://skydometodo-env.eba-vfvyyand.us-east-2.elasticbeanstalk.com/api",
});

api.interceptors.request.use(interceptor);

export const insertToDo = (payload) =>
  api
    .post(`/todo`, payload)
    .then()
    .catch(() =>
      alert("Please enter a To Do in the text field or To Do already exists!")
    );

export const getAllToDos = () =>
  api
    .get(`/todos`)
    .then((response) => {
      const data = response.data;
      const result = data.data.map(({ toDoName }) => toDoName);
      return result;
    })
    .catch(() => {
      return [];
    });

const apis = {
  insertToDo,
  getAllToDos,
};

export default apis;
