import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
${reset}
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap');

    * {
        box-sizing: border-box;
        font-family: 'Noto Sans', sans-serif !important;
    }

    html, body, #root {
        height: 100%;
    }

    button {
        border: none;
        cursor: pointer;
        background-color: transparent;
    }

    input {
        border: none;
        background-color: inherit;
    }

    input:focus {
        outline: none;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    .ir {
        position: absolute;
        left: -10000px;
        top: auto;
        width: 1px;
        height: 1px;
        overflow: hidden;
    }
`;
