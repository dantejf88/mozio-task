import styled from 'styled-components';

export const HandleContainer = styled.div`
    width: 21px;
    height: 21px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${(props) => props.theme.colors.purpleLight};
    border-radius: 4px;
    line-height: 0;
    cursor: pointer;
    color: ${(props) => props.theme.colors.white};
    &:hover {
      background: ${(props) => props.theme.colors.purpleDark};
    }
    @media (max-width: ${(props) => props.theme.mediaQueryMobile}) {
      flex-direction: row;
    }
`