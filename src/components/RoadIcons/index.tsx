'use strict'
import { Ul, Li } from './RoadIconsStyles'
import { Text } from '../../stylesComponents'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Icon from '../Icons';
import { dateHandler } from '../../utils';
import { colors } from '../../theme'
import { useEffect } from 'react';

function RoadIcons(props) {
  const { intermediateCities, newInput } = props

  useEffect(() => console.log(intermediateCities), [intermediateCities])

  return (
        <Ul>
          <Li urlImg= '/circle.svg'/>  
          {
            intermediateCities.map((element, index) => <Li urlImg= '/circle.svg' key={index}/>  )
          }          
          {
            newInput && <Li urlImg= '/circle.svg' />
          }           
          <Li urlImg= '/marker.svg' final newInput={newInput}/>                       
        </Ul>
  )
}

export default RoadIcons
