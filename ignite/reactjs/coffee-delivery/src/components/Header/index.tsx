import { NavLink } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import { CityLocation, NavContainer } from './styles'
import { Button } from '../Button'
import { MapPin } from '@phosphor-icons/react'

export function Header() {
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
          <NavLink to={'/checkout'}>
            <Button iconColor="orange" background="yellow" />
          </NavLink>
        </div>
      </NavContainer>
    </header>
  )
}
