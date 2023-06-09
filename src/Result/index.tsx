import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Text, Button } from '../stylesComponents'
import { Container } from './resultStyle'
import TravelResult from '../components/TravelResults'
import { colors } from '../theme'
import { citiesListComplete, months } from '../utils'
import { TravelDataType, CollectionCities } from '../types'
import { getDistances } from '../services'

function SearchResult() {
  const [listState, setListState] = useState<any>()
  const [travelData, setTravelData] = useState<TravelDataType>({ completeDistance: 0, passengers: 0, date: '' })
  const [searchParams] = useSearchParams()
  const [errorRequest, setErrorRequest] = useState({show: false, errorMsg: ''})
  const navigate = useNavigate();

  useEffect(() => {
    const list: any = []
    let originItem: CollectionCities = []
    let destinationItem: CollectionCities = []
    for (const entry of searchParams.entries()) {
      if(entry[0] === 'passengers') {
        setTravelData((prevState: TravelDataType) => ({...prevState, passengers: entry[1]}))
      } else if(entry[0] === 'date' && entry[1] !== '') {
        const date = new Date(entry[1])
        setTravelData(prevState => ({...prevState, date: `${months[date.getMonth()]} ${String(date.getDate())}, ${date.getFullYear()}`}))
      }  else if (entry[0] === 'origin') {
        originItem = [...citiesListComplete.filter((x) => x[0].toLowerCase().includes(entry[1].toLowerCase()))]
      } else if (entry[0] === 'destination') {
        destinationItem = [...citiesListComplete.filter((x) => x[0].toLowerCase().includes(entry[1].toLowerCase()))]
      } else {
        list.push(...citiesListComplete.filter((x) => x[0].toLowerCase().includes(entry[1].toLowerCase())))
      }
    }
    getDistances([...originItem, ...list, ...destinationItem])
    .then((res) => {
      setListState(res.cityList)
      setTravelData(prevState => ({...prevState, completeDistance: res.completeDistance}))
    })
    .catch((err) => setErrorRequest({show: err.status === 500, errorMsg: err.errorMsg}))
  }, [])

  const handleBack = () => navigate(`/${window.location.search}`)

  return (
    <Container>
      {
        !errorRequest.show ?
          <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column' }}>
              <Text
                fontSize="24px"
                lineHeight="25px"
                letterSpacing="0px"
                padding="0 0 50px 0"
                fontWeight="700"
                color={colors.black}
                textAlign='left'
              >
                Travel results
              </Text>
            <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }} >
              {
                listState !== undefined ?
                <>
                  {
                    listState.length === 0 ?
                      <Text
                        fontSize="14px"
                        lineHeight="12px"
                        letterSpacing="0px"
                        padding="0"
                        fontWeight="500"
                        color={colors.black}
                        textAlign='center'
                        width='100%'
                      >
                        No results found
                      </Text>
                    :
                    <TravelResult listState={listState} travelData={travelData} />
                  }
                </>
                : 
                <Text
                  fontSize="12px"
                  lineHeight="16px"
                  letterSpacing="0px"
                  padding="0 0 50px 0"
                  fontWeight="700"
                  color={colors.purpleDark}
                  textAlign='center'
                >
                  LOADING...
                </Text>
              }
            </div>
          </div>
          :
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: 'calc(100vh - 120px)' }} >
            <Text
                fontSize="16px"
                lineHeight="16px"
                letterSpacing="0px"
                padding="0 0 50px 0"
                fontWeight="700"
                color={colors.purpleDark}
                textAlign='center'
              >
                {errorRequest.errorMsg}
              </Text>
              <Button
                onClick={handleBack} 
              >
                Back
              </Button>   
          </div>
      }
    </Container>
  )
}

export default SearchResult
