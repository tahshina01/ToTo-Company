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
import { IoMdAddCircle } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname } from "next/navigation";

const AddRoomDialog = ({ dialogRef, isEdit, room }) => {
  const [roomNumber, setRoomNumber] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [warning, setWarning] = useState("");
  const fileInputRef = useRef(null);
  const { setToastMessage } = useGlobals();
  const router = useRouter();
  const [isEditing] = useState(false);
  const [prevAttachments, setPrevAttachments] = useState([]);
  const [newAttachments, setNewAttachments] = useState([]);
  const imageRef = useRef([]);
  const imageRef2 = useRef([]);
  const [previewFiles, setPreviewFiles] = useState([]);
  const roomTypes = [
    "Single",
    "Double",
    "Triple",
    "Master Suite",
    "Presidential Suite",
  ];
  const pathname = usePathname();

  const handleFileChange = (event) => {
    const files = event.target.files;
    const filesArray = Array.from(files);
    setNewAttachments((prevFiles) => [...prevFiles, ...filesArray]);

    filesArray.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreviewFiles((prevFiles) => [...prevFiles, reader.result]);
      };
    });
  };

  const toggleFullscreen = (imageElement) => {
    if (!document.fullscreenElement) {
      if (imageElement.requestFullscreen) {
        imageElement.requestFullscreen();
      } else if (imageElement.mozRequestFullScreen) {
        imageElement.mozRequestFullScreen();
      } else if (imageElement.webkitRequestFullscreen) {
        imageElement.webkitRequestFullscreen();
      } else if (imageElement.msRequestFullscreen) {
        imageElement.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const handleSubmit = async () => {
    if (
      roomNumber === "" ||
      price === "" ||
      category === "" ||
      description === ""
    ) {
      setWarning("Fill necessary information");
      return;
    }

    const formData = new FormData();
    const hotelId = pathname.split("/").pop();
    formData.append("hotelId", hotelId);
    formData.append("roomNumber", roomNumber);
    formData.append("price", price);
    formData.append(
      "roomType",
      category === "Single"
        ? "SINGLE"
        : category == "Double"
        ? "DOUBLE"
        : category == "Triple"
        ? "TRIPLE"
        : category == "Master Suite"
        ? "MASTER_SUITE"
        : "PRESIDENTIAL_SUITE"
    );
    formData.append("description", description);
    newAttachments.forEach((file) => {
      formData.append("attachments", file);
    });

    if (isEdit) {
      formData.append("id", room.id);
      prevAttachments.forEach((file) => {
        formData.append("prevImages", file.id);
      });
    }

    try {
      let response;
      if (!isEdit) {
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/hotel/addRoom`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/hotel/editRoom`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
      if (response.status == 200) {
        setWarning("");
        if (!isEdit) {
          setToastMessage("Room added successfully");
        } else {
          setToastMessage("Room updated successfully");
        }
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
          className="hidden"
          ref={dialogRef}
          onClick={() => {
            setTimeout(() => {
              if (!isEdit) {
                setPrevAttachments([]);
                setNewAttachments([]);
                setPreviewFiles([]);
                setRoomNumber("");
                setPrice("");
                setCategory("");
                setDescription("");
              } else {
                setPrevAttachments(room.images);
                setNewAttachments([]);
                setPreviewFiles([]);
                setRoomNumber(room.roomNumber);
                setPrice(room.price);
                setCategory(
                  room.roomType === "SINGLE"
                    ? "Single"
                    : room.roomType === "DOUBLE"
                    ? "Double"
                    : room.roomType === "TRIPLE"
                    ? "Triple"
                    : room.roomType === "MASTER_SUITE"
                    ? "Master Suite"
                    : "Pensidential Suite"
                );
                setDescription(room.description);
              }
            }, 100);
          }}
        >
          Edit
        </button>
      </DialogTrigger>
      <DialogTitle></DialogTitle>
      <DialogContent
        className="sm:max-w-[600px] max-h-[96svh] overflow-y-auto p-0"
        style={{ padding: 0 }}
      >
        <form style={{ padding: 0, margin: 0 }} encType="multipart/form-data">
          <div className="w-full p-2 mt-8">
            <div className="w-full">
              <div className="w-full flex overflow-x-auto gap-2 rounded min-h-[9rem] max-h-[9rem] bg-gray-300 p-[6px] py-0">
                {prevAttachments.map((file, index) => (
                  <div
                    className="min-w-[7.8rem] max-w-[7.8rem] h-[6.8rem] flex justify-center items-center bg-white relative rounded mt-1"
                    key={file.id}
                  >
                    <div
                      className="z-10 absolute top-0 right-0 w-[1.6rem] h-[1.6rem] bg-gray-500 hover:bg-gray-600 rounded-full text-white flex justify-center items-center cursor-pointer text-sm"
                      onClick={() => {
                        setPrevAttachments((prevFiles) =>
                          prevFiles.filter((f) => f.id !== file.id)
                        );
                      }}
                    >
                      x
                    </div>
                    <img
                      src={`data:${file.fileType};base64,${file.data}`}
                      alt="file"
                      ref={(el) => (imageRef2.current[index] = el)}
                      onClick={() => toggleFullscreen(imageRef2.current[index])}
                      className="w-[12rem] h-full min-h-full object-cover rounded bg-white mt-3 mr-1"
                    />
                  </div>
                ))}
                {newAttachments.map((file, index) => (
                  <div
                    className="min-w-[7.8rem] max-w-[7.8rem] h-[6.8rem] flex justify-center items-center bg-white relative rounded mt-1"
                    key={index}
                  >
                    <div
                      className="z-10 absolute top-0 right-0 w-[1.6rem] h-[1.6rem] bg-gray-500 hover:bg-gray-600 rounded-full text-white flex justify-center items-center cursor-pointer text-sm"
                      onClick={() => {
                        setNewAttachments((prevFiles) =>
                          prevFiles.filter((_, i) => i !== index)
                        );
                        setPreviewFiles((prevFiles) =>
                          prevFiles.filter((_, i) => i !== index)
                        );
                      }}
                    >
                      x
                    </div>
                    <div key={index}>
                      <img
                        src={previewFiles[index]}
                        alt={file.name}
                        ref={(element) => (imageRef.current[index] = element)}
                        onClick={() =>
                          toggleFullscreen(imageRef.current[index])
                        }
                        className="w-[12rem] h-full min-h-full object-cover rounded bg-white mt-3 mr-1"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <input
              type="file"
              name="postAttachments"
              multiple
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
            />
            <div
              onClick={() => fileInputRef.current.click()}
              className={`ml-auto flex font-sans text-gray-700 px-3 py-2 rounded-full shadow-md shadow-gray-400 bg-slate-200 hover:bg-slate-300 cursor-pointer items-center w-[10rem] mt-2`}
            >
              <IoMdAddCircle className="text-lg mr-2" />
              <p className="font-bold truncate text-sm">Add Images</p>
            </div>
            <div className={styles.profileDetails}>
              <p className="text-center mb-[6px] text-red-500">{warning}</p>
              <UserData
                label="Room Number"
                value={roomNumber}
                flag={true}
                setValue={setRoomNumber}
                setWarning={setWarning}
                isEditing={isEditing}
              />
              <UserData
                label="Price"
                value={price}
                flag={true}
                setValue={setPrice}
                setWarning={setWarning}
                isEditing={isEditing}
              />
              <div className={styles.detail} style={{ borderBottom: "0px" }}>
                <strong>Category:</strong>
                <Select
                  value={category}
                  onValueChange={(value) => setCategory(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {roomTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <UserData
                label="Description"
                value={description}
                flag={false}
                setValue={setDescription}
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

export default AddRoomDialog;
