import { Marker } from "./marker"
import { Circle } from "./circle"

const select = (name: string) => {
  switch (name) {
    case "marker":
      return <Marker />
    case "circle":
      return <Circle />
    default:
      break
  }
}

const Icon = (props: any) => {
  return <div style={{ width: 'fit-content', height: 'fit-content' }} >{select(props.name)}</div>
}

export default Icon
