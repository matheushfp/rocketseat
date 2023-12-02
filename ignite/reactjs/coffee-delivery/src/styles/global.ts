import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    :focus {
        outline: 0;
        box-shadow: 0 0 0 2px ${(props) => props.theme['yellow-dark']};
    }

    body {
        background: ${(props) => props.theme.background};
        color: ${(props) => props.theme['base-text']};
        line-height: 1.3;
        -webkit-font-smoothing: antialiased;

        padding: 0 10rem;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    body, input, textarea, button {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 1rem;
    }

    h1 {
        font-family: 'Baloo 2', sans-serif;
        font-weight: 800;
        font-size: 3rem;
        line-height: 1.3;
        color: ${(props) => props.theme['base-title']};
    }

    h2 {
        font-family: 'Baloo 2', sans-serif;
        font-weight: 800;
        font-size: 2rem;
        line-height: 1.3;
        color: ${(props) => props.theme['base-subtitle']};
    }
`
