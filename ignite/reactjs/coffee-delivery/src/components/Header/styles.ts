import styled from 'styled-components'

export const NavContainer = styled.header`
  display: flex;
  justify-content: space-between;

  height: 6.5rem;

  padding: 2rem 0;

  div {
    display: flex;
    gap: 0.75rem;
  }
`

export const CityLocation = styled.div`
  background: ${(props) => props.theme['purple-light']};
  color: ${(props) => props.theme.purple};

  height: 2.375rem;
  width: max-content;

  border-radius: 6px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;

  padding: 0.5rem;
`

export const CartItemsCounter = styled.div`
  background: ${(props) => props.theme['yellow-dark']};
  color: ${(props) => props.theme.white};

  border-radius: 999px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: -3.3rem;
  margin-left: 1.7rem;

  font-size: 0.875rem;

  span {
    padding: 0.25rem 0.6rem;
    margin-top: 0.2rem;
  }
`
