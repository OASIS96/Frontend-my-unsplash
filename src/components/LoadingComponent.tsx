import React from "react";
import { LoadingProps } from "../models/models";
import "../scss/components/Loading.scss";

export const LoadingComponent = ({ title, loadingRef }: LoadingProps) => {
  return (
    <div className="loading_component_container" ref={loadingRef}>
      <h1 className="title_loading">{title}</h1>
      <div className="progress_bar">
        <div className="inner_progress_bar"></div>
      </div>
    </div>
  );
};
