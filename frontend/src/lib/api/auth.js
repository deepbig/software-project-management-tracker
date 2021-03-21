import client from './client';

export const register = ({ username, password }) => client.post('/auth/signup', { username, password });

export const login = ({ username, password, type }) => client.post(`/auth/signin/${type}`, { username, password });

export const check = () => client.get('/auth/check');

export const logout = () => client.post('/auth/logout');

export const password = ({ update }) => client.post('/auth/updatePassword', { update });