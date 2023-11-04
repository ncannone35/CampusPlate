// In components/BackgroundVideo.js
const BackgroundVideo = () => {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 z-[-1] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full"
        >
          <source src="/background.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
        <style jsx>{`
          video {
            // Ensures video covers the entire viewport
            position: fixed;
            top: 50%;
            left: 50%;
            min-width: 100%;
            min-height: 100%;
            transform: translate(-50%, -50%);
          }
        `}</style>


        <div className="w-full h-full bg-black absolute opacity-50"> </div> 
      </div>
    );
  };
  
  export default BackgroundVideo;
  