import { StylesConfig } from 'react-select'
import { colors } from './theme'

export const responsiveFontSizeStyle = () => ({
    color: `${colors.purpleLight}`,
})

export const createRecordsStyles: StylesConfig = {
    container: (styles) => {
        return {
            ...styles,
            width: '100%',
        }
    },
    placeholder: (styles) => {
        return {
            ...styles,
            color: `${colors.purpleLight}`,
        }
    },
    control: (styles, state) => {
        return {
            ...styles,
            width: '100%',
            cursor: 'pointer',
            margin: '0',
            border: `1px solid ${colors.purpleDark}`,
            borderColor: state.isFocused ? `${colors.purpleDark}` : `${colors.purpleDark}`,
        }
    },
    clearIndicator: (styles) => {
        return {
            ...styles,
            ':hover': {
                filter: 'brightness(0.5)',
                cursor: 'pointer',
            },
            color: colors.purpleDark,
        }
    },
    singleValue: (styles, state) => {
        if (state.hasValue) {
            return {
                ...styles,
                color: colors.purpleDark,
            }
        } else {
            return {
                ...styles,
            }
        }
    },
    dropdownIndicator: (styles, state) => {
        return {
            ...styles,
            transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : '',
            transition: 'all 0.2s ease-in',
        }
    },
}
