import React from "react";
import img1 from "../assets/images/crouselimg/13.jpg";
import img2 from "../assets/images/crouselimg/11.jpg";
import img3 from "../assets/images/crouselimg/10.jpg";

function Crousel() {
  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide"
      data-bs-ride="carousel"
      style={{ height: "70vh" }} // 50% of viewport height
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to={0}
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        />
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to={1}
          aria-label="Slide 2"
        />
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to={2}
          aria-label="Slide 3"
        />
      </div>

      <div className="carousel-inner" style={{ height: "100%" }}>
        {[img1, img2, img3].map((img, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
            style={{ height: "100%" }}
          >
            <img
              src={img}
              className="d-block w-100"
              alt={`Slide ${index + 1}`}
              style={{
                height: "100%",      // Fill 50vh container
                width: "100%",       // Full width
                objectFit: "cover",  // Maintain aspect ratio, cover space
              }}
            />
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Crousel;
