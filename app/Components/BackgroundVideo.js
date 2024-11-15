// app/Components/BackgroundVideo.js

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
          {/* Add your overlay content here */}
        </div>
      </div>
    );
  }
  
  const styles = {
    container: {
      position: 'relative',
      height: '120vh',
      width: '100%',
      overflow: 'hidden',
    },
    video: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      objectFit: 'cover',
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
  