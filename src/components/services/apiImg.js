import axios from 'axios';

axios.defaults.baseURL =
  'https://pixabay.com/api/?key=34706301-fa7c25ab6ec07e5fc9fe6ac6d&image_type=photo&orientation=horizontal';

async function fetchPictures(name, page) {
  try {
    const response = await axios.get(`&per_page=12&page=${page}&q=${name}`);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}

const api = {
  fetchPictures,
};

export default api;
