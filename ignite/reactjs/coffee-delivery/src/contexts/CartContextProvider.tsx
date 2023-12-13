import { ReactNode, createContext, useReducer } from 'react'
import { Item, cartReducer } from '../reducers/cart/reducer'
import {
  addItemAction,
  decrementItemQuantityAction,
  incrementItemQuantityAction,
  removeItemAction,
} from '../reducers/cart/actions'

interface CartContextData {
  cart: Item[]
  addItem: (newItem: Item) => void
  removeItem: (itemId: Item['id']) => void
  incrementItemQuantity: (itemId: Item['id']) => void
  decrementItemQuantity: (itemId: Item['id']) => void
}

interface CartContextProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextData)

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartState, dispatch] = useReducer(cartReducer, {
    cart: [],
  })

  const { cart } = cartState

  function addItem(newItem: Item) {
    dispatch(addItemAction(newItem))
  }

  function removeItem(itemId: Item['id']) {
    dispatch(removeItemAction(itemId))
  }

  function incrementItemQuantity(itemId: Item['id']) {
    dispatch(incrementItemQuantityAction(itemId))
  }

  function decrementItemQuantity(itemId: Item['id']) {
    dispatch(decrementItemQuantityAction(itemId))
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        incrementItemQuantity,
        decrementItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
