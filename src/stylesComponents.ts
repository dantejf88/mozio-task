import styled from "styled-components"

interface PropsText {
    fontSize: string
    lineHeight?: string
    letterSpacing: string
    padding: string
    color: string
    fontWeight?: string
    textAlign?: string
    margin?: string
    width?: string
}

export const Text = styled.p<PropsText>`
    margin: ${(props) => props.margin || 0};
    text-align: ${(props) => props.textAlign || 'center'};
    color: ${(props) => props.color};
    font-weight: ${(props) => props.fontWeight || 300};
    padding: ${(props) => props.padding || 0};
    letter-spacing: ${(props) => props.letterSpacing || 'unset'};
    font-size: ${(props) => props.fontSize};
    line-height: ${(props) => props.lineHeight || 'unset'};
    width: ${(props) => props.width || 'unset'};
`

export const Button = styled.button`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  gap: 4px;
  width: fit-content;
  height: 38px;
  background: ${props => props.theme.colors.black};
  border: 1px solid ${props => props.theme.colors.grey};
  color: ${props => props.theme.colors.white};
  border-radius: 4px;
  cursor: pointer;
  &:disabled {
    background: ${props => props.theme.colors.grey};
  }
  @media (max-width: ${(props) => props.theme.mediaQueryMobile}) {
    width: 100%;
  }
`