'use strict'
import { useState, useEffect, Fragment } from 'react'
import { Container, InputsContaier, DataContaier} from './homeStyles'
import { dateHandler } from '../utils'
import { Button, Text } from '../stylesComponents'
import { useNavigate, useSearchParams, useParams } from 'react-router-dom'
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
            entry[0] !== 'origin' && 
            entry[0] !== 'destination' &&
            entry[0] !== 'passengers' && 
            entry[0] !== 'date'      
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

  const handleChange = (e: CityName, name: string) => {
    console.log(e, name)
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
          name: '',
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
    console.log(query)  
    return navigate(`/result?${query}`)
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
    <section>
    <Container>
        <InputsContaier>
          <div style={{ display: 'flex', flexDirection: 'column', padding: '0 40px 0 0', width: '20%' }}>
            <RoadIcons intermediateCities={paramsState.intermediate} newInput={newInput.show}/>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', width: '80%'  }}>
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
                  {
                    paramsState.origin.name !== '' && 
                      <button 
                        style={{
                          background: 'none',
                          border: 'none',
                          outline: 'none',
                          color: `${colors.purpleDark}`,
                          cursor: 'pointer',
                          padding: '0',
                        }}
                        onClick={() => setNewInput(prevState => ({ ...prevState, show: true }))}
                      >
                        Add intermediate
                      </button>
                  }
                </div>
            }
            <DestinationInput
              paramsState={paramsState} 
              handleChange={handleChange}
              setError={setError}
            />
            {/* <div style={{ display: 'flex', justifyContent: 'center', width: '100%', margin: '20px 0' }}>
              <button onClick={clearForm} disabled={!paramsState.totalCities.length} >Clear form</button>     
            </div> */}
          </div>
        </InputsContaier>
        <DataContaier>
          <TravelData
            setDate={setDateState}
            date={dateState}
            passengers={passengersState}
            setPassengers={setPassengersState}
            handleChange={handleChange}
          />
        </DataContaier>
      </Container>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', margin: '20px 0' }}>
        <Button
          onClick={onSubmit} 
          disabled={disabledSubmit} 
        >
          Submit
        </Button>     
      </div>
    </section>
  )
}

export default App
