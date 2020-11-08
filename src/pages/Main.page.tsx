import React, { useState } from "react";
import { GalleryComponent } from "../components/GalleryComponent";
import { HeaderComponent } from "../components/Header.component";

export const MainPage = () => {
  const [searchString, setSearchString] = useState("");

  return (
    <div className="main_page_container">
      <HeaderComponent
        searchString={searchString}
        setSearchString={setSearchString}
      />
      <GalleryComponent searchString={searchString} />
    </div>
  );
};
