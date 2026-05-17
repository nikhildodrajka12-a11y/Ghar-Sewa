import "../App.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import BottomNav from "../components/BottomNav";
import ChatButton from "../components/ChatButton";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faHouse,
  faCircleUser,
  faStore,
  faDisplay,
  faMagnifyingGlass,
  faWrench,
  faBolt,
  faBroom,
  faScrewdriverWrench,
  faHammer,
  faCar
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {

  const navigate = useNavigate();

  const [active, setActive] = useState(0);
  const [offerIndex, setOfferIndex] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);
  const [showNav, setShowNav] = useState(true);

  const lastScroll = useRef(0);
  const touchStartX = useRef(0);

  const videos = [
    "/add_1.mp4",
    "/add_2.mp4",
    "/add_3.mp4",
    "/add_4.mp4"
  ];

  const searchTexts = [
    "Search plumber...",
    "Find electrician...",
    "Book cleaning...",
    "Repair service..."
  ];

  const [placeholder, setPlaceholder] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [typing, setTyping] = useState(true);

  /* 🔤 Typing Animation */
  useEffect(() => {

    const currentText = searchTexts[textIndex];

    let timeout;

    if (typing) {

      if (charIndex < currentText.length) {

        timeout = setTimeout(() => {

          setPlaceholder(
            currentText.substring(0, charIndex + 1)
          );

          setCharIndex(charIndex + 1);

        }, 80);

      } else {

        timeout = setTimeout(() => {
          setTyping(false);
        }, 1000);
      }

    } else {

      if (charIndex > 0) {

        timeout = setTimeout(() => {

          setPlaceholder(
            currentText.substring(0, charIndex - 1)
          );

          setCharIndex(charIndex - 1);

        }, 40);

      } else {

        setTyping(true);

        setTextIndex(
          (prev) => (prev + 1) % searchTexts.length
        );
      }
    }

    return () => clearTimeout(timeout);

  }, [charIndex, typing, textIndex]);

  /* 🔁 Offer Slider */
  useEffect(() => {

    const i = setInterval(() => {

      setOfferIndex((prev) => (prev + 1) % 5);

    }, 2000);

    return () => clearInterval(i);

  }, []);

  /* 🔽 Scroll Navbar */
  const handleScroll = (e) => {

    const current = e.target.scrollTop;

    setShowNav(current <= lastScroll.current);

    lastScroll.current = current;
  };

  /* 👉 TOUCH START */
  const handleTouchStart = (e) => {

    touchStartX.current = e.touches[0].clientX;
  };

  /* 👉 OFFER SWIPE */
  const handleTouchEnd = (e) => {

    const diff =
      touchStartX.current -
      e.changedTouches[0].clientX;

    if (diff > 50) {

      setOfferIndex((prev) => (prev + 1) % 5);

    } else if (diff < -50) {

      setOfferIndex((prev) => (prev - 1 + 5) % 5);
    }
  };

  /* 👉 VIDEO SWIPE */
  const handleVideoTouchEnd = (e) => {

    const diff =
      touchStartX.current -
      e.changedTouches[0].clientX;

    if (diff > 50) {

      setVideoIndex(
        (prev) => (prev + 1) % videos.length
      );

    } else if (diff < -50) {

      setVideoIndex(
        (prev) =>
          (prev - 1 + videos.length) %
          videos.length
      );
    }
  };

  return (

    <div className="login-container">

      <div className="login-phone">

        <div
          className="login-screen home-scroll"
          onScroll={handleScroll}
        >

          {/* HEADER */}
          <div className="uber-header">

            <h2>Fixora</h2>

          </div>

          {/* SEARCH */}
          <div className="uber-search premium-search">

            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="search-icon"
            />

            <input placeholder={placeholder} />

          </div>

          <div className="section-title big-title">
            For you
          </div>

          {/* SERVICES */}
          <div className="circle-grid">

            {[
              [faWrench, "Plumber", "/plumber"],
              [faBolt, "Electrician", "/electrician"],
              [faBroom, "Cleaning", "/cleaning"],
              [faScrewdriverWrench, "Repair", "/repair"],
              [faHammer, "Carpenter", "/carpenter"],
              [faCar, "Mechanic", "/mechanic"],
              [faCar, "Mechanic", "/mechanic"],
              [faCar, "Mechanic", "/mechanic"]
            ].map((item, i) => (

              <div
                key={i}
                onClick={() => navigate(item[2])}
              >

                <div className="circle">

                  <FontAwesomeIcon
                    icon={item[0]}
                    bounce
                  />

                </div>

                <p>{item[1]}</p>

              </div>
            ))}
          </div>

          {/* OFFER */}
          <div
            className="offer-slider split-card"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >

            <div
              className="offer-track"
              style={{
                transform:
                  `translateX(-${offerIndex * 100}%)`
              }}
            >

              {[1,2,3,4,5].map((n) => (

                <div
                  className="offer-slide"
                  key={n}
                >

                  <img
                    src={`/offer${n}.jpeg`}
                    alt="offer"
                  />

                  <button className="offer-btn">
                    Book now
                  </button>

                </div>
              ))}
            </div>
          </div>

          {/* VIDEO */}
          <div
            className="video-slider split-card"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleVideoTouchEnd}
          >

            <video
              key={videoIndex}
              src={videos[videoIndex]}
              autoPlay
              muted
              className="video-box"
              onEnded={() =>
                setVideoIndex(
                  (prev) =>
                    (prev + 1) % videos.length
                )
              }
            />

          </div>

          {/* EXTRA OFFERS */}
          <div className="offer-slider split-card">

            <div className="offer-track">

              <div className="offer-slide">

                <img
                  src="/offer6.jpeg"
                  alt="offer"
                />

                <button className="offer-btn">
                  Explore
                </button>

              </div>

              <div className="offer-slide">

                <img
                  src="/offer7.jpeg"
                  alt="offer"
                />

                <button className="offer-btn">
                  Explore
                </button>

              </div>

              <div className="offer-slide">

                <img
                  src="/offer8.jpeg"
                  alt="offer"
                />

                <button className="offer-btn">
                  Explore
                </button>

              </div>

            </div>

          </div>

          <div className="offer-slider split-card">

            <div className="offer-track">

              <div className="offer-slide">

                <img
                  src="/offer9.jpeg"
                  alt="offer"
                />

                <button className="offer-btn">
                  View
                </button>

              </div>

              <div className="offer-slide">

                <img
                  src="/offer10.jpeg"
                  alt="offer"
                />

                <button className="offer-btn">
                  View
                </button>

              </div>

              <div className="offer-slide">

                <img
                  src="/offer11.jpeg"
                  alt="offer"
                />

                <button className="offer-btn">
                  View
                </button>

              </div>

            </div>

          </div>

        </div>

        {/* NAVBAR */}
        <div
          className={`bottom-bar ${
            showNav ? "show" : "hide"
          }`}
        >

          <div
            className={`nav-item ${
              active === 0 ? "active" : ""
            }`}
            onClick={() => {
              setActive(0);
              navigate("/home");
            }}
          >

            <FontAwesomeIcon
              icon={faHouse}
              beatFade
            />

          </div>

          <div
            className={`nav-item ${
              active === 1 ? "active" : ""
            }`}
            onClick={() => {
              setActive(1);
              navigate("/services");
            }}
          >

            <FontAwesomeIcon
              icon={faDisplay}
              flip
            />

          </div>

          <div
            className={`nav-item ${
              active === 2 ? "active" : ""
            }`}
            onClick={() => {
              setActive(2);
              navigate("/activity");
            }}
          >

            <FontAwesomeIcon
              icon={faStore}
              fade
            />

          </div>

          <div
            className={`nav-item ${
              active === 3 ? "active" : ""
            }`}
            onClick={() => {
              setActive(3);
              navigate("/profile");
            }}
          >

            <FontAwesomeIcon
              icon={faCircleUser}
              bounce
            />

          </div>

          <div
            className="nav-indicator"
            style={{
              left: `${active * 25}%`
            }}
          ></div>

        </div>

        <ChatButton />

      </div>

    </div>
  );
};

export default Home;