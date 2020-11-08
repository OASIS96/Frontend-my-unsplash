import { DropzoneInputProps, DropzoneRootProps } from "react-dropzone";
import { DeepMap, FieldError } from "react-hook-form";



export interface PropsAddForm {
  formContainerRef: React.RefObject<HTMLDivElement>;
}

export interface DataForm {
  description: string;
  image: File;
}

export interface Photo {
  _id: string;
  createdAt: string;
  description: string;
  image: Image;
  updatedAt: string;
}

export interface Image {
  _id: string;
  createdAt: string;
  updatedAt: string;
  format: string;
  photo: Photo | string;
  public_id: string;
  secure_url: string;
  type: string;
}

export interface LoadingProps {
  title: string;
  loadingRef: React.RefObject<HTMLDivElement>;
}

export interface HeaderProps {
  searchString: string;
  setSearchString: React.Dispatch<React.SetStateAction<string>>;
}

export interface GalleryProps {
  searchString: string;
}

export interface AddFormJSXProps {
  closeForm: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  formContainerRef: React.RefObject<HTMLDivElement>
  formRef: React.RefObject<HTMLFormElement>
  register: any
  errors: DeepMap<Record<string, any>, FieldError>
  getRootProps: (props?: DropzoneRootProps | undefined) => DropzoneRootProps
  isDragActive: boolean
  getInputProps: (props?: DropzoneInputProps | undefined) => DropzoneInputProps
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  imgPreview: string
  handleSubmit: any
  onSubmit: (data: DataForm) => Promise<void>
  LoadingContainer: React.RefObject<HTMLDivElement>,
  image: File | undefined
  validateSize: (value:any)=> boolean
}
