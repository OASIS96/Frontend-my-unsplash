import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { channel } from "../app";
import axios from "axios";
import "../scss/components/Gallery.scss";
import DeleteIcon from "../assets/borrar.svg";
import { GalleryProps, Photo } from "../models/models";
import { LoadingWholeCOmponent } from "./LoadingWholeComponent";
import { environments } from "../environments/environments";
import { NoImageComponent } from "./NoImage.component";

export const GalleryComponent = ({ searchString }: GalleryProps) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const loadingRef = useRef<HTMLDivElement>(null);

  const getPhotos = async () => {
    try {
      const { data } = await axios.get<Photo[]>(
        `${environments.BACKEND_URI}/api/photos`
      );
      setPhotos(data);
    } catch (err) {
      return err;
    }
  };

  const deletePhoto = async (photo: Photo) => {
    loadingRef.current?.classList.add("visible");
    try {
      await axios.delete<Photo>(
        `${environments.BACKEND_URI}/api/photos/${photo._id}`
      );
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    getPhotos();
    channel.bind("new_photo", () => {
      getPhotos();
    });
    channel.bind("deleted_photo", () => {
      loadingRef.current?.classList.remove("visible");
      getPhotos();
    });
  }, []);

  const filteredPhotos = useMemo(() => {
    if (!searchString) {
      return photos;
    }

    return photos.filter((photo) => {
      return (
        photo.description
          .toLowerCase()
          .replace(/ /g, "")
          .indexOf(searchString.toLowerCase().replace(/ /g, "")) !== -1
      );
    });
  }, [searchString, photos]);

  return (
    <Fragment>
      {filteredPhotos.length > 0 ? (
        <div className="gallery_component_container">
          {filteredPhotos.map((photo) => {
            return (
              <div className="box fadeIn" key={photo._id}>
                <div className="image_container">
                  <img src={photo.image.secure_url} alt="" />
                </div>
                <div className="hover_container">
                  <div
                    className="btn_delete"
                    onClick={() => deletePhoto(photo)}
                  >
                    <DeleteIcon />
                  </div>
                  <p className="description">{photo.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <NoImageComponent />
      )}
      <LoadingWholeCOmponent title="Deleting Image" loadingRef={loadingRef} />
    </Fragment>
  );
};
