import { memo } from "react";
import { Spinner } from "react-bootstrap";

const sizes = {
  "xl": "p-5 border-5",
  "lg": "p-4 border-4",
  "md": "p-3 border-3",
  "sm": "p-2 border-2"
}

const positions = {
  "y": "my-auto",
  "x": "mx-auto",
}

export const SpinnerLoader = memo((
  {
    color,
    size = "lg",
    position = ["x", "y"]
  }
) => {

  const reducePosition = position.reduce((acc, current) => acc + positions[current] + " ", "")

  return (
    <Spinner 
      variant={color || "white"}
      className={`
    ${sizes[size]}
    ${reducePosition}
     `} />

  );
})


export default SpinnerLoader