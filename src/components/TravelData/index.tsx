'use strict'
import { HandleContainer } from './TravelDataStyles'
import { Text } from '../../stylesComponents'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { dateHandler } from '../../utils';
import { colors } from '../../theme'

function TravelData(props: any) {
  const { handleChange, date, passengers } = props

  return (
      <>
        <div style={{ height: '100px' }}>
          <Text
            fontSize="12px"
            lineHeight="16px"
            letterSpacing="0px"
            padding="10px 0 5px 0"
            fontWeight="500"
            color={colors.black}
            textAlign='left'
            width='100%'
          >
              Passengers
          </Text>
          <div style={{ 
                border: '1px solid #E5E7EB',
                width: '110px',
                minHeight: '38px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around' 
              }}>
              <HandleContainer onClick={() => passengers.value > 0 ? handleChange({name: (passengers.value - 1).toString()}, 'passengers' ) : () => null}>
                -
              </HandleContainer>
              <Text
                fontSize="12px"
                lineHeight="16px"
                letterSpacing="0px"
                padding="0"
                fontWeight="500"
                color={colors.black}
                textAlign='center'
                width='20px'
              >
                  {passengers.value}
              </Text>
              <HandleContainer onClick={() => handleChange({name: (passengers.value + 1).toString()}, 'passengers' )}>
                +
              </HandleContainer>
          </div>
          {
            passengers.error &&
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
                Select passengers
              </Text>
          }
        </div>
        <div style={{ height: '100px' }}>
          <Text
            fontSize="12px"
            lineHeight="16px"
            letterSpacing="0px"
            padding="10px 0 5px 0"
            fontWeight="500"
            color={colors.black}
            textAlign='left'
            width='100%'
          >
              Date
          </Text>
          <DatePicker
            minDate={new Date()}
            selected={date.value}
            onKeyDown={e => e.preventDefault()}
            onChange={(e: Date) => handleChange({name: dateHandler(e)}, 'date' )}
            className="react-datepicker__current-month react-datepicker-time__header react-datepicker-year-header react-datepicker__day--selected react-datepicker-styles react-datepicker__input-container react-datepicker__month-container react-datepicker__header react-datepicker"
          />
          {
            date.error &&
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
                Select date
              </Text>
          }
        </div>
      </>
  )
}

export default TravelData
