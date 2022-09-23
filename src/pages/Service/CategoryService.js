import axios from 'axios';
const BASE_URL_SERVER = 'http://13.213.7.133'


const API_ENDPOINT = {
  GET_LIST: "/api/admin/v1/categories",
  GET_DETAILS: "/api/admin/v1/categories/",
  UPDATE_DETAILS: "/api/admin/v1/categories",
  CREATE_NEW: "/api/admin/v1/categories",
  DELETE: "/api/admin/v1/categories/",



  ACCESS_AUTH_TOKEN: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1IiwiZmlyc3ROYW1lIjoiUGluZGlhcyIsImxhc3ROYW1lIjoiQWRtaW4iLCJyb2xlIjoiQURNSU4iLCJpc3MiOiJNZXRhd2F5aG9sZGluZ3MiLCJleHAiOjE2NjI2MDIyNzMsImVtYWlsIjoiZGFjYWRtaW5AZ21haWwuY29tIn0.IgFrQW742kZipGnEqKGXIwgUqPOHamd8sAUzUXhrn5o"
}



class CategoryService {

  getCategoryList = async (pageNumber) => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + API_ENDPOINT.ACCESS_AUTH_TOKEN,
        "Content-Type": "application/json",
      },
      params: { page: pageNumber }
    }
    return await axios.get(BASE_URL_SERVER + API_ENDPOINT.GET_LIST, config);
  };




  getCategoryDetails = async (id) => {

    const config = {
      headers: {
        Authorization: 'Bearer ' + API_ENDPOINT.ACCESS_AUTH_TOKEN
      }
    }

    return await axios.get(BASE_URL_SERVER + API_ENDPOINT.GET_DETAILS + id, config);


  };

  updateCategory = async (data) => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + API_ENDPOINT.ACCESS_AUTH_TOKEN,
        "Content-Type": "application/json"
      }
    }
    return await axios.put(BASE_URL_SERVER + API_ENDPOINT.UPDATE_DETAILS, data, config);
  };


  createNew = async (data) => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + API_ENDPOINT.ACCESS_AUTH_TOKEN,
        "Content-Type": "application/json"
      }
    }
    return await axios.post(BASE_URL_SERVER + API_ENDPOINT.CREATE_NEW, data, config);
  };




  deleteCategory = async (id) => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + API_ENDPOINT.ACCESS_AUTH_TOKEN,
        "Content-Type": "application/json"
      }
    }
    return await axios.delete(BASE_URL_SERVER + API_ENDPOINT.DELETE + id, config);
  }

}

const categoryService = new CategoryService();
export default categoryService;

