import axios from 'axios';

const baseURL = 'http://localhost:3000';

const client = axios.create({ baseURL });

export const createSchedule = (data) => {
  console.log(data.dates);
  client.post('/schedules', data);
};
