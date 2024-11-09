// components/BackgroundVideo.js
export default function BackgroundVideo() {
    return (
      <div style={styles.container}>
        <video
          autoPlay
          loop
          muted
          style={styles.video}
        >
           <source src="/ToToCompany.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div style={styles.overlay}>
          {/* Add your content here */}
        </div>
      </div>
    );
  }
  
  const styles = {
    container: {
      position: 'relative',
      minHeight: '120vh',
      width: '100%',
      overflow: 'hidden',
    },
    video: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        height: 'auto',
        width: '100%',
        transform: 'translate(-50%, -50%)',
        objectFit: 'cover', // Ensures the video fills the container without distortion
        minHeight: '100%',
        minWidth: '100%',
        zIndex: -1,
      },
    overlay: {
      position: 'relative',
      zIndex: 1,
      color: 'white',
      textAlign: 'center',
      padding: '20px',
    },
  };
  