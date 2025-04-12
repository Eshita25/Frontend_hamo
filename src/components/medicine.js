import { set, ref, push, get } from "firebase/database";
import { db } from "../firebase";
import React, { useEffect, useState } from "react";

const Medicine = () => {
  const [medicines, setMedicines] = useState([
    { name: "Medicine1",  time: "" },
    { name: "Medicine2", time: "" },
    { name: "Medicine3",  time: "" },
    { name: "Medicine4",  time: "" },
  ]);

  const [fetchedData, setFetchedData] = useState([]);

  const handleChange = (index, field, value) => {
    const newMedicines = [...medicines];
    newMedicines[index][field] = value;
    setMedicines(newMedicines);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const medicineRef = ref(db, "/halwa");
      const newMedicineRef = push(medicineRef);
      const filteredMedicines = medicines.filter((med) => med.qty || med.time);
  
      await set(newMedicineRef, {
        medicines: filteredMedicines,
        createdAt: new Date().toISOString(),
      });
  
      // 🔥 ALSO update /examples/GetDataDemo
      const getDataDemoRef = ref(db, "/examples/GetDataDemo");
      const getDataDemoPayload = {};
      filteredMedicines.forEach((med, index) => {
        getDataDemoPayload[`Slot_${index + 1}`] = med.time;
      });
  
      await set(getDataDemoRef, getDataDemoPayload);
  
      alert("Medicines Added!");
  
      setMedicines([
        { name: "Slot_1", time: "" },
        { name: "Slot_2", time: "" },
        { name: "Slot_3", time: "" },
        { name: "Slot_4", time: "" },
      ]);
  
      fetchData();
    } catch (error) {
      alert("Error adding medicines: " + error.message);
    }
  };
  
  const fetchData = async () => {
    try {
      const medicineRef = ref(db, "/examples/GetDataDemo");
      const snapshot = await get(medicineRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const allEntries = Object.values(data).map((entry) => entry.medicines);
        console.log(allEntries);
const latestEntry = allEntries[allEntries.length - 1];
setFetchedData(latestEntry || []);
      } else {
        setFetchedData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  // Optional: Fetch on component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>ELSA</h2>
      <p style={styles.description}>Enter up to 4 medicines for proper nursing care</p>

      <form onSubmit={handleSubmit} style={styles.form}>
        {medicines.map((med, index) => (
          <div key={index} style={styles.formContainer}>
            <span>{med.name}</span>
            <input
              type="text"
              placeholder="Time-format: hh:mm:ss"
              value={med.time}
              onChange={(e) => handleChange(index, "time", e.target.value)}
              style={styles.input}
            />
            {/*<input
              type="number"
              placeholder="Qty"
              value={med.qty}
              onChange={(e) => handleChange(index, "qty", e.target.value)}
              style={styles.input}
        />*/}
          </div>
        ))}

        <button type="submit" style={styles.button}>Submit</button>
      </form>

      {/* Medicine Schedule Display */}
      <div style={{ marginTop: "1rem", textAlign: "left" }}>
        <h3>Medicine Schedule</h3>
        {fetchedData.length === 0 ? (
          <p>No data available</p>
        ) : (
          <>
          <div>
  {fetchedData.map((med, index) => (
    <div key={index}>
      <strong>{med.name}</strong> — Time: {med.time} {/* Qty: {med.qty} */}
    </div>
  ))}
</div>

          </>
        )}
      </div>
    </div>
  );
};

export default Medicine;

const styles = {
  container: {
    maxWidth: "500px",
    margin: "auto",
    marginTop: "5rem",
    padding: "20px",
    textAlign: "center",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
  header: {
    color: "#333",
    fontSize: "24px",
    marginBottom: "10px",
  },
  description: {
    color: "#666",
    fontSize: "14px",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    width: "40%",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 15px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    marginTop: "10px",
    alignSelf: "center",
  },
  formContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "1rem",
    padding: "0 10px",
  },
}; 