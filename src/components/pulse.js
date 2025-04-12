import React, { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { db } from "../firebase";
import axios from "axios";

const Pulse = () => {
  const [heartRates, setHeartRates] = useState([]);
  const [spo2s, setSpo2s] = useState([]);
  const [temperatures, setTemperatures] = useState([]);
  const [alertSent, setAlertSent] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const set3Ref = ref(db, "/examples/BareMinimum/data/set3");

      try {
        const snapshot = await get(set3Ref);
        if (snapshot.exists()) {
          const data = snapshot.val();

          const hr = Object.values(data?.HeartRate || {});
          const sp = Object.values(data?.SpO2 || {});
          const temp = Object.values(data?.Temperature || {});

          setHeartRates(hr);
          setSpo2s(sp);
          setTemperatures(temp);

          const shouldSendAlert =
            hr.some((v) => v > 120) || sp.some((v) => v > 80) || temp.some((v) => v > 38);

          if (shouldSendAlert && !alertSent) {
            sendMail();
            setAlertSent(true);
          } else if (!shouldSendAlert && alertSent) {
            setAlertSent(false); // reset when vitals return to normal
          }
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 20000); 
    return () => clearInterval(interval);
  }, [alertSent]);

  const sendMail = async () => {
    try {
      const userId = localStorage.getItem("userEmail");
      await axios.post("https://backend-cdcd.onrender.com/send-email", {
        to: userId,
        subject: "⚠️ SOS - Abnormal Vitals Detected",
        text: "Immediate attention required. Patient vitals out of safe range.",
      });
      alert("🚨 SOS email sent!");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send SOS email.");
    }
  };

  const renderSingleColumnTable = (title, data) => (
    <div style={tableBoxStyle}>
      <table style={tableStyle}>
        <thead>
          <tr><th style={headerStyle}>{title}</th></tr>
        </thead>
        <tbody>
          {data.map((val, i) => (
            <tr key={i}>
              <td style={cellStyle}>{val}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div style={containerStyle}>
      {renderSingleColumnTable("Heart Rate (bpm)", heartRates)}
      {renderSingleColumnTable("SpO2 (%)", spo2s)}
      {renderSingleColumnTable("Temperature (°C)", temperatures)}
    </div>
  );
};

export default Pulse;
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: "30px",
  padding: "40px",
  flexWrap: "wrap",
  backgroundColor: "#f7f9fc",
  minHeight: "100vh",
};

const tableBoxStyle = {
  width: "250px",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
  padding: "20px",
  textAlign: "center",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  fontFamily: "Segoe UI, sans-serif",
  fontSize: "16px",
};

const headerStyle = {
  padding: "12px",
  borderBottom: "2px solid #ddd",
  backgroundColor: "#f0f0f0",
  fontWeight: "600",
  borderRadius: "4px 4px 0 0",
};

const cellStyle = {
  padding: "10px",
  borderBottom: "1px solid #f0f0f0",
  color: "#333",
};

const titleStyle = {
  fontSize: "18px",
  fontWeight: "bold",
  marginBottom: "12px",
  color: "#2c3e50",
}; 