import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '31882982-4157c5a40df977384753c9618';

const searchParams = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
});

export default async function getImagesApi(searchQuery, page, perPage = 12) {
  const { data } = await axios.get(
    `?q=${searchQuery}&page=${page}&key=${API_KEY}&${searchParams}&per_page=${perPage}`
  );
  return data;
}
