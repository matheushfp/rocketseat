import styled from 'styled-components'

export const IntroContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 3.5rem;

  padding: 5.875rem 0 6.75rem;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;

    margin-top: -4rem;
    margin-bottom: -4rem;

    img {
      width: 25rem;
    }
  }
`

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  span {
    color: ${(props) => props.theme['base-subtitle']};
    font-size: 1.25rem;
  }

  @media (max-width: 768px) {
    span {
      br {
        display: none;
      }
    }
  }
`

export const ItemsContainer = styled.div`
  margin-top: 4.125rem;
  font-size: 1rem;

  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    row-gap: 1.25rem;

    list-style-type: none;
  }

  li {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
`

const BACKGROUND_COLORS = {
  yellow: 'yellow',
  orange: 'yellow-dark',
  base: 'base-text',
  purple: 'purple',
}

interface IconContainerProps {
  $background: keyof typeof BACKGROUND_COLORS
}

export const IconContainer = styled.div<IconContainerProps>`
  background: ${(props) => props.theme[BACKGROUND_COLORS[props.$background]]};
  height: 2rem;
  width: 2rem;
  border-radius: 999px;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const CoffeeList = styled.div`
  margin-top: 4rem;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 2.5rem;
  column-gap: 2rem;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`
