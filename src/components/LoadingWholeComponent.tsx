import React from "react";
import { LoadingProps } from "../models/models";
import "../scss/components/LoadingWhole.scss";

export const LoadingWholeCOmponent = ({ title, loadingRef }: LoadingProps) => {
  return (
    <div className="loading_whole_component_container" ref={loadingRef}>
      <div className="loading_container">
        <h1 className="title_loading">{title}</h1>
        <div className="progress_bar">
          <div className="inner_progress_bar"></div>
        </div>
      </div>
    </div>
  );
};
