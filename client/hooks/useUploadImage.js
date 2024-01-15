import { useState } from "react";
import { fetchAuthenticatedApi } from "../utils/api";

export default function useUploadImage() {
  const [previewSource, setPreviewSource] = useState("");
  const [fileInputState, setFileInputState] = useState("");
  const [progress, setProgress] = useState(0);
  const handleFileInputChange = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const file = e.target.files[0] || e.dataTransfer.files[0];
    setFileInputState(e.target.value);
    previewFile(file);
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  const uploadImage = async () => {
    try {
      const response = await fetchAuthenticatedApi({
        url: "/upload",
        method: "POST",
        data: {
          img: previewSource,
          preset: "sieu_am",
        },
      });
      return response;
    } catch (e) {
      console.log(e);
    }
  };
  const handleRemovePreviewImage = () => {
    setPreviewSource("");
    setFileInputState("");
  };
  return {
    handleFileInputChange,
    uploadImage,
    fileInputState,
    previewSource,
    handleRemovePreviewImage,
    progress,
  };
}
