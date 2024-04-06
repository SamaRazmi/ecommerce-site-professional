//this function accept an error object
export const getError = (error) => {
  return error.response && error.response.data.message
    ? error.response.data.message //if the erorr data exists from server.js
    : //then return this data from backend
      //else return general error message from the error object
      error.message;
};
