import { Spinner } from "react-bootstrap";

export const SpinnerLoaderFetch = () => {
    return (
        <div style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} className="position-absolute ">
        <Spinner variant="white" className="mx-auto  p-3" />
      </div>
    );
};


export default SpinnerLoaderFetch