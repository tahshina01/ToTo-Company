"use client";

import styles from "@/app/services/accommodation/yourHotels/addHotel/HotelPage.module.css";
import { useState, useRef, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { FaCamera } from "react-icons/fa";
import { useGlobals } from "@/contexts/Globals";
import { useRouter } from "next/navigation";
import { UserData } from "@/app/services/accommodation/yourHotels/addHotel/page";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";

const EditHotelDialog = ({ hotel }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [imgStream, setImgStream] = useState("");
  const [warning, setWarning] = useState("");
  const fileInputRef = useRef(null);
  const dialogRef = useRef(null);
  const { setToastMessage } = useGlobals();
  const router = useRouter();
  const [isEditing] = useState(false);

  useEffect(() => {
    setName(hotel.name);
    setPhone(hotel.mobile);
    setAddress(hotel.address);
    setProfilePic(hotel.image ? hotel.image : null);
    setWarning("");
    setImgStream(hotel.image ? `data:image/jpeg;base64,${hotel.image}` : null);
  }, [hotel]);

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
    formData.append("id", hotel.id);
    formData.append("name", name);
    formData.append("address", address);
    formData.append("mobile", phone);
    formData.append("file", profilePic);
    formData.append("owner", jwtDecode(localStorage.getItem("token")).sub);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/hotel/editHotel`,
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
        setToastMessage("Hotel updated successfully");
        dialogRef.current.click();
        window.location.reload();
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="font-bold text-sm py-1 px-2 bg-gray-600 hover:bg-slate-900 text-white rounded ml-auto"
          ref={dialogRef}
        >
          Edit
        </button>
      </DialogTrigger>
      <DialogTitle></DialogTitle>
      <DialogContent className="sm:max-w-[550px] max-h-[96svh] overflow-y-auto">
        <form className={styles.profilePage} encType="multipart/form-data">
          <div className={styles.profileContainer}>
            <div className={styles.profileHeader}>
              <div className={`relative ${isEditing ? "" : "mr-5"}`}>
                {imgStream !== "" ? (
                  <img src={imgStream} alt="" className={styles.profileImage} />
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
      </DialogContent>
    </Dialog>
  );
};

export default EditHotelDialog;
