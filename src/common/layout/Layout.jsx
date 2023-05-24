import { Helmet } from "react-helmet";
import favIcon from "../../assets/images/fav.png"
import Lottie from 'lottie-react';
import loadAnimation from '../../assets/animation/gif2.json';
import { useRef,  useState } from 'react'
const Layout = ({ children }) => {
  const lottieRef = useRef(null)
  const [complete, setComplete] = useState(false)
  const handleAnimationComplete = () => {
    setComplete(true);
  };
  return (
    <>
      <Helmet>
        {/* meta tag*/}
        <meta charset="utf-8" />
        <title>
          {" "}
          Number Runner Club
        </title>
        <meta name="description" content="" />
        <link rel="shortcut icon" type="image/x-icon" href={favIcon} />
        {/* responsive tag */}
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        {/* Bootstrap Latest compiled and minified CSS  */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossorigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bakbak+One&family=Inter:wght@300;400&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Helmet>
      {!complete ? <div style={{ width: '100vw', height: '100vh', position: 'absolute', zIndex: '100', top: '0', left: '0' }}>
        <Lottie
          lottieRef={lottieRef}
          style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
          rendererSettings={{
            preserveAspectRatio: "xMidYMid slice",
          }}
          animationData={loadAnimation}
          loop={false}
          onComplete={handleAnimationComplete}
        />
      </div>  : children}
    </>
  );
};

export default Layout;
