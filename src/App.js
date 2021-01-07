import React, { useState, useEffect } from "react";
import "./App.css";
import ReactMapGL, { Marker } from "react-map-gl";

function App() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: 350,
    latitude: 28.7041,
    longitude: 77.1025,
    zoom: 4,
  });

  const [latPos, setLatPos] = useState(28.7041);
  const [longPos, setLongPos] = useState(77.1025);

  const [photos, setPhotos] = useState([]);

  const FindImage = (e) => {
    setLongPos(e.lngLat[0]);
    setLatPos(e.lngLat[1]);
    fetch(
      "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" +
        "ce7129f4b3154c24de5e013d76bc9796" +
        `&lat=${latPos}&lon=${longPos}&per_page=10&format=json&nojsoncallback=1`
    )
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        let picArr = data.photos.photo.map((pic) => {
          var srcPath =
            "https://farm" +
            pic.farm +
            ".staticflickr.com/" +
            pic.server +
            "/" +
            pic.id +
            "_" +
            pic.secret +
            ".jpg";
          return (
            <div className="img-wrapper">
              <img alt="pics" src={srcPath}></img>
            </div>
          );
        });
        setPhotos(picArr);
      });
  };

  useEffect(() => {}, []);

  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoiY2hldGFudmVybWEiLCJhIjoiY2tiNDUzbzVwMGw2NjMzdDhyNnpucjVneCJ9.9S3kG_07Xpgy1uQxQEh0ew"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}>
        <Marker
          latitude={latPos}
          longitude={longPos}
          draggable={true}
          onDragEnd={FindImage}>
          <button></button>
        </Marker>
      </ReactMapGL>
      <div className="photos-container">{photos}</div>
    </div>
  );
}

export default App;
