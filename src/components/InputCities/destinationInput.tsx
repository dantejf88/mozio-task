'use strict'
import { InputsContaier } from './InputsStyles'
import { Text } from '../../stylesComponents'
import { getCities } from '../../services'
import { CityName } from '../../types'
import AsyncSelect from 'react-select/async'
import { createRecordsStyles } from '../../react-select-styles'
import { colors } from '../../theme'

function DestinationInput(props: any) {
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
            Final destination
          </Text>
        <AsyncSelect
          id='destination'
          value={paramsState.destination.name ? paramsState.destination : null}
          backspaceRemovesValue={false}
          loadOptions={(e) => 
            getCities(e, paramsState.totalCities)
            .then((res) => res)
            .catch((err) => setError({key: 'destination', name: paramsState.origin.name}, undefined, err))
          }
          onInputChange={() => (paramsState.destination.error && setError({key: 'destination', name: paramsState.destination.name}, undefined, {errorMsg: '', error: false}))}
          getOptionLabel={(x: CityName) => x.name}
          getOptionValue={(x: CityName) => x.name}
          onChange={(x) => handleChange(x, 'destination')}
          noOptionsMessage={(e) => 
            e.inputValue.toLowerCase().includes('fail') ? null 
            : e.inputValue.length > 0 ? 'No match found (cannot repeat cities)' 
            : 'Start typing to search available cities'
          }
          loadingMessage={() => null}
          placeholder='City name'
          isClearable
          isDisabled={paramsState.origin.name === ''}
          required
          styles={createRecordsStyles as any}
        />
        {
          paramsState.destination.error &&
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
              {paramsState.destination.errorMsg}
            </Text>
        }
    </InputsContaier>
  )
}

export default DestinationInput
