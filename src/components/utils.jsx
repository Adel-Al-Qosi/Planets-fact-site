import { useRef, useState, useEffect } from "react";
import data from "../data";
import icon from "../assets/icon-source.svg";

function Utils(num) {
  const colors = [
    '#419EBB', // Planet 0
    '#EDA249', // Planet 1
    '#6D2ED5', // Planet 2
    '#D14C32', // Planet 3
    '#D83A34', // Planet 4
    '#CD5120', // Planet 5
    '#1EC1A2', // Planet 6
    '#2D68F0'  // Planet 7 and beyond
  ];

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const color = colors[num];

  const buttonRef = useRef(null);

  const [type, setType] = useState("overview");

  const style = {
    borderColor: windowWidth < 670 ? color : "rgba(255, 255, 255, .4)",
    // backgroundColor: windowWidth > 670 ? color : 'transparent'
    // borderColor:color

    backgroundColor: colors[num],
  };

  function imagesRender() {
    if (type === "structure") {
      return (
        <img src={data[num].images.internal} className="planet--img" alt="" />
      );
    } else if (type === "geology") {
      return (
        <div className="geology--container">
          <img src={data[num].images.planet} alt="" className="planet--img" />
          <img
            src={data[num].images.geology}
            className="planet--img geology"
            alt=""
          />
        </div>
      );
    } else {
      return (
        <img src={data[num].images.planet} alt="" className="planet--img" />
      );
    }
  }

  function handleClick(e) {
    setType(e.target.dataset.type);

    const buttons = buttonRef.current.children;
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("active");
    }

    e.target.classList.add("active");
  }

  return (
    <>
      <div className="flex-container">
        <div className="c-cont">
          {imagesRender()}

          <div>
            <div className="p-content">
              <div>
                <h1 className="planet--name">{data[num].name}</h1>
                <p className="planet--info"> {data[num][type].content}</p>

                <div className="source--container">
                  <span className="source">Source:</span>
                  <a
                    target="__blank"
                    href={data[num][type].source}
                    className="source"
                  >
                    Wikipedia
                  </a>
                  <img className="icon--source" src={icon} alt="" />
                </div>
              </div>
              <div ref={buttonRef} className="planet--extra--info">
                <button
                  data-type="overview"
                  className={`button ${type === "overview" ? "active" : ""}`}
                  style={type === "overview" ? style : {}}
                  onClick={handleClick}
                >
                  {windowWidth >= 670 && <span>01</span>}
                  Overview
                </button>

                <button
                  data-type="structure"
                  className={`button ${type === "structure" ? "active" : ""}`}
                  style={type === "structure" ? style : {}}
                  onClick={handleClick}
                >
                  {windowWidth >= 670 && <span>02</span>}
                  {windowWidth < 670 ? "Structure" : "Internal Structure"}
                </button>

                <button
                  data-type="geology"
                  className={`button ${type === "geology" ? "active" : ""}`}
                  style={type === "geology" ? style : {}}
                  onClick={handleClick}
                >
                  {windowWidth >= 670 && <span>03</span>}
                  {windowWidth < 670 ? "Surface" : "Surface Geology"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="planet--RRRA">
          <div>
            <p>Rotation Time</p>
            <p>{data[num].rotation}</p>
          </div>
          <div>
            <p>Revolution Time</p>
            <p>{data[num].revolution}</p>
          </div>
          <div>
            <p>Radius</p>
            <p>{data[num].radius}</p>
          </div>
          <div>
            <p>Average Temp.</p>
            <p>{data[num].temperature}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Utils;
