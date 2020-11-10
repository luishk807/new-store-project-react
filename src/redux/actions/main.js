import * as t from '../types';

// functions to call redux
export const setCategories = (data) => ({
  type: t.SET_CATEGORIES,
  payload: data
})

export const resetUser = (data) => ({
  type: t.RESET_USER,
  payload: data,
})

export const setBrands = (data) => ({
  type: t.SET_BRANDS,
  payload: data
})

export const setVendors = (data) => ({
  type: t.SET_VENDORS,
  payload: data
})

export const setProducts = (data) => ({
  type: t.SET_PRODUCTS,
  payload: data
})

export const setIcons = (data) => ({
  type: t.SET_ICONS,
  payload: data
})

export const setUsers = (data) => ({
  type: t.SET_USERS,
  payload: data
})

export const setUser = (data) => ({
  type: t.SET_USER,
  payload: data
})


export const setCountries = (data) => ({
  type: t.SET_COUNTRIES,
  payload: data
})

export const setGenders = (data) => ({
  type: t.SET_GENDERS,
  payload: data
})

export const setWorkRoles = (data) => ({
  type: t.SET_WORK_ROLES,
  payload: data
})


export const saveUsers = (data) => ({
  type: t.SAVE_USER,
  payload: data
})

export const addCart = (data) => ({
  type: t.ADD_CART,
  payload: data
})

export const deleteCart = (data) => ({
  type: t.DELETE_CART,
  payload: data
})

export const updateCart = (data) => ({
  type: t.UPDATE_CART,
  payload: data
})
