import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
    return (
        <nav style={{ position: "fixed", top: 0, width: "100%", backgroundColor: "#fff", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", padding: "1rem 0" }}>
            <ul style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "90%", margin: "auto", listStyle: "none", padding: 0 }}>
            <Link to ="/">
                <li style={{ color: "#4CAF50", textTransform: "capitalize",textDecoration:"none", fontWeight: "bold", fontSize: "20px" }}>ELSA</li>
                </Link>
                {/* <li style={{ display: "flex", gap: "20px" }}>
                <Link to = "/medicine">
                    <div style={{ textDecoration:"none",cursor: "pointer", fontSize: "16px", color: "#333" }}>Add Medicine</div>
                    </Link>
                    <div style={{textDecoration:"none", cursor: "pointer", fontSize: "16px", color: "#333" }}>Pulse Tracker</div>
                </li> */}
            </ul>
        </nav>
    );
}

export default Navbar;
