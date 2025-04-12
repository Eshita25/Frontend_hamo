import React, { useEffect, useState } from "react";
import { ref,get, onValue } from "firebase/database";
import { db } from "../firebase";
const Pulse = () => {
    const [HeartRate,setHeartRate] =useState({});
    const [spo2,setSpo2] = useState({});

    useEffect(()=>{
    const fetchData = async () => {
      
      const set3Ref = ref(db, '/examples/GetDataDemo');

    
      try {
        const snapshot = await get(set3Ref);
        if (snapshot.exists()) {
          const data = snapshot.val(); 
          console.log(data);
        } else {
          console.log("No data available at /BareMinimum/data/set3/Heartrate");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  },[])
    
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100dvh",
        width: "100dvw",
       
      }}>
        <div style={{
          width: '80%',
          maxHeight: '70vh',
          overflow: 'auto',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          backgroundColor: '#fff'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontFamily: 'Arial, sans-serif',
            fontSize: '16px'
          }}>
            <thead style={{ position: 'sticky', top: 0, backgroundColor: '#f2f2f2', zIndex: 1 }}>
              <tr>
                <th style={headerStyle}>Measured At</th>
                <th style={headerStyle}>Spo2</th>
                <th style={headerStyle}>HeartRate</th>
                <th style={headerStyle}>Temperature</th>
              </tr>
            </thead>
            <tbody>
  {HeartRate &&
    Object.entries(HeartRate).map(([timestamp, hrObj]) => {
      return (
        <tr key={timestamp}>
          <td style={cellStyle}>{timestamp}</td>
          <td style={cellStyle}>{spo2?.[timestamp]?.value ?? "N/A"}</td>
          <td style={cellStyle}>{hrObj}</td>
          <td style={cellStyle}>--</td> 
        </tr>
      );
    })}
</tbody>       
          </table>
        </div>
      </div>
    );
  };
  
  const headerStyle = {
    padding: '12px',
    borderBottom: '2px solid #ddd',
    textAlign: 'center',
    position: 'sticky',
    top: 0,
    
  };
  
  const cellStyle = {
    padding: '10px',
    borderBottom: '1px solid #eee'
  };
  
  export default Pulse;
  