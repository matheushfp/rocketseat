import { NavLink } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import { CartItemsCounter, CityLocation, NavContainer } from './styles'
import { Button } from '../Button'
import { MapPin } from '@phosphor-icons/react'
import { useCart } from '../../hooks/useCart'

interface StyleObject {
  visibility: 'visible' | 'hidden'
}

export function Header() {
  const { cart } = useCart()

  const cartItems = cart.length

  let style: StyleObject
  if (cartItems) {
    style = { visibility: 'visible' }
  } else {
    style = { visibility: 'hidden' }
  }

  return (
    <header>
      <NavContainer>
        <NavLink to={'/'}>
          <img src={logo} alt="" />
        </NavLink>

        <div>
          <CityLocation>
            <MapPin size={22} weight="fill" />
            São Paulo, SP
          </CityLocation>
          <NavLink to={'/checkout'} style={{ textDecoration: 'none' }}>
            <Button iconColor="orange" background="yellow" />
            <CartItemsCounter style={style}>
              <span>{cart.length > 0 ? cart.length : null}</span>
            </CartItemsCounter>
          </NavLink>
        </div>
      </NavContainer>
    </header>
  )
}
