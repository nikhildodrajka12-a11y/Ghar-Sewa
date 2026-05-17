import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ChatButton from "../components/ChatButton";
import BackButton from "../components/BackButton";



import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCircleUser,
  faLocationDot,
  faCalendarDays,
  faClock,
  faPhone,
  faUser,
  faScrewdriverWrench,
  faEnvelope,
  faChartSimple,
  faStar,
  faFileLines
} from "@fortawesome/free-solid-svg-icons";

const AdminPartnerDetails = () => {

  const { id } = useParams();

  const [partner, setPartner] = useState(null);
  const [bookings, setBookings] = useState([]);

  // ✅ GET BOOKINGS
  const getBookings = async (username) => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/booking/partner/${username}`
      );

      setBookings(res.data);

    } catch (err) {

      console.log(err);
    }
  };

  useEffect(() => {

    const fetchData = async () => {

      try {

        const res = await axios.get(
          `http://localhost:5000/api/partner/${id}`
        );

        setPartner(res.data);

        // ✅ username se booking fetch
        getBookings(res.data.username);

      } catch (err) {

        console.log(err);
      }
    };

    fetchData();

  }, [id]);

  if (!partner) {

    return <h2>Loading...</h2>;
  }

  return (

    <div className="login-container">

      <div className="login-phone">

        <div className="login-screen home-scroll">

          {/* ✅ PARTNER DETAILS */}
          <div className="profile-card partner-info-card">
            <BackButton />

            <h1 className="section-title">
              Partner Details
            </h1>

            <h2>
              {partner.businessName}
            </h2>

            <p>
              <FontAwesomeIcon icon={faCircleUser} bounce />
              {" "} {partner.fullName}
            </p>

            <p>
              <FontAwesomeIcon icon={faUser} beat />
              {" "} {partner.username}
            </p>

            <p>
              <FontAwesomeIcon icon={faEnvelope} fade />
              {" "} {partner.email}
            </p>

            <p>
              <FontAwesomeIcon icon={faPhone} shake />
              {" "} {partner.phone}
            </p>

            <p>
              <FontAwesomeIcon icon={faLocationDot} bounce />
              {" "} {partner.address}
            </p>

            <p>
              <FontAwesomeIcon icon={faScrewdriverWrench} beat />
              {" "} {partner.category}
            </p>

            <p>
              <FontAwesomeIcon icon={faStar} flip />
              {" "} {partner.services}
            </p>

            <p>
              <FontAwesomeIcon icon={faFileLines} fade />
              {" "} {partner.description}
            </p>

            {/* ✅ BUTTONS */}
            <div className="admin-btn-row">

              <button className="block-btn">
                Block
              </button>

              <button className="unblock-btn">
                Unblock
              </button>

            </div>

          </div>

          {/* ✅ BOOKINGS */}
          <div className="profile-card">

            <h1 className="section-title">
              Partner Bookings
            </h1>

            {bookings.length === 0 ? (

              <p>No bookings found</p>

            ) : (

              bookings.map((b) => (

                <div
                  className="booking-card"
                  key={b._id}
                >

                  <p>
                    <FontAwesomeIcon icon={faCircleUser} bounce />
                    {" "} Customer: {b.customerName}
                  </p>

                  <p>
                    <FontAwesomeIcon icon={faUser} beat />
                    {" "} Username: {b.username}
                  </p>

                  <p>
                    <FontAwesomeIcon icon={faCalendarDays} fade />
                    {" "} Date: {b.date}
                  </p>

                  <p>
                    <FontAwesomeIcon icon={faClock} shake />
                    {" "} Time: {b.time}
                  </p>

                  <p>
                    <FontAwesomeIcon icon={faLocationDot} bounce />
                    {" "} Address: {b.address}
                  </p>

                  <p>
                    <FontAwesomeIcon icon={faPhone} shake />
                    {" "} Phone: {b.phone}
                  </p>

                  <p>
                    <FontAwesomeIcon icon={faChartSimple} beatFade />
                    {" "} Status: {b.status}
                  </p>

                </div>
              ))
            )}

          </div>

        </div>
 <ChatButton />
      </div>

    </div>
  );
};

export default AdminPartnerDetails;