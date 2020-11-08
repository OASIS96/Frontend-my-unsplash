import React, { useEffect, useRef } from "react";
import AddIcon from "../assets/add.svg";
import UnsplashIcon from "../assets/unsplash-logo.svg";
import { HeaderProps } from "../models/models";
import "../scss/components/Header.scss";
import { AddFormComponent } from "./AddFormComponent";

export const HeaderComponent = ({
  searchString,
  setSearchString,
}: HeaderProps) => {
  let containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const openForm = () => {
    containerRef.current?.classList.add("open");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (document.documentElement.scrollTop > 100) {
        headerRef.current?.classList.add("down");
      } else {
        headerRef.current?.classList.remove("down");
      }
    });
  }, []);

  return (
    <div className="header_component_container" ref={headerRef}>
      <div className="container">
        <div className="logo_container">
          <UnsplashIcon />
        </div>
        <input
          type="text"
          placeholder="Search"
          className="input_search"
          onChange={handleSearch}
          value={searchString}
        />
        <button className="add_btn" onClick={openForm}>
          <AddIcon />
        </button>

        <AddFormComponent formContainerRef={containerRef} />
      </div>
    </div>
  );
};
