'use strict'
import { useState, useEffect, Fragment } from 'react'
import { Container, DestinationInputContaier } from './homeStyles'
import debounce from 'debounce-promise'
import { getDistances, getCities } from '../services'
import { distanceCalculator, distanceMaker, citiesList, setValue } from '../utils'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { City, CityName } from '../types'
import AsyncSelect from 'react-select/async'
import { createRecordsStyles } from '../react-select-styles'

function App() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [params, setParams] = useState<{key: string, name: string, errorMsg: string, error: boolean}[] | []>([])
  const [citiesState, setCityState] = useState<{origin: boolean, destination: boolean}>({origin: false, destination: false})
  const [showNewInput, setShowNewInput] = useState<boolean>(false)

  useEffect(() => {
    const listParams = []
    for (const entry of searchParams.entries()) {
      console.log(entry)
        listParams.push({ 
          key: entry[0], 
          name: entry[1],
          errorMsg: entry[0] === 'origin' && entry[1] === '' ? 'You must choose the city of origin' : '',
          error: entry[0] === 'origin' && entry[1] === '' 
        })
    }
    setParams(listParams.filter((x) => x.name !== ''))
  }, [searchParams])

  useEffect(() => {
    setCityState({
      origin: params.filter((x) => x.key === 'origin').length > 0,
      destination: params.filter((x) => x.key === 'destination').length > 0
    })
  }, [params])

  const handleChange = (e: CityName, name: string) => {
    console.log(e, name)
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
        <p style={{ margin: '20px 0 5px 0', width: '100%', textAlign: 'left' }}>City of origin</p>
          <AsyncSelect
            id='origin'
            value={params.filter((x) => x.key === 'origin')[0]?.key ? setValue(params.filter((x) => x.key === 'origin')[0]) : undefined}
            backspaceRemovesValue={false}
            loadOptions={(e) => 
              getCities(e, params)
              .then((res) => res)
              .catch((err) => console.log(err))
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
            onError={(e) => console.log(e)}
            onErrorCapture={(e) => console.log(e)}
            required
            aria-invalid={(e) => setTimeout(() => console.log(e), 1000)}
            label='City of origin'
            // isOptionDisabled={() =>
            //     author_name ? author_name instanceof Array && author_name.length >= 5 : false
            // }
            styles={createRecordsStyles}
          />
          {
            params.filter((x) => x.key === 'origin')[0]?.error &&
              <p style={{ margin: '20px 0 5px 0', width: '100%', textAlign: 'left' }}>{params.filter((x) => x.key === 'origin')[0]?.errorMsg}</p>
          }
          {
            params.map((x, i) => {
              if(x.key !== 'origin' && x.name !== '' && x.key !== 'destination') {
                return (
                <DestinationInputContaier key={i}>
                  <p style={{ margin: '20px 0 5px 0', width: '100%', textAlign: 'left' }}>City of destination</p>
                  <AsyncSelect
                    id={`${x.name}`} 
                    value={params[i]?.name ? setValue(params[i]) : undefined}
                    backspaceRemovesValue={false}
                    loadOptions={(e) => getCities(e, params)}
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
                )}}
            )
          }
          {
            showNewInput ? (
              <DestinationInputContaier>
                  <p style={{ margin: '20px 0 5px 0', width: '100%', textAlign: 'left' }}>Intermediate city</p>
                  <AsyncSelect
                    id={'intermediate'} 
                    backspaceRemovesValue={false}
                    loadOptions={(e) => getCities(e, params)}
                    getOptionLabel={(xs: CityName) => xs.name}
                    getOptionValue={(xs: CityName) => xs.name}
                    onChange={(xs) => handleChange(xs, `intermediate${params.length}`)}
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
                <p style={{ margin: '20px 0 5px 0', width: '100%', textAlign: 'left' }}>City of destination</p>
                <AsyncSelect
                  id='destination'
                  value={params.filter((x) => x.key === 'destination')[0]?.key ? setValue(params.filter((x) => x.key === 'destination')[0]) : undefined}
                  backspaceRemovesValue={false}
                  loadOptions={(e) => getCities(e, params)}
                  getOptionLabel={(x: CityName) => x.name}
                  getOptionValue={(x: CityName) => x.name}
                  onChange={(x) => handleChange(x, 'destination')}
                  noOptionsMessage={(e) => e.inputValue.length > 0 ? 'No match found (cannot repeat city)' : 'Start typing to search available cities'}
                  loadingMessage={() => null}
                  placeholder='City name'
                  isClearable
                  onError={(e) => console.log(e)}
                  isDisabled={!(citiesState.origin)}
                  required
                  styles={createRecordsStyles}
                />
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', margin: '20px 0' }}>
                  <button onClick={onSubmit} disabled={!citiesState.origin || !citiesState.destination} >Submit</button>     
                </div>
      <a href={`/result`}>Result</a>
    </Container>
  )
}

export default App
