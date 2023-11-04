import { ColorRing } from "react-loader-spinner";

const Loading = ({ width, height }) => {
  return (
    <div className="">
      <ColorRing
        visible={true}
        height={height}
        width={width}
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#FFD96E", "#FDF0CA", "#B8A973"]}
      />
    </div>
  );
};

export default Loading;
