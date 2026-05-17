import "../App.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Booking = () => {

  const { state } = useLocation();

  const partner = state;

  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    address: "",
    date: "",
    time: "",
    paymentMethod: "COD"
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ✅ STEP 1 → SLOT CHECK
  const handleStep1 = async () => {

    if (!form.date || !form.time) {
      alert("Select date & time ❗");
      return;
    }

    try {

      setLoading(true);

      const user = JSON.parse(localStorage.getItem("user"));

      const res = await axios.post(
        "http://localhost:5000/api/booking/check-slot",
        {
          username: user.name,

          partnerUsername: partner.username,

          date: form.date,

          time: form.time
        }
      );

      if (!res.data.available) {

        alert("❌ Slot already booked, choose another");

        return;
      }

      setStep(2);

    } catch (err) {

      console.log(err);

      alert("Error checking slot");

    } finally {

      setLoading(false);
    }
  };

  // ✅ FINAL BOOKING
  const createBooking = async () => {

    try {

      const user = JSON.parse(localStorage.getItem("user"));

      await axios.post(
        "http://localhost:5000/api/booking/create",
        {
          ...form,

          partnerUsername: partner.username,

          username: user.name
        }
      );

      alert("🎉 Booking Successful!");

    } catch (err) {

      console.log(err);

      alert("Booking failed ❌");
    }
  };

  // ✅ PAYMENT
  const handlePayment = async () => {

    try {

      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/booking/payment/create-order",
        {
          amount: 500
        }
      );

      const order = res.data;

      const options = {

        key: "YOUR_KEY_ID",

        amount: order.amount,

        currency: order.currency,

        name: "Fixora",

        description: "Service Booking",

        order_id: order.id,

        handler: async function () {

          await createBooking();
        },

        theme: {
          color: "#00c853"
        }
      };

      const rzp = new window.Razorpay(options);

      rzp.open();

    } catch (err) {

      console.log(err);

      alert("Payment failed ❌");

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="login-container">

      <div className="login-phone">

        <div className="login-screen home-scroll">

          {/* STEP 1 */}
          {step === 1 && (
            <>

              <h2>Review Order</h2>

              <div className="service-card">

                <h3>{partner.businessName}</h3>

                <p>👤 {partner.fullName}</p>

                <p>📞 {partner.phone}</p>

                <p>📍 {partner.address}</p>

                <p>⭐ {partner.experience} years</p>

                <p>💰 {partner.pricing}</p>

              </div>

              <input
                type="date"
                name="date"
                onChange={handleChange}
              />

              <input
                type="time"
                name="time"
                onChange={handleChange}
              />

              <button onClick={handleStep1}>
                {loading ? "Checking..." : "Continue"}
              </button>

            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>

              <h2>Enter Address</h2>

              <input
                name="customerName"
                placeholder="Your Name"
                onChange={handleChange}
              />

              <input
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
              />

              <input
                name="address"
                placeholder="Full Address"
                onChange={handleChange}
              />

              <button onClick={() => setStep(3)}>
                Continue
              </button>

            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>

              <h2>Payment</h2>

              <select
                name="paymentMethod"
                onChange={handleChange}
              >
                <option value="COD">
                  Cash on Delivery
                </option>

                <option value="ONLINE">
                  Online Payment
                </option>
              </select>

              {form.paymentMethod === "ONLINE" && (
                <div className="service-card">

                  <p>UPI ID: {partner.upi}</p>

                </div>
              )}

              {form.paymentMethod === "COD" && (
                <button onClick={createBooking}>
                  Confirm Booking 🚀
                </button>
              )}

              {form.paymentMethod === "ONLINE" && (
                <button onClick={handlePayment}>
                  Pay & Book 💳
                </button>
              )}

            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default Booking;