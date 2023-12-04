import styled from 'styled-components'

export const Card = styled.div`
  height: 19.375rem;
  width: 16rem;

  background: ${(props) => props.theme['base-card']};

  border-top-left-radius: 8px;
  border-top-right-radius: 50px;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 8px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  padding-left: 0 1.25rem;

  img {
    margin-top: -2rem;
  }

  h3 {
    font-family: 'Baloo 2', sans-serif;
    font-weight: 700;
    font-size: 1.25rem;
    color: ${(props) => props.theme['base-subtitle']};
  }

  p {
    font-size: 0.875rem;
    color: ${(props) => props.theme['base-label']};
  }
`

export const TagContainer = styled.span`
  background: ${(props) => props.theme['yellow-light']};
  color: ${(props) => props.theme['yellow-dark']};
  font-size: 0.625rem;
  font-weight: 700;
  border-radius: 100px;

  padding: 0.25rem 0.5rem;
`

export const BuyContainer = styled.div`
  color: ${(props) => props.theme['base-text']};
  width: 80%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
`

export const PriceContainer = styled.div`
  display: flex;
  align-items: center;

  color: ${(props) => props.theme['base-text']};
  font-size: 0.875rem;

  strong {
    font-family: 'Baloo 2', sans-serif;
    font-size: 1.5rem;
    font-weight: 800;

    margin-left: 0.25rem;
    margin-right: 1.4375rem;
    margin-bottom: 0.15rem;
  }
`

export const CounterContainer = styled.div`
  background: ${(props) => props.theme['base-button']};
  color: ${(props) => props.theme['base-title']};

  border-radius: 6px;

  padding: 0.75rem 0.5rem;

  min-width: 4.5rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  button {
    outline: none;
    border: none;
    background: transparent;

    cursor: pointer;
  }
`
