'use strict'
import { InputsContaier } from './InputsStyles'
import { Text } from '../../stylesComponents'
import { getCities } from '../../services'
import { CityName } from '../../types'
import AsyncSelect from 'react-select/async'
import { createRecordsStyles } from '../../react-select-styles'
import { colors } from '../../theme'

function NewInput(props: any) {
  const { paramsState, handleChange, setNewInput, newInput } = props

  return (
        <InputsContaier>
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
                id={'intermediate'} 
                backspaceRemovesValue={false}
                loadOptions={(e) => 
                    getCities(e, paramsState.totalCities)
                    .then((res) => res)
                    .catch((err) => 
                    setNewInput((prevState: any) => ({ ...prevState, error: true, errorMsg: err.errorMsg }))
                    )
                }
                getOptionLabel={(xs: CityName) => xs.name}
                getOptionValue={(xs: CityName) => xs.name}
                onChange={(xs) => handleChange(xs, `intermediate${paramsState.totalParams + 1}`)}
                noOptionsMessage={(e) => 
                    e.inputValue.toLowerCase().includes('fail') ? null 
                    : e.inputValue.length > 0 ? 'No match found (cannot repeat cities)' 
                    : 'Start typing to search available cities'
                }
                onInputChange={() => (newInput.error && setNewInput((prevState: any) => ({ ...prevState, error: false, errorMsg: '' })))}
                loadingMessage={() => null}
                placeholder='City name'
                isClearable
                isDisabled={paramsState.origin.name === ''}
                styles={createRecordsStyles}
            />
            {
            newInput.error &&
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
                    {newInput.errorMsg}
                </Text>
            }
    </InputsContaier>
  )
}

export default NewInput
