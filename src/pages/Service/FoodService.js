import axios from 'axios';
const BASE_URL_SERVER = 'http://13.213.7.133'


const API_ENDPOINT = {
  GET_LIST: "/api/admin/v1/foods/list",
  GET_DETAILS: "/api/admin/v1/foods/",
  UPDATE_DETAILS: "/api/admin/v1/foods",
  CREATE_NEW: "/api/admin/v1/foods",
  DELETE: "/api/admin/v1/foods/",



  ACCESS_AUTH_TOKEN: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1IiwiZmlyc3ROYW1lIjoiUGluZGlhcyIsImxhc3ROYW1lIjoiQWRtaW4iLCJyb2xlIjoiQURNSU4iLCJpc3MiOiJNZXRhd2F5aG9sZGluZ3MiLCJleHAiOjE2NjI5NDY3NjgsImVtYWlsIjoiZGFjYWRtaW5AZ21haWwuY29tIn0.JYZM0ABrYtXi09gHKY3ySaLofsqDfn_Wp4T0vMxdtO8"

}



class FoodService {
  getFoodList = async (pageNumber) => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + API_ENDPOINT.ACCESS_AUTH_TOKEN,
        "Content-Type": "application/json",
      },
      params: { page: pageNumber }
    }
    return await axios.get(BASE_URL_SERVER + API_ENDPOINT.GET_LIST, config);
  };





  getDetails = async (id) => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + API_ENDPOINT.ACCESS_AUTH_TOKEN
      }
    }


    return await axios.get(BASE_URL_SERVER + API_ENDPOINT.GET_DETAILS + id, config);
  };



  updateDetails = async (data) => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + API_ENDPOINT.ACCESS_AUTH_TOKEN,
        "Content-Type": "application/json",
      }
    }
    return await axios.put(BASE_URL_SERVER + API_ENDPOINT.UPDATE_DETAILS, data, config);
  };



  createNew = async (data) => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + API_ENDPOINT.ACCESS_AUTH_TOKEN
      }
    }
    return await axios.post(BASE_URL_SERVER + API_ENDPOINT.CREATE_NEW, data, config);
  };

  deleteFood = async (id) => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + API_ENDPOINT.ACCESS_AUTH_TOKEN,
        "Content-Type": "application/json",
      }
    }
    return await axios.delete(BASE_URL_SERVER + API_ENDPOINT.DELETE + id, config);
  }
}

const foodService = new FoodService();
export default foodService;

