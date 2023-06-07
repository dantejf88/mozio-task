'use strict'
import { InputsContaier } from './InputsStyles'
import { Text } from '../../stylesComponents'
import { getCities } from '../../services'
import { CityName } from '../../types'
import AsyncSelect from 'react-select/async'
import { createRecordsStyles } from '../../react-select-styles'
import { colors } from '../../theme'

function IntermediateInput(props: any) {
  const { paramsState, handleChange, setError, element, index } = props

  return (
    <InputsContaier key={index}>
        <Text
        fontSize="12px"
        lineHeight="16px"
        letterSpacing="0px"
        padding="10px 0 5px 0"
        fontWeight="500"
        color={colors.black}
        textAlign='left'
        width='100%'
        >
            City of destination
        </Text>
        <AsyncSelect
        id={`${element.name}`} 
        value={paramsState.intermediate[index]?.name ? paramsState.intermediate[index] : undefined}
        backspaceRemovesValue={false}
        loadOptions={(e) => 
            getCities(e, paramsState.totalCities)
            .then((res) => res)
            .catch((err) => 
            setError(element, index, err)
            )
        }
        getOptionLabel={(xs: CityName) => xs.name}
        getOptionValue={(xs: CityName) => xs.name}
        onChange={(xs) => handleChange(xs, `${element.key}`)}
        noOptionsMessage={(e) => 
            e.inputValue.toLowerCase().includes('fail') ? null 
            : e.inputValue.length > 0 ? 'No match found (cannot repeat cities)' 
            : 'Start typing to search available cities'
        }
        onInputChange={() => (element.error && setError(element, index, {errorMsg: '', error: false}))}
        loadingMessage={() => null}
        placeholder='City name'
        isClearable
        isDisabled={paramsState.origin.name === ''}
        styles={createRecordsStyles as any}
        />
        {
        element.error &&
            <Text
            fontSize="12px"
            lineHeight="16px"
            letterSpacing="0px"
            padding="10px 0 5px 0"
            fontWeight="500"
            color={colors.red}
            textAlign='left'
            width='100%'
            >
            {element.errorMsg}
            </Text>
        }
    </InputsContaier>
  )
}

export default IntermediateInput
