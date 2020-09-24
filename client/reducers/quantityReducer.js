import {
  INCREMENT,
  DECREMENT,
  CLEAR_BASKET,
  REMOVE_PRODUCT,
} from "../actions/types";

const initState = {
  basket: [],
};

const quantityReducer = (state = initState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        basket: state.basket.concat({
          item: action.data.item,
          itemId: action.data.itemId,
          vendorName: action.data.vendorName,
          vendorAddress: action.data.vendorAddress,
          purchaseId: action.data.purchaseId,
          price: action.data.price,
          userId: action.data.userId,
          fullName: action.data.fullName,
          date: action.data.date,
          sent: action.data.sent,
          isRedeemed: action.data.isRedeemed,
          type: action.data.type,
          sentTo: action.data.sentTo,
          redeemedStyle: action.data.redeemedStyle,
          basketId: action.data.basketId,
          isPaid: action.data.isPaid,
        }),
      };
    case DECREMENT:
      const object = state.basket.find(
        (product) => product.itemId === action.data
      );
      if (object) {
        return {
          ...state,
          basket: state.basket.filter((obj) => obj !== object),
        };
      }
      return state;
    case REMOVE_PRODUCT:
      return {
        ...state,
        basket: state.basket.filter((obj) => obj.itemId !== action.data),
      };
    case CLEAR_BASKET:
      return initState;
    default:
      return state;
  }
};

export default quantityReducer;
