import React, { useState } from "react";

const UploadPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ padding: "2rem", marginTop: "40px" }}>
      <div
        style={{
          border: "2px dashed #aaa",
          padding: "2rem",
          borderRadius: "10px",
          textAlign: "center",
          maxWidth: "400px",
          margin: "2rem auto",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2 style={{marginTop: "0px"}}>Upload an Image</h2>
        <input
          type="file"
          accept="image/*"
          id="fileUpload"
          onChange={handleImageChange}
          style={{ marginTop: "1rem" }}
        />
      </div>
      {selectedImage && (
        <div style={{ marginTop: "1rem" }}>
          <p>Image Preview:</p>
          <img
            src={selectedImage}
            alt="Preview"
            style={{ maxWidth: "300px", borderRadius: "8px" }}
          />
        </div>
      )}
    </div>
  );
};

export default UploadPage;
