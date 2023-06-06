import styled from 'styled-components';

export const Ul = styled.ul`
    flex-direction: column;
    margin: 0;
`

interface LiProp {
  urlImg: string
  final?: boolean
  newInput?: boolean
}

export const Li = styled.li<LiProp>`
    list-style-image: ${props => `url(${props.urlImg})`};
    height: ${props => props.final ? '170px' : '55px'};
    line-height: ${props => props.final ? '170px' : '55px'};
    margin-top: ${props => props.final ? '0' : '45px'};
    ${props => props.newInput && `
      height: 100px;
      line-height: 100px;
      margin-top: 0;
    `}
    &::marker {
        color: ${props => props.theme.colors.purpleDark};
    }
    @media (max-width: ${(props) => props.theme.mediaQueryMobile}) {
      flex-direction: column;
      height: ${props => props.final ? '170px' : '55px'};
      line-height: ${props => props.final ? '170px' : '45px'};
      ${props => props.newInput && `
        height: 100px;
        line-height: 100px;
      `}
    }
`