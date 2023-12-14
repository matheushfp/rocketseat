import { produce } from 'immer'
import { Action, ActionTypes } from './actions'
import { OrderInfo } from '../../pages/Checkout'

export interface Item {
  id: number
  quantity: number
}

export interface Order extends OrderInfo {
  id: number
  items: Item[]
}

interface CartState {
  cart: Item[]
  orders: Order[]
}

export function cartReducer(state: CartState, action: Action) {
  switch (action.type) {
    case ActionTypes.ADD_ITEM: {
      return produce(state, (draft) => {
        const itemAlreadyExists = draft.cart.find(
          (item) => item.id === action.payload.newItem.id,
        )

        if (itemAlreadyExists) {
          itemAlreadyExists.quantity += action.payload.newItem.quantity
        } else {
          draft.cart.push(action.payload.newItem)
        }
      })
    }

    case ActionTypes.REMOVE_ITEM: {
      return produce(state, (draft) => {
        const itemToRemoveIdx = draft.cart.findIndex(
          (item) => item.id === action.payload.itemId,
        )
        draft.cart.splice(itemToRemoveIdx, 1)
      })
    }

    case ActionTypes.INCREMENT_ITEM_QUANTITY:
      return produce(state, (draft) => {
        const itemToIncrement = draft.cart.find(
          (item) => item.id === action.payload.itemId,
        )

        if (itemToIncrement?.id) {
          itemToIncrement.quantity += 1
        }
      })

    case ActionTypes.DECREMENT_ITEM_QUANTITY:
      return produce(state, (draft) => {
        const itemToDecrement = draft.cart.find(
          (item) => item.id === action.payload.itemId,
        )

        if (itemToDecrement?.id && itemToDecrement.quantity > 1) {
          itemToDecrement.quantity -= 1
        }
      })

    case ActionTypes.CHECKOUT:
      return produce(state, (draft) => {
        const newOrder = {
          id: new Date().getTime(),
          items: state.cart,
          ...action.payload.order,
        }
        draft.orders.push(newOrder)
        draft.cart = []

        action.payload.callback(`/order/${newOrder.id}/success`)
      })

    default:
      return state
  }
}
