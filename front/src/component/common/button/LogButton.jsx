import "./LogButton.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function LogButton({ imgSrc, description, href}) {
  return (
    <>
      <Link to={href} className="common-basic-btn">
        <div className="common-basic-btn-img-wrapper">
          <img
            src={imgSrc}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </div>
        <div className="common-basic-btn-des"> {description}</div>
        <div className="common-basic-btn-icon">
          <span className="material-symbols-outlined font-xl">chevron_right</span>
        </div>
      </Link>

    </>
  );
}
