import * as t from '../types';

// functions to call redux
export const setCategory = (category) => ({
  type: t.SET_CATEGORY,
  payload: category
})

export const setUser = (user) => ({
  type: t.SET_USER,
  payload: user
})

export const saveUsers = (users) => ({
  type: t.SAVE_USER,
  payload: users
})
