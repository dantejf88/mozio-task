import styled from 'styled-components'


export const Container = styled.section`
    padding: 100px 20px 20px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    overflow-y: scroll;
    @media (max-width: ${(props) => props.theme.mediaQueryMobile}) {
      padding: 80px 20px 20px 20px;
      flex-direction: column;
    }
`

export const Ul = styled.ul`
    display: flex;
    flex-direction: column;
`

interface LiProp {
  urlImg: string
}

export const Li = styled.li<LiProp>`
    height: 44px;
    list-style-image: ${props => `url(${props.urlImg})`};
    &::marker {
        color: ${props => props.theme.colors.purpleDark};
    }
    @media (max-width: ${(props) => props.theme.mediaQueryMobile}) {
      flex-direction: column;
    }
`