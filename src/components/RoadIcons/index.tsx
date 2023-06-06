'use strict'
import { Ul, Li } from './RoadIconsStyles'
import "react-datepicker/dist/react-datepicker.css";

function RoadIcons(props: any) {
  const { intermediateCities, newInput } = props

  return (
        <Ul>
          <Li urlImg= '/bullets.svg'/>  
          {
            intermediateCities.map((element: any, index: number) => <Li urlImg= '/bullets.svg' key={`${index}${element.toString()}`}/>  )
          }          
          {
            newInput && <Li urlImg= '/circle.svg' newInput={newInput} />
          }           
          <Li urlImg= '/marker.svg' final newInput={newInput}/>                       
        </Ul>
  )
}

export default RoadIcons
