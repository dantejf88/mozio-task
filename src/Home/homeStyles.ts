import styled from 'styled-components'

export const Container = styled.div`
    padding: 100px 20px 20px 20px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    @media (max-width: ${(props) => props.theme.mediaQueryMobile}) {
      flex-direction: column;
      padding: 80px 0px 20px 0px;
    }
`

interface DynamicContainerProp {
  widthDesktop: string
  widthMobile: string
}

export const DynamicContainer = styled.div<DynamicContainerProp>`
    display: flex;
    width: ${(props) => props.widthDesktop};
    flex-direction: column;
    @media (max-width: ${(props) => props.theme.mediaQueryMobile}) {
      width: ${(props) => props.widthDesktop};
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
      width: 100%;
      padding: 0;
      align-items: center;
    }
`
