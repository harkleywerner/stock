import { Spinner } from "react-bootstrap";

export const SpinnerLoader = () => { 
  return (
    <div className=" h-100 d-flex align-items-center ">
      <Spinner variant="white" className="mx-auto  p-3" />
    </div>
  );
};


export default SpinnerLoader