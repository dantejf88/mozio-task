import styled from 'styled-components'

export const Container = styled.div`
    padding: 100px 20px 20px 20px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    /* overflow-y: scroll; */
    @media (max-width: ${(props) => props.theme.mediaQueryMobile}) {
      flex-direction: column;
      padding: 80px 20px 20px 20px;
    }
`

export const InputsContaier = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 100%;
    width: 450px;
    @media (max-width: ${(props) => props.theme.mediaQueryMobile}) {
      width: 100%;
    }
`

export const DataContaier = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    height: 100%;
    flex-direction: column;
    padding: 0 0 0 80px;
    @media (max-width: ${(props) => props.theme.mediaQueryMobile}) {
    }
`
