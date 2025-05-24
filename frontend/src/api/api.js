import axios from 'axios';

const API_BASE_URL = 'https://assessment-gpt.onrender.com/api';

export const getQuestions = (topic, count) => axios.post(`${API_BASE_URL}/questions/get-questions`, { topic, count }).then(res => res.data.questions);