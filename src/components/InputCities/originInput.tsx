'use strict'
import { InputsContaier } from './InputsStyles'
import { Text } from '../../stylesComponents'
import { getCities } from '../../services'
import { setValue } from '../../utils'
import { CityName } from '../../types'
import AsyncSelect from 'react-select/async'
import { createRecordsStyles } from '../../react-select-styles'
import { colors } from '../../theme'

function OriginInput(props: any) {
  const { paramsState, handleChange, setError } = props

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
            City of origin
        </Text>
          <AsyncSelect
            id='origin'
            value={paramsState.origin.name ? setValue(paramsState.origin) : undefined}
            backspaceRemovesValue={false}
            loadOptions={(e) => 
              getCities(e, paramsState.totalCities)
              .then((res) => res)
              .catch((err) => 
                setError({key: 'origin', name: paramsState.origin.name}, undefined, err))
            }
            onInputChange={() => (
              paramsState.origin.error && 
                setError({key: 'origin', name: paramsState.origin.name}, undefined, {errorMsg: '', error: false}))}
            getOptionLabel={(x: CityName) => x.name}
            getOptionValue={(x: CityName) => x.name}
            onChange={(x) => {handleChange(x, 'origin')}}
            noOptionsMessage={(e) => 
                                e.inputValue.toLowerCase().includes('fail') ? null
                                : e.inputValue.length > 0 ? 'No match found (cannot repeat cities)' 
                                : 'Start typing to search available cities'
                              }
            placeholder='City name'
            isClearable
            required
            label='City of origin'
            styles={createRecordsStyles}
          />
          {
            paramsState.origin.error &&
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
                {paramsState.origin.errorMsg}
              </Text>
          }
    </InputsContaier>
  )
}

export default OriginInput
