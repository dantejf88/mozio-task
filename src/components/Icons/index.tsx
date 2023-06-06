import { Marker } from "./marker"
import { Circle } from "./circle"

const select = (name: string, width: string, height: string, color: string) => {
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
  return <div style={{ width: 'fit-content', height: 'fit-content' }} >{select(props.name, props.width, props.height, props.color)}</div>
}

export default Icon
