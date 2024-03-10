import { memo } from "react";
import { Spinner } from "react-bootstrap";

const sizes = {
  "xl": "p-5 border-5",
  "lg": "p-4 border-4",
  "md": "p-3 border-3",
  "sm": "p-2 border-2",
  "ss" : "p-1 border-1"
}

const positions = {
  "y": "my-auto",
  "x": "mx-auto",
  "centered": "mx-auto my-auto"
}

const SpinnerLoader = memo((
  {
    color,
    size = "lg",
    position = ""
  }
) => {

  const positionActual = positions[position]

  return (
    <Spinner
      variant={color || "white"}
      className={`
      
    ${sizes[size]}
    ${positionActual}
     `} />

  );
})


export default SpinnerLoader