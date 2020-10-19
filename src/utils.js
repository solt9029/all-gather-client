import axios from 'axios';

const baseURL = 'http://localhost:3000';

const client = axios.create({ baseURL });

export const createSchedule = (data) => {
  client.post('/schedules/create', data);
};
