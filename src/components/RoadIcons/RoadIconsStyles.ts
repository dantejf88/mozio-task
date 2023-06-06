import styled from 'styled-components';

export const Ul = styled.ul`
    flex-direction: column;
    margin: 0;
    @media (max-width: ${(props) => props.theme.mediaQueryMobile}) {
    }
`

interface LiProp {
  urlImg: string
  final?: boolean
  newInput?: boolean
}

export const Li = styled.li<LiProp>`
    /* height: 100px;
    line-height: 100px; */
    list-style-image: ${props => `url(${props.urlImg})`};
    height: ${props => props.final ? '170px' : '100px'};
    line-height: ${props => props.final ? '170px' : '100px'};
    ${props => props.newInput && `
      height: 100px;
      line-height: 100px;
    `}
    &::marker {
        color: ${props => props.theme.colors.purpleDark};
    }
    @media (max-width: ${(props) => props.theme.mediaQueryMobile}) {
      flex-direction: column;
    }
`