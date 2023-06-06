import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Text, Button } from '../stylesComponents'
import { Ul, Li, Container } from './resultStyle'
import Icon from '../components/Icons'
import { colors } from '../theme'
import { citiesListComplete, months } from '../utils'
import { getDistances } from '../services'

function SearchResult() {
  const [listState, setListState] = useState<any>()
  const [travelData, setTravelData] = useState<any>({ completeDistance: 0, passengers: 0, date: '' })
  const [searchParams, setSearchParams] = useSearchParams()
  const [errorRequest, setErrorRequest] = useState({show: false, errorMsg: ''})
  const navigate = useNavigate();

  useEffect(() => {
    const list = []
    for (const entry of searchParams.entries()) {
      if(entry[0] === 'passengers') {
        setTravelData(prevState => ({...prevState, passengers: entry[1]}))
      } else if(entry[0] === 'date' && entry[1] !== '') {
        const date = new Date(entry[1])
        setTravelData(prevState => ({...prevState, date: `${months[date.getMonth()]} ${String(date.getDate())}, ${date.getFullYear()}`}))
      } 
      list.push(...citiesListComplete.filter((x) => x[0].toLowerCase().includes(entry[1].toLowerCase())))
    }
    getDistances(list)
    .then((res) => {
      console.log(res)
      setListState(res.cityList)
      setTravelData(prevState => ({...prevState, completeDistance: res.completeDistance}))
    })
    .catch((err) => setErrorRequest({show: err.status === 500, errorMsg: err.errorMsg}))
    // console.log(searchParams.entries(), window.location.search)
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
              // width='100%'
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
                      textAlign='left'
                      width='100%'
                    >
                      No results found
                    </Text>
                  :
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
                      <div style={{ display: 'flex',  justifyContent: 'center', width: '100%' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '30px' }} >
                            {
                              listState.map((x: any, i: number) => (
                                <div key={i} style={{ border: `1px solid ${colors.purpleDark}`, padding: '5px', borderRadius: '6px', margin: '10px 0' }}>
                                  <Text
                                    fontSize="14px"
                                    lineHeight="12px"
                                    letterSpacing="0px"
                                    padding="0"
                                    fontWeight="500"
                                    color={colors.purpleDark}
                                    textAlign='left'
                                    width='100%'
                                  >
                                      {x.distance}km
                                  </Text>
                                </div>
                              ))
                            }
                        </div>
                        <Ul style={{ display: 'flex', flexDirection: 'column' }} >
                            {
                              listState.map((x: any, i: number) => (
                                  <Li key={i} style={{ height: '44px' }} urlImg= '/circle.svg' >
                                    <Text                         
                                      fontSize="16px"
                                      lineHeight="16px"
                                      letterSpacing="0px"
                                      padding="10px 0 5px 5px"
                                      fontWeight="440"
                                      color={colors.black}
                                      textAlign='left'
                                      width='100%'
                                    >
                                      {x.origin}
                                    </Text>
                                  </Li>
                              ))
                            }
                            <Li urlImg= '/marker.svg'>
                                <Text
                                    fontSize="16px"
                                    lineHeight="16px"
                                    letterSpacing="0px"
                                    padding="10px 0 5px 5px"
                                    fontWeight="500"
                                    color={colors.black}
                                    textAlign='left'
                                    width='100%'
                                  >
                                    {listState[listState.length - 1].destination}
                                </Text>
                            </Li>
                        </Ul>
                      </div>  
                      <div style={{ margin: '10px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                  <Text
                                    fontSize="14px"
                                    lineHeight="12px"
                                    letterSpacing="0px"
                                    padding="10px 0"
                                    fontWeight="500"
                                    color={colors.black}
                                    textAlign='center'
                                    width='100%'
                                  >
                                      <span
                                        style={{ color: `${colors.purpleDark}`, fontWeight: '700' }}
                                      >{travelData.completeDistance} km</span> is total distance
                                  </Text>
                                  <Text
                                    fontSize="14px"
                                    lineHeight="12px"
                                    letterSpacing="0px"
                                    padding="10px 0"
                                    fontWeight="500"
                                    color={colors.black}
                                    textAlign='center'
                                    width='100%'
                                  >
                                      <span
                                        style={{ color: `${colors.purpleDark}`, fontWeight: '700' }}
                                      >{travelData.passengers}</span> passengers
                                  </Text>
                                  <Text
                                    fontSize="14px"
                                    lineHeight="12px"
                                    letterSpacing="0px"
                                    padding="10px 0"
                                    fontWeight="700"
                                    color={colors.purpleDark}
                                    textAlign='center'
                                    width='100%'
                                  >
                                      {travelData.date}
                                  </Text>
                      </div>
                      <Button
                        onClick={handleBack} 
                        // disabled={disabledSubmit} 
                      >
                        Back
                      </Button>  
                    </div>
                }
              </>
              : <h2>loading...</h2>
            }
          </div>
        </div>
        :
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100%' }} >
          <Text
              fontSize="12px"
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
              // disabled={disabledSubmit} 
            >
              Back
            </Button>   
        </div>
      }
    </Container>
  )
}

export default SearchResult
