import { InfinitySpin } from "react-loader-spinner";
import styles from "./Loader.module.css";

function Loader() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <InfinitySpin
        visible={true}
        width="200"
        color="#000"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
}

export default Loader;
