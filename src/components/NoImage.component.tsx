import React from "react";
import NoImageIcom from "../assets/no-image.svg";
import "../scss/components/NoImage.scss";

export const NoImageComponent = () => {
  return (
    <div className="no_image_component_container">
      <NoImageIcom />
      <p className="label_no_image">No images</p>
    </div>
  );
};
