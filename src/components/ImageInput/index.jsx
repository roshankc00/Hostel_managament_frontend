import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const ImageInput = ({ onImageChange }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      onImageChange(file);
    },
    [onImageChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <div
      {...getRootProps()}
      className="border-dashed border-2 px-4 py-8 rounded-md text-center cursor-pointer"
    >
      <input {...getInputProps()} />
      <p className="text-gray-500">
        Drag and drop <br />
        or select image
      </p>
    </div>
  );
};

export default ImageInput;
