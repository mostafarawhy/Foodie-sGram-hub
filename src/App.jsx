import { Routes, Route, useLocation } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ImageGrid from "./components/ImageGrid";
import Title from "./components/Title";
import UploadForm from "./components/UploadForm";
import Home from "./components/Home";
import { GlobalContext } from "./components/context/GlobalState";
import { useContext, useEffect } from "react";
import HomePageLogin from "./components/HomePageLogin";

function App() {
  const location = useLocation();
  const { setSelectedImg } = useContext(GlobalContext);

  useEffect(() => {
    const imageUrlQueryParams = location.search;
    const urlParams = new URLSearchParams(imageUrlQueryParams);
    const imageUrl = urlParams.get("imageUrl");

    setSelectedImg(imageUrl); //opens the modal with the image (dependant on that rendering )
  }, [location]);
  // const [location, setLocation] = useState(null);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const getLocation = () => {
  //     if ("geolocation" in navigator) {
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           setLocation({
  //             latitude: position.coords.latitude,
  //             longitude: position.coords.longitude,
  //           });
  //         },
  //         (err) => {
  //           setError(err);
  //         }
  //       );
  //     } else {
  //       setError(new Error("Geolocation is not supported by this browser."));
  //     }
  //   };
  // }, []);
  // console.log(location);
  return (
    <GoogleOAuthProvider clientId="your google client id here ">
      <Routes>
        <Route path="/" element={<HomePageLogin />} />
        <Route
          path="/home-profile"
          element={
            <div>
              <Home />
              <div className={"App  "}>
                <Title />
                <UploadForm />
                <ImageGrid />
              </div>
            </div>
          }
        />
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
