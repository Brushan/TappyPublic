import {
  INCREMENT,
  DECREMENT,
  USER_TO_STATE,
  TAPS_TO_STATE,
  CLEAR_BASKET,
  REMOVE_PRODUCT,
  LOCATION_TO_STATE
} from "./types";

export const increment = (product) => ({
  type: INCREMENT,
  data: product,
});

export const decrement = (productId) => ({
  type: DECREMENT,
  data: productId,
});

export const removeProduct = (productId) => ({
  type: REMOVE_PRODUCT,
  data: productId,
});

export const clearBasket = () => ({
  type: CLEAR_BASKET,
});

export const userToState = (user) => ({
  type: USER_TO_STATE,
  data: user,
});

export const tapsToState = (taps) => ({
  type: TAPS_TO_STATE,
  data: taps,
});

export const locationToState = (location) => ({
  type: LOCATION_TO_STATE,
  data: location,
})
