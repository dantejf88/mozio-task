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
`

interface LiProp {
  urlImg: string
}

export const Li = styled.li<LiProp>`
    position: relative;
    height: 70px;
    width: 140px;
    list-style-image: ${props => `url(${props.urlImg})`};
    &::marker {
      color: ${props => props.theme.colors.purpleDark};
    }
    > p {
        top: 0;
        position: absolute;
    }
    @media (max-width: ${(props) => props.theme.mediaQueryMobile}) {
      
    }
`