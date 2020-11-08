import React from "react";
import { AddFormJSXProps } from "../models/models";
import { LoadingComponent } from "./LoadingComponent";

export const AddFormJSX = ({
  closeForm,
  formContainerRef,
  formRef,
  register,
  errors,
  getRootProps,
  isDragActive,
  getInputProps,
  onChange,
  imgPreview,
  handleSubmit,
  onSubmit,
  LoadingContainer,
  validateSize
}: AddFormJSXProps) => {
  return (
    <div
      className="addform_component_container"
      onClick={closeForm}
      ref={formContainerRef}
    >
      <form className="form" ref={formRef}>
        <h1 className="title_form">Add a new Photo</h1>
        <div className="input_control">
          <div className="input_container ">
            <input
              type="text"
              required
              name="description"
              autoComplete="off"
              className="inputDescr"
              ref={register({
                required: true,
              })}
            />
            <label>
              <span>Description</span>
            </label>
          </div>
          {errors.description ? (
            <p className="danger_message fadeIn">Enter the description</p>
          ) : null}
        </div>

        <div className="inputfile_control">
          <label
            htmlFor="inputFile"
            {...getRootProps({
              className: isDragActive ? "dropzone dragOn" : "dropzone",
            })}
          >
            <input
              {...getInputProps({ onChange: onChange })}
              type="file"
              name="image"
              id="inputFile"
              ref={register({
                required: true,
                validate: validateSize,
              })}
            />
            <p>Upload a photo</p>
            {imgPreview ? <img src={imgPreview} alt="" /> : null}
          </label>
          {errors.image ? (
            errors.image.type === "required" ? (
              <p className="danger_message fadeIn">Upload a photo</p>
            ) : null
          ) : null}
          {errors.image ? (
            errors.image.type === "validate" ? (
              <p className="danger_message fadeIn">Maxim Size is 4 MB</p>
            ) : null
          ) : null}
        </div>

        <button
          type="submit"
          className="btn_send"
          onClick={handleSubmit(onSubmit)}
        >
          Crear
        </button>
      </form>
      <LoadingComponent title="Uploading Image" loadingRef={LoadingContainer} />
    </div>
  );
};
