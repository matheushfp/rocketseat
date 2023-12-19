import { Coffee, Package, ShoppingCart, Timer } from '@phosphor-icons/react'
import intro from '../../assets/intro.svg'
import {
  CoffeeList,
  IconContainer,
  IntroContainer,
  ItemsContainer,
  TitleContainer,
} from './styles'
import { CoffeeCard } from './components/CoffeeCard'

import coffees from '../../coffees'

export function Home() {
  return (
    <>
      <IntroContainer>
        <div>
          <TitleContainer>
            <h1>
              Encontre o café perfeito
              <br />
              para qualquer hora do dia
            </h1>
            <span>
              Com o Coffee Delivery você recebe seu café onde estiver, a <br />
              qualquer hora
            </span>
          </TitleContainer>

          <ItemsContainer>
            <ul>
              <li>
                <IconContainer $background="orange">
                  <ShoppingCart weight="fill" color="#FAFAFA" />
                </IconContainer>
                Compra simples e segura
              </li>
              <li>
                <IconContainer $background="base">
                  <Package weight="fill" color="#FAFAFA" />
                </IconContainer>
                Embalagem mantém o café intacto
              </li>
              <li>
                <IconContainer $background="yellow">
                  <Timer weight="fill" color="#FAFAFA" />
                </IconContainer>
                Entrega rápida e rastreada
              </li>
              <li>
                <IconContainer $background="purple">
                  <Coffee weight="fill" color="#FAFAFA" />
                </IconContainer>
                O café chega fresquinho até você
              </li>
            </ul>
          </ItemsContainer>
        </div>

        <img src={intro} alt="" />
      </IntroContainer>

      <main>
        <h2>Nossos Cafés</h2>
        <CoffeeList>
          {coffees.map((coffee) => (
            <CoffeeCard
              key={coffee.id}
              id={coffee.id}
              title={coffee.title}
              description={coffee.description}
              tags={coffee.tags}
              img={coffee.img}
              price={coffee.price}
            />
          ))}
        </CoffeeList>
      </main>
    </>
  )
}
