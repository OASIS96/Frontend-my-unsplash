import React, { useRef, useState } from "react";
import "../scss/components/AddForm.scss";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { useHttp } from "../hooks/useSocket";
import { DataForm, PropsAddForm } from "../models/models";
import { environments } from "../environments/environments";
import { AddFormJSX } from "./AddFormJSX";

export const AddFormComponent = ({ formContainerRef }: PropsAddForm) => {
  const [imgPreview, setImgPreview] = useState("");
  const { reset, register, handleSubmit, errors } = useForm();
  const [image, setImage] = useState<File>();
  const LoadingContainer = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const onDrop = (acceptedFiles: File[]) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      setImgPreview(e.target?.result as string);
    };

    reader.readAsDataURL(acceptedFiles[0]);
    //Creating new FileList
    const list = new DataTransfer();
    const newFile = new File(["content"], acceptedFiles[0].name);
    list.items.add(newFile);

    const myFileList = list.files;
    const fileInput = document.getElementById("inputFile") as HTMLInputElement;
    fileInput.files = myFileList;
    setImage(acceptedFiles[0]);
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
  } = useDropzone({ onDrop });

  const closeForm = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === formContainerRef.current) {
      formContainerRef.current.classList.remove("open");
      reset();
      setImgPreview("");
      acceptedFiles.splice(0);
    }
  };

  const validateSize = (value:any) => {
    return image?image.size>4000000?false:true:false
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.item(0)) {
      const reader = new FileReader();

      reader.readAsDataURL(e.target.files?.item(0) as File);

      reader.onload = (e) => {
        setImgPreview(e.target?.result as string);
      };
      setImage(e.target.files.item(0) as File);
    }
  };

  const onSubmit = async (data: DataForm) => {
    formRef.current?.classList.add("hidden");
    LoadingContainer.current?.classList.add("visible");

    const newData: DataForm = {
      description: data.description,
      image: image as File,
    };

    await useHttp(`${environments.BACKEND_URI}/api/photos`, newData);

    LoadingContainer.current?.classList.remove("visible");
    formRef.current?.classList.remove("hidden");
    formContainerRef.current?.classList.remove("open");

    reset();
    setImgPreview("");
    acceptedFiles.splice(0);
  };

  return (
    <AddFormJSX  closeForm={closeForm}
    formContainerRef={formContainerRef}
    formRef={formRef}
    register={register}
    errors={errors}
    getRootProps={getRootProps}
    isDragActive={isDragActive}
    getInputProps={getInputProps}
    onChange={onChange}
    imgPreview={imgPreview}
    handleSubmit={handleSubmit}
    onSubmit={onSubmit}
    LoadingContainer={LoadingContainer}
    image={image}
    validateSize={validateSize}
    />
  );
};
