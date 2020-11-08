import axios from "axios";
import { DataForm } from "../models/models";

export const useHttp = async (
  url: string,
  { description, image }: DataForm
) => {
  try {
    const newData = new FormData();
    newData.append("image", image);
    newData.append("description", description);

    const { data } = await axios.post<any>(url, newData);
    return data;
  } catch (err) {
    return err;
  }
};
