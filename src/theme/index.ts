import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {        
        white: string;
        red: string;
        purpleLight: string;
        purpleDark: string;
        black: string;
        grey: string;
        }
  }
}


export const colors = {
    white: '#FFFFFF',
    red: '#FF0000',
	purpleLight: '#C7D1F4',
	purpleDark: '#7786D2',
	black: '#374151',
    grey: '#E5E7EB'
}

export const theme: DefaultTheme = {
    colors: colors,
};