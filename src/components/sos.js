import React, { useState } from "react";
import axios from "axios";

const SOS = () => {
  const [userId, setUser] = useState("");

  const submit = async (e) => {
    e.preventDefault(); // prevent form reload

    try {
      await axios.post("https://backend-cdcd.onrender.com/send-email", {
        to: userId,
        subject: "SOS",
      text: "This is an SOS mail",
      });
      alert("Email sent successfully!");
      e.preventDefault()
      setUser("");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email.");
    }
  };

  return (
    <form onSubmit={submit}>
      <h3>Please enter your email to receive relevant mails:</h3>
      <input
        type="email"
        value={userId}
        onChange={(e) => setUser(e.target.value)}
        placeholder="Enter your email"
        style={{
          padding: "8px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          width: "250px",
          marginTop: "1rem",
        }}
        required
      />
      <br />
      <button
        type="submit"
        style={{
          marginTop: "1rem",
          padding: "8px 16px",
          borderRadius: "6px",
          border: "none",
          backgroundColor: "#007bff",
          color: "white",
          cursor: "pointer",
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default SOS;
