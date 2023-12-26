import axios from './apiMock';

export const apiCall = async (path) => {
  try {
    const response = await axios.get(path);
    return response.data;
  } catch (error) {
    console.error(error);
    return;
  }
};