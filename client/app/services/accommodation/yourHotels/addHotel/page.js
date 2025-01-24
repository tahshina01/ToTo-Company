// app/profile/page.js
"use client";

import styles from "./HotelPage.module.css";
import { useState, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { FaCamera } from "react-icons/fa";
import { useGlobals } from "@/contexts/Globals";
import PreviewItem from "@/app/Components/PreviewItem";
import { IoMdAddCircle } from "react-icons/io";
import { useRouter } from "next/navigation";

const UserData = ({ label, value, flag, setValue, setWarning }) => {
  return (
    <div className={styles.detail}>
      <strong>
        {label}:{<span className="text-red-500">*</span>}
      </strong>
      <input
        type={flag ? "number" : "text"}
        className="w-full outline-none font-sans cursor-pointer"
        placeholder={`Enter ${label.toLowerCase()}`}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setWarning("");
        }}
      />
    </div>
  );
};

export default function AddHotelPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [imgStream, setImgStream] = useState("");
  const [warning, setWarning] = useState("");
  const fileInputRef = useRef(null);
  const { setToastMessage } = useGlobals();
  const attachmentsInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const router = useRouter();

  const handleAttachmentsChange = (event) => {
    const files = event.target.files;
    const filesArray = Array.from(files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    setWarning("");

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImgStream(reader.result);
    };
  };

  const handleSubmit = async () => {
    if (name === "" || address === "" || phone === "") {
      setWarning("Fill necessary information");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("address", address);
    formData.append("mobile", phone);
    formData.append("file", profilePic);
    formData.append("owner", jwtDecode(localStorage.getItem("token")).sub);
    selectedFiles.forEach((file) => {
      formData.append("documents", file);
    });

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/hotel/regHotel`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status == 200) {
        setWarning("");
        setToastMessage("Application submitted successfully");
        router.push("/services/accommodation/yourHotels");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <form className={styles.profilePage} encType="multipart/form-data">
      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <div className={`relative ${isEditing ? "" : "mr-5"}`}>
            {imgStream !== "" ? (
              <img
                src={imgStream}
                alt="User Profile"
                className={styles.profileImage}
              />
            ) : (
              <div className={styles.profileImage} />
            )}
            <span
              className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 p-[5px] rounded-full bg-white border-[1px] border-black cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              <FaCamera className="text-gray-700 text-[1.1rem]" />
            </span>
            <input
              className="hidden"
              type="file"
              id="profilePic"
              name="profilePic"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className={styles.profileDetails}>
          <p className="text-center mb-[6px] text-red-500">{warning}</p>
          <UserData
            label="Name"
            value={name}
            flag={false}
            setValue={setName}
            setWarning={setWarning}
            isEditing={isEditing}
          />
          <UserData
            label="Phone"
            value={phone}
            flag={true}
            setValue={setPhone}
            setWarning={setWarning}
            isEditing={isEditing}
          />
          <UserData
            label="Address"
            value={address}
            flag={false}
            setValue={setAddress}
            setWarning={setWarning}
            isEditing={isEditing}
          />
          <strong style={{ color: "#333" }} className={styles.detail}>
            Add Document Images :{" "}
          </strong>
          <div className={styles.postAttachment}>
            {selectedFiles.map((file, index) => (
              <PreviewItem
                key={index}
                file={file}
                onRemove={() => handleRemoveFile(index)}
              />
            ))}
          </div>
          <input
            type="file"
            name="postAttachments"
            multiple
            className="hidden"
            ref={attachmentsInputRef}
            onChange={handleAttachmentsChange}
            accept="image/*"
          />
          <div
            onClick={() => attachmentsInputRef.current.click()}
            className={`ml-auto flex font-sans text-gray-700 px-3 py-2 rounded-full shadow-md shadow-gray-400 bg-slate-200 hover:bg-slate-300 cursor-pointer items-center w-[10rem] mt-2`}
          >
            <IoMdAddCircle className="text-lg mr-2" />
            <p className="font-bold truncate text-sm">Add Images</p>
          </div>
        </div>
      </div>
      <div className={styles.updateButtonContainer}>
        <div
          className={styles.updateProfileBtn}
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </div>
      </div>
    </form>
  );
}
