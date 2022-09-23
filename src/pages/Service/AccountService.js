import axios from 'axios';
const BASE_URL_SERVER = 'https://accounts.metawayholdings.vn'


const API_ENDPOINT = {
  GET_LIST: "/api/v1/admin/account/",
  GET_DETAILS: "/api/v1/admin/account/",
  UPDATE_DETAILS: "/api/v1/admin/account/",
  CREATE_NEW: "/api/v1/admin/account/",
  DELETE: "/api/v1/admin/account/",


  ACCESS_AUTH_TOKEN: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1IiwiZmlyc3ROYW1lIjoiUGluZGlhcyIsImxhc3ROYW1lIjoiQWRtaW4iLCJyb2xlIjoiQURNSU4iLCJpc3MiOiJNZXRhd2F5aG9sZGluZ3MiLCJleHAiOjE2NjI2MDIyNzMsImVtYWlsIjoiZGFjYWRtaW5AZ21haWwuY29tIn0.IgFrQW742kZipGnEqKGXIwgUqPOHamd8sAUzUXhrn5o"
}



class AccountService {

  getAccountList = async (pageNumber) => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + API_ENDPOINT.ACCESS_AUTH_TOKEN
      },
      params: { page: pageNumber }
    }
    return await axios.get(BASE_URL_SERVER + API_ENDPOINT.GET_LIST, config);

  };

  getDetails = async (id) => {
    return await axios.get(
      BASE_URL_SERVER + API_ENDPOINT.GET_DETAILS + id
    );
  };

  updateDetails = async (id, data) => {
    return await axios.put(
      BASE_URL_SERVER + API_ENDPOINT.UPDATE_DETAILS + id,
      data,
    );
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
    return await axios.put(BASE_URL_SERVER + API_ENDPOINT.DELETE + "/" + id);
  }


}

const accountService = new AccountService();
export default accountService;

