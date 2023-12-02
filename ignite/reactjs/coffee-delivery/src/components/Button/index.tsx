import { ShoppingCart } from '@phosphor-icons/react'
import { CartButton } from './styles'

interface ButtonProps {
  iconColor: 'white' | 'orange'
  background: 'yellow' | 'purple'
}

export function Button({ iconColor, background }: ButtonProps) {
  return (
    <CartButton $background={background}>
      <ShoppingCart
        size={22}
        weight="fill"
        color={iconColor === 'white' ? '#F3F2F2' : '#C47F17'}
      />
    </CartButton>
  )
}
