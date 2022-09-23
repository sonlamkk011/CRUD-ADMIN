import axios from 'axios';
const BASE_URL_SERVER = 'http://13.213.7.133'


const API_ENDPOINT = {
  GET_LIST: "/api/admin/v1/orders",
  GET_DETAILS: "/api/admin/v1/orders/",
  UPDATE_DETAILS: "/api/admin/v1/orders",
  // CREATE_NEW: "/api/v1/orders",
  DELETE: "/api/admin/v1/orders/",

  ACCESS_AUTH_TOKEN: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1IiwiZmlyc3ROYW1lIjoiUGluZGlhcyIsImxhc3ROYW1lIjoiQWRtaW4iLCJyb2xlIjoiQURNSU4iLCJpc3MiOiJNZXRhd2F5aG9sZGluZ3MiLCJleHAiOjE2NjI2MDIyNzMsImVtYWlsIjoiZGFjYWRtaW5AZ21haWwuY29tIn0.IgFrQW742kZipGnEqKGXIwgUqPOHamd8sAUzUXhrn5o"
}



class OrderService {


  getOrderList = async (pageNumber) => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + API_ENDPOINT.ACCESS_AUTH_TOKEN,
        "Content-Type": "application/json",
      },
      params: { page: pageNumber }
    }
    return await axios.get(BASE_URL_SERVER + API_ENDPOINT.GET_LIST, config);
  };




  getOrderDetails = async (id) => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + API_ENDPOINT.ACCESS_AUTH_TOKEN
      }
    }

    return await axios.get(BASE_URL_SERVER + API_ENDPOINT.GET_DETAILS + id, config);
  };

  updateDetails = async (id, data) => {
    return await axios.put(
      BASE_URL_SERVER + API_ENDPOINT.UPDATE_DETAILS + id,
      data,
    );
  };


  deleteFood = async (id) => {
    return await axios.put(BASE_URL_SERVER + API_ENDPOINT.DELETE + "/" + id);
  }


}

const orderService = new OrderService();
export default orderService;

