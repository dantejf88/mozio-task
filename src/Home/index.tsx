'use strict'
import { useState, useEffect, Fragment } from 'react'
import { Container, DestinationInputContaier } from './homeStyles'
import debounce from 'debounce-promise'
import { Text } from '../stylesComponents'
import { getDistances, getCities } from '../services'
import { distanceCalculator, distanceMaker, citiesList, setValue } from '../utils'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { City, CityName, CityParamState } from '../types'
import AsyncSelect from 'react-select/async'
import { createRecordsStyles } from '../react-select-styles'
import { colors } from '../theme'

function App() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [paramsState, setParamsState] = useState<{origin: CityParamState, intermediate: CityParamState[], destination: CityParamState, totalParams: number, totalCities: CityName[]}>({
    origin: {name: '', errorMsg: '', error: false},
    intermediate: [],
    totalParams: 0,
    totalCities: [],
    destination: {name: '', errorMsg: '', error: false}
  })
  const [showNewInput, setShowNewInput] = useState<boolean>(false)

  useEffect(() => {
    console.log(paramsState)
  }, [paramsState])

  useEffect(() => {
    const listCities: CityName[] = []
    const intermediateList: CityParamState[] = []
    for (const entry of searchParams.entries()) {
      if(entry[1] !== '') listCities.push({ name: entry[1] })
      if(entry[0] === 'origin') {
        setParamsState(prevState => ({
          ...prevState,
          origin: {
            name: entry[1],
            errorMsg: entry[1] === '' ? 'You must choose the city of origin' : '',
            error: entry[1] === ''
          },
        }))
      }
      if(entry[0] === 'destination') {
        setParamsState(prevState => ({
          ...prevState,
          destination: {
            name: entry[1],
            errorMsg: entry[1] === '' ? 'You must choose the final city destination' : '',
            error: entry[1] === ''
          },
        }))
      } else if(entry[0] !== 'origin' && entry[0] !== 'destination') {
        intermediateList.push({ 
          key: entry[0], 
          name: entry[1],
          errorMsg: '',
          error: false
        })
      }
    }
    setParamsState(prevState => ({
      ...prevState,
      totalParams: intermediateList.length,
      totalCities: listCities,
      intermediate: intermediateList.filter((x) => x.name !== '')
    }))
    setShowNewInput(false)
  }, [searchParams])

  const handleChange = (e: CityName, name: string) => {
    const paramValue = !e ? '' : e.name
    searchParams.set(name, paramValue);
    setSearchParams(searchParams)
  }

  const setError = (element: any, index: number | undefined, err: any) => {
    if(index !== undefined) {
      const helper = paramsState.intermediate
      helper[index] = {
        key: element.key,
        name: element.name,
        errorMsg: err.errorMsg,
        error: err.status === 500
      }  
      setParamsState(prevState => ({
        ...prevState,
        intermediate: helper
      }))
    } else {
      setParamsState(prevState => ({
        ...prevState,
        [element.key]: {
          name: element.name,
          errorMsg: err.errorMsg,
          error: err.status === 500
        },
      }))
    }
  }

  const onSubmit = () => {
    console.log(paramsState)
  }

  // const clearForm = () => {
  //   setSearchParams('')
  //   setParamsState({
  //     origin: {name: '', errorMsg: '', error: false},
  //     intermediate: [],
  //     totalParams: 0,
  //     totalCities: [],
  //     destination: {name: '', errorMsg: '', error: false}
  //   })
  // }

  return (
    <Container>
      <DestinationInputContaier>
        <Text
          fontSize="12px"
          lineHeight="16px"
          letterSpacing="0px"
          padding="10px 0 5px 0"
          fontWeight="500"
          color={colors.black}
          textAlign='left'
          width='100%'
        >City of origin</Text>
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
      </DestinationInputContaier>
          {
            paramsState.intermediate.map((x, i) => {
                return (
                <DestinationInputContaier key={i}>
                  <Text
                    fontSize="12px"
                    lineHeight="16px"
                    letterSpacing="0px"
                    padding="10px 0 5px 0"
                    fontWeight="500"
                    color={colors.black}
                    textAlign='left'
                    width='100%'
                  >City of destination</Text>
                  <AsyncSelect
                    id={`${x.name}`} 
                    value={paramsState.intermediate[i]?.name ? setValue(paramsState.intermediate[i]) : undefined}
                    backspaceRemovesValue={false}
                    loadOptions={(e) => 
                      getCities(e, paramsState.totalCities)
                      .then((res) => res)
                      .catch((err) => 
                        setError(x, i, err)
                      )
                    }
                    getOptionLabel={(xs: CityName) => xs.name}
                    getOptionValue={(xs: CityName) => xs.name}
                    onChange={(xs) => handleChange(xs, `${x.key}`)}
                    noOptionsMessage={(e) => 
                      e.inputValue.toLowerCase().includes('fail') ? null 
                      : e.inputValue.length > 0 ? 'No match found (cannot repeat cities)' 
                      : 'Start typing to search available cities'
                    }
                    onInputChange={() => (x.error && setError(x, i, {errorMsg: '', error: false}))}
                    loadingMessage={() => null}
                    placeholder='City name'
                    isClearable
                    isDisabled={paramsState.origin.name === ''}
                    styles={createRecordsStyles}
                  />
                  {
                    x.error &&
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
                        {x.errorMsg}
                      </Text>
                  }
                </DestinationInputContaier>
                )
            })
          }
          {
            showNewInput ? (
              <DestinationInputContaier>
                  <Text
                    fontSize="12px"
                    lineHeight="16px"
                    letterSpacing="0px"
                    padding="10px 0 5px 0"
                    fontWeight="500"
                    color={colors.black}
                    textAlign='left'
                    width='100%'
                  >City of destination</Text>
                  <AsyncSelect
                    id={'intermediate'} 
                    backspaceRemovesValue={false}
                    loadOptions={(e) => getCities(e, paramsState.totalCities)}
                    getOptionLabel={(xs: CityName) => xs.name}
                    getOptionValue={(xs: CityName) => xs.name}
                    onChange={(xs) => handleChange(xs, `intermediate${paramsState.totalParams + 1}`)}
                    noOptionsMessage={(e) => e.inputValue.length > 0 ?  'No match found (cannot repeat cities)' : 'Start typing to search available cities'}
                    loadingMessage={() => null}
                    placeholder='City name'
                    isClearable
                    isDisabled={paramsState.origin.name === ''}
                    styles={createRecordsStyles}
                  />
                </DestinationInputContaier>
            ) : 
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '20px' }}>
                {
                  paramsState.origin.name !== '' && 
                    <button onClick={() => setShowNewInput(true)}>Add intermediate</button>
                }
              </div>
          }
            <DestinationInputContaier>
                <Text
                    fontSize="12px"
                    lineHeight="16px"
                    letterSpacing="0px"
                    padding="10px 0 5px 0"
                    fontWeight="500"
                    color={colors.black}
                    textAlign='left'
                    width='100%'
                  >Final destination</Text>
                <AsyncSelect
                  id='destination'
                  value={paramsState.destination.name ? setValue(paramsState.destination) : undefined}
                  // value={params.filter((x) => x.key === 'destination')[0]?.key ? setValue(params.filter((x) => x.key === 'destination')[0]) : undefined}
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
                  onError={(e) => console.log(e)}
                  isDisabled={paramsState.origin.name === ''}
                  required
                  styles={createRecordsStyles}
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
            </DestinationInputContaier>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', margin: '20px 0' }}>
                  <button onClick={onSubmit} disabled={paramsState.origin.name === '' || paramsState.destination.name === ''} >Submit</button>     
                </div>
                {/* <div style={{ display: 'flex', justifyContent: 'center', width: '100%', margin: '20px 0' }}>
                  <button onClick={clearForm} disabled={!paramsState.totalCities.length} >Clear form</button>     
                </div> */}
      <a href={`/result`}>Result</a>
    </Container>
  )
}

export default App
