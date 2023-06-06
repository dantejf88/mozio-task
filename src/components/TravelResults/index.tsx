import { useNavigate } from 'react-router-dom'
import { Text, Button } from '../../stylesComponents'
import { Ul, Li, Container } from './travelResultStyle'
import { TravelDataType } from '../../types'
import { colors } from '../../theme'

function TravelResult(props: { listState: any, travelData: TravelDataType }) {
  const { listState, travelData } = props
  const navigate = useNavigate();

  const handleBack = () => navigate(`/${window.location.search}`)

  return (
        <Container>
          <div style={{ display: 'flex',  justifyContent: 'center', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '30px' }} >
                {
                  listState.map((x: any, i: number) => (
                    <div key={i} style={{ height: '70px' }}>
                      <div  style={{ border: `1px solid ${colors.purpleDark}`, padding: '5px', borderRadius: '6px', margin: '10px 0' }}>
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
                    </div>  
                  ))
                }
            </div>
            <Ul style={{ display: 'flex', flexDirection: 'column' }} >
                {
                  listState.map((x: any, i: number) => (
                      <Li key={i} urlImg= '/bullets.svg' >
                        <Text                   
                          fontSize="16px"
                          lineHeight="16px"
                          letterSpacing="0px"
                          padding="0 5px"
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
                        padding="0 5px"
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
              fontSize="16px"
              lineHeight="12px"
              letterSpacing="0px"
              padding="15px 0"
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
              fontSize="16px"
              lineHeight="12px"
              letterSpacing="0px"
              padding="15px 0"
              fontWeight="500"
              color={colors.black}
              textAlign='center'
              width='100%'
            >
                <span style={{ color: `${colors.purpleDark}`, fontWeight: '700' }}>
                  {travelData.passengers}
                </span> 
               {' '} passengers
            </Text>
            <Text
              fontSize="16px"
              lineHeight="12px"
              letterSpacing="0px"
              padding="15px 0"
              fontWeight="700"
              color={colors.purpleDark}
              textAlign='center'
              width='100%'
            >
                {travelData.date}
            </Text>
          </div>
          <Button onClick={handleBack} >
            Back
          </Button>  
        </Container>
  )
}

export default TravelResult
