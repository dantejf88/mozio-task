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
  const [params, setParams] = useState<{key: string, name: string, errorMsg: string, error: boolean}[] | []>([])
  const [paramsState, setParamsState] = useState<{origin: CityParamState, intermediate: CityParamState[], destination: CityParamState}>({
    origin: {name: '', errorMsg: '', error: false},
    intermediate: [],
    destination: {name: '', errorMsg: '', error: false}
  })
  const [citiesState, setCityState] = useState<{origin: boolean, destination: boolean}>({origin: false, destination: false})
  const [showNewInput, setShowNewInput] = useState<boolean>(false)

  useEffect(() => {
    console.log(paramsState)
  }, [paramsState])

  useEffect(() => {
    const listParams = []
    const intermediateList: CityParamState[] = []
    for (const entry of searchParams.entries()) {
      console.log(entry)
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
        listParams.push({ 
          key: entry[0], 
          name: entry[1],
          errorMsg: entry[0] === 'origin' && entry[1] === '' ? 'You must choose the city of origin' : '',
          error: entry[0] === 'origin' && entry[1] === '' 
        })
    }
    setParamsState(prevState => ({
      ...prevState,
      intermediate: intermediateList.filter((x) => x.name !== '')
    }))
    setParams(listParams.filter((x) => x.name !== ''))
  }, [searchParams])

  // useEffect(() => {
  //   const listParams = []
  //   for (const entry of searchParams.entries()) {
  //     console.log(entry)
  //       listParams.push({ 
  //         key: entry[0], 
  //         name: entry[1],
  //         errorMsg: entry[0] === 'origin' && entry[1] === '' ? 'You must choose the city of origin' : '',
  //         error: entry[0] === 'origin' && entry[1] === '' 
  //       })
  //   }
  //   setParams(listParams.filter((x) => x.name !== ''))
  // }, [searchParams])

  useEffect(() => {
    setCityState({
      origin: params.filter((x) => x.key === 'origin').length > 0,
      destination: params.filter((x) => x.key === 'destination').length > 0
    })
  }, [params])

  const handleChange = (e: CityName, name: string) => {
    const paramValue = !e ? '' : e.name
    searchParams.set(name, paramValue);
    setSearchParams(searchParams)
    setShowNewInput(false)
  }

  const onSubmit = () => {
    console.log(params)
  }

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
            // value={params.filter((x) => x.key === 'origin')[0]?.key ? setValue(params.filter((x) => x.key === 'origin')[0]) : undefined}
            backspaceRemovesValue={false}
            loadOptions={(e) => 
              getCities(e, params)
              .then((res) => res)
              .catch((err) => 
                setParamsState(prevState => ({
                  ...prevState,
                  origin: {
                    ...prevState.origin,
                    errorMsg: err.errorMsg,
                    error: err.status === 500
                  },
                }))
              )
            }
            getOptionLabel={(x: CityName) => x.name}
            getOptionValue={(x: CityName) => x.name}
            onChange={(x) => {handleChange(x, 'origin')}}
            noOptionsMessage={(e) => 
                                e.inputValue.toLowerCase() === 'fail' ? null 
                                : e.inputValue.length > 0 ? 'No match found (cannot repeat city)' 
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
              console.log(x)
              // if(x.key !== 'origin' && x.name !== '' && x.key !== 'destination') {
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
                    loadOptions={(e) => getCities(e, paramsState.intermediate)}
                    getOptionLabel={(xs: CityName) => xs.name}
                    getOptionValue={(xs: CityName) => xs.name}
                    onChange={(xs) => handleChange(xs, `${x.key}`)}
                    noOptionsMessage={(e) => e.inputValue.length > 0 ?  'No match found (cannot repeat city)' : 'Start typing to search available cities'}
                    loadingMessage={() => null}
                    placeholder='City name'
                    isClearable
                    isDisabled={!(citiesState.origin)}
                    styles={createRecordsStyles}
                  />
                </DestinationInputContaier>
                )
              // }
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
                    loadOptions={(e) => getCities(e, paramsState.intermediate)}
                    getOptionLabel={(xs: CityName) => xs.name}
                    getOptionValue={(xs: CityName) => xs.name}
                    onChange={(xs) => handleChange(xs, `intermediate${paramsState.intermediate.length + 1}`)}
                    noOptionsMessage={(e) => e.inputValue.length > 0 ?  'No match found (cannot repeat city)' : 'Start typing to search available cities'}
                    loadingMessage={() => null}
                    placeholder='City name'
                    isClearable
                    isDisabled={!(citiesState.origin)}
                    styles={createRecordsStyles}
                  />
                </DestinationInputContaier>
            ) : 
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '20px' }}>
                {
                  citiesState.origin && 
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
                    getCities(e, params)
                    .then((res) => res)
                    .catch((err) => 
                      setParamsState(prevState => ({
                        ...prevState,
                        destination: {
                          ...prevState.destination,
                          errorMsg: err.errorMsg,
                          error: err.status === 500
                        },
                      }))
                    )
                  }
                  getOptionLabel={(x: CityName) => x.name}
                  getOptionValue={(x: CityName) => x.name}
                  onChange={(x) => handleChange(x, 'destination')}
                  noOptionsMessage={(e) => 
                    e.inputValue.toLowerCase() === 'fail' ? null 
                    : e.inputValue.length > 0 ? 'No match found (cannot repeat city)' 
                    : 'Start typing to search available cities'
                  }
                  loadingMessage={() => null}
                  placeholder='City name'
                  isClearable
                  onError={(e) => console.log(e)}
                  isDisabled={!(citiesState.origin)}
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
                  <button onClick={onSubmit} disabled={!citiesState.origin || !citiesState.destination} >Submit</button>     
                </div>
      <a href={`/result`}>Result</a>
    </Container>
  )
}

export default App
