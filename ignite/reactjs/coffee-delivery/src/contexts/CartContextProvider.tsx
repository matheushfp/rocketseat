import { ReactNode, createContext, useEffect, useReducer } from 'react'
import { Item, Order, cartReducer } from '../reducers/cart/reducer'
import {
  addItemAction,
  checkoutAction,
  decrementItemQuantityAction,
  incrementItemQuantityAction,
  removeItemAction,
} from '../reducers/cart/actions'
import { OrderInfo } from '../pages/Checkout'
import { useNavigate } from 'react-router-dom'

interface CartContextData {
  cart: Item[]
  orders: Order[]
  addItem: (newItem: Item) => void
  removeItem: (itemId: Item['id']) => void
  incrementItemQuantity: (itemId: Item['id']) => void
  decrementItemQuantity: (itemId: Item['id']) => void
  checkout: (order: OrderInfo) => void
}

interface CartContextProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextData)

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartState, dispatch] = useReducer(
    cartReducer,
    {
      cart: [],
      orders: [],
    },
    (cartState) => {
      const storedState = localStorage.getItem('@coffee-delivery:cart-1.0.0')

      if (storedState) {
        return JSON.parse(storedState)
      }

      return cartState
    },
  )

  const { cart, orders } = cartState
  const navigate = useNavigate()

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

  function checkout(order: OrderInfo) {
    dispatch(checkoutAction(order, navigate))
  }

  useEffect(() => {
    if (cartState) {
      const stateJSON = JSON.stringify(cartState)

      localStorage.setItem('@coffee-delivery:cart-1.0.0', stateJSON)
    }
  }, [cartState])

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        addItem,
        removeItem,
        incrementItemQuantity,
        decrementItemQuantity,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
