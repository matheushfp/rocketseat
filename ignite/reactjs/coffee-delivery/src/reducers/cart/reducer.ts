import { produce } from 'immer'
import { Action, ActionTypes } from './actions'

export interface Item {
  id: number
  quantity: number
}

interface CartState {
  cart: Item[]
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

    default:
      return state
  }
}
