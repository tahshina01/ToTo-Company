import React from "react";
import styles from "./PreviewItem.module.css";
import { useState } from "react";

const PreviewItem = ({ file, onRemove }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  const handlePreview = () => {
    if (showPreview) {
      setShowPreview(false);
      setPreviewUrl("");
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
        setShowPreview(true);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.previewItem}>
      <div className={styles.fileInfo}>
        <span>{file.name}</span>
        <button
          type="button"
          className="bg-gray-600 hover:bg-gray-900 text-white font-bold rounded-sm text-[0.82rem] py-[2px] px-1"
          onClick={handlePreview}
        >
          Preview
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="bg-red-600 hover:bg-red-900 text-white font-bold rounded-sm text-[0.82rem] py-[2px] px-2"
        >
          x
        </button>
      </div>
      {showPreview && (
        <div className={styles.filePreview}>
          {file.type.startsWith("image/") ? (
            <img src={previewUrl} alt={file.name} />
          ) : file.type.startsWith("video/") ? (
            <video src={previewUrl} controls />
          ) : (
            <span>Unsupported File Type</span>
          )}
        </div>
      )}
    </div>
  );
};

export default PreviewItem;
