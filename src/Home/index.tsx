'use strict'
import { useState, useEffect, Fragment } from 'react'
import { Container, InputsContaier, DataContaier, DynamicContainer } from './homeStyles'
import { dateHandler } from '../utils'
import { Button } from '../stylesComponents'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CityName, CityParamState } from '../types'
import RoadIcons from '../components/RoadIcons'
import TravelData from '../components/TravelData'
import DestinationInput from '../components/InputCities/destinationInput'
import NewInput from '../components/InputCities/newInput'
import IntermediateInput from '../components/InputCities/intermediateInput'
import OriginInput from '../components/InputCities/originInput'
import "react-datepicker/dist/react-datepicker.css";
import { colors } from '../theme'

function App() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [dateState, setDateState] = useState<{value: Date | undefined, error: boolean}>({value: undefined, error: false});
  const [passengersState, setPassengersState] = useState({value: 0, error: false});
  const [paramsState, setParamsState] = useState<{origin: CityParamState, intermediate: CityParamState[], destination: CityParamState, totalParams: number, totalCities: CityName[]}>({
    origin: {name: '', errorMsg: '', error: false},
    intermediate: [],
    totalParams: 0,
    totalCities: [],
    destination: {name: '', errorMsg: '', error: false}
  })
  const [newInput, setNewInput] = useState<{show: boolean, error: boolean, errorMsg: string}>({show: false, error: false, errorMsg: ''})
  const [disabledSubmit, setDisabledSubmit] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    setDisabledSubmit(
      paramsState.origin.name === '' ||
      paramsState.destination.name === '' ||
      dateState.value === undefined ||
      passengersState.value === 0
    )
  }, [paramsState, dateState, passengersState])

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
      } if(entry[0] === 'passengers') {
          if(entry[1] === '0') {
            setPassengersState({ value: 0, error: true })
          } else {
            setPassengersState({ value: parseInt(entry[1]), error: false })
          }
      }  if(entry[0] === 'date') {
            if(entry[1] === '') {
              setDateState({ value: undefined, error: true })
            } else {
              setDateState({ value: new Date(entry[1]), error: false })
            }
        } else if(
            entry[0].includes('intermediate')     
          ) {
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
    setNewInput(prevState => ({ ...prevState, show: false }))
  }, [searchParams])

  const handleChange = (e: CityName, name: string): void => {
    if(e===null && name !== 'origin' && name !== 'destination') {
      searchParams.delete(name)
    } else {
      const paramValue = !e ? '' : e.name
      searchParams.set(name, paramValue)
    }
    return setSearchParams(searchParams)
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
    let query = ''
    query = query.concat(`origin=${paramsState.origin.name}&destination=${paramsState.destination.name}&date=${encodeURIComponent(dateHandler(dateState.value))}&passengers=${passengersState.value}`)
    if(paramsState.intermediate.length > 0) {
      paramsState.intermediate.forEach(element => {
        return query += `&${element.key}=${element.name}`
      })
    }
    return navigate(`/result?${query}`)
  }

  const onClear = () => {
    setSearchParams('?origin=&destination=')
    setDateState({ value: undefined, error: true })
    setPassengersState({ value: 0, error: true })
    setParamsState({
      origin: {name: '', errorMsg: '', error: false},
      intermediate: [],
      totalParams: 0,
      totalCities: [],
      destination: {name: '', errorMsg: '', error: false}
    })
  }

  return (
    <section style={{ width: '100%', padding: '0 20px' }}>
      <Container>
        <InputsContaier>
          <DynamicContainer widthDesktop='20%' widthMobile='10%'>
            <RoadIcons intermediateCities={paramsState.intermediate} newInput={newInput.show}/>
          </DynamicContainer>
          <DynamicContainer widthDesktop='80%' widthMobile='90%'>
              <OriginInput
                paramsState={paramsState} 
                handleChange={handleChange}
                setError={setError}
              />
              {
                paramsState.intermediate.map((x, i) => {
                    return (
                      <Fragment key={i}>
                        <IntermediateInput
                          paramsState={paramsState} 
                          handleChange={handleChange}
                          setError={setError}
                          element={x}
                          index={i}
                        />
                      </Fragment>
                    )
                })
              }
              {
                newInput.show ? (
                  <NewInput
                    paramsState={paramsState} 
                    handleChange={handleChange}
                    setNewInput={setNewInput}
                    newInput={newInput}
                  />
                ) : 
                  <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', margin: '0 0 20px 0' }}>
                        <button 
                          style={{
                            background: 'none',
                            border: 'none',
                            outline: 'none',
                            color: `${paramsState.origin.name === '' ? colors.purpleLight : colors.purpleDark}`,
                            cursor: 'pointer',
                            padding: '0',
                          }}
                          disabled={paramsState.origin.name === ''}
                          onClick={() => setNewInput(prevState => ({ ...prevState, show: true }))}
                        >
                        +  Add intermediate
                        </button>
                  </div>
              }
              <DestinationInput
                paramsState={paramsState} 
                handleChange={handleChange}
                setError={setError}
              />
          </DynamicContainer>
        </InputsContaier>
        <DataContaier>
          <TravelData
            date={dateState}
            passengers={passengersState}
            handleChange={handleChange}
          />
        </DataContaier>
      </Container>
      <div style={{ 
        display: 'flex',
        justifyContent: 'space-between',
        height: '120px',
        width: '100%',
        margin: '0 0 20px 0',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Button
          onClick={onSubmit} 
          disabled={disabledSubmit} 
        >
          Submit
        </Button>     
        <Button
          onClick={onClear} 
        >
          Clear form
        </Button>     
      </div>
    </section>
  )
}

export default App
