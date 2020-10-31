import axios from 'axios';

const baseURL = 'http://localhost:3000';

export const client = axios.create({ baseURL });

export const createSchedule = async (data) => {
  return client.post('/schedules', data);
};

export const fetchSchedule = async (id) => {
  return client.get(`/schedules/${id}`);
};
