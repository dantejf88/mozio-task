import styled from 'styled-components'


export const Container = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center; 
`

export const Ul = styled.ul`
    display: flex;
    flex-direction: column;
    @media (max-width: ${(props) => props.theme.mediaQueryMobile}) {
    }
`

interface LiProp {
  urlImg: string
}

export const Li = styled.li<LiProp>`
    /* display: flex; */
    height: 44px;
    list-style-image: ${props => `url(${props.urlImg})`};
    &::marker {
        color: ${props => props.theme.colors.purpleDark};
    }
    @media (max-width: ${(props) => props.theme.mediaQueryMobile}) {
      flex-direction: column;
    }
`