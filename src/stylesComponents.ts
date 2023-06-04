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