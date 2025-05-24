import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const getQuestions = (topic, count) => axios.post(`${API_BASE_URL}/questions/get-questions`, { topic, count }).then(res => res.data.questions);