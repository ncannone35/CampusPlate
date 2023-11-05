import { ColorRing } from "react-loader-spinner";

const Loading = ({ width, height }) => {
  return (
    <div className="border-">
      <ColorRing
        visible={true}
        height={height}
        width={width}
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#FFD96E", "#fef08a", "#FDF0CA", "#B8A973", "#f97316"]}
      />
    </div>
  );
};

export default Loading;
