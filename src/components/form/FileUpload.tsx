import { FirebaseStorage, ref, uploadBytes } from "firebase/storage";
import { useFirebase } from "../../context/FirebaseContext";
import { ChangeEvent, createRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import Button from "../Button";
import { ArrowUpFromLine, Info, X } from "lucide-react";

type FileUploadProps = {
  onComplete?: () => void;
  onClose?: () => void;
};

const FileUpload = ({ onComplete, onClose }: FileUploadProps) => {
  const inputRef = createRef<HTMLInputElement>();
  const { storage } = useFirebase();

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const fileRef = ref(storage as FirebaseStorage, `files/${uuidv4()}`);
    try {
      await uploadBytes(fileRef, e.target.files[0]);
      toast.success("File uploaded successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error has occured! Please try again");
    } finally {
      onComplete && onComplete();
    }
  };

  const openFileDialog = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  return (
    <div className="flex flex-col justify-center h-screen absolute isolate inset-0 z-[999] ">
      <div className="lg:hidden fixed inset-0 bg-secondary-dark opacity-50" />
      <div className="flex flex-col h-[90%] bg-white z-10 rounded-lg shadow-2xl">
        <div className="flex justify-between items-center align-baseline pl-6 pr-3 py-2 border-b-[1px] border-b-gray-200">
          <p className="font-medium text-xl">Upload videos</p>
          <div className="flex">
            <Button variant="ghost">
              <Info className="text-gray-500" />
            </Button>
            <Button variant="ghost" onClick={onClose}>
              <X className="text-gray-500 h-8 w-8" />
            </Button>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="relative isolate mb-9">
            <Button
              onClick={openFileDialog}
              variant="ghost"
              className="cursor-pointer rounded-full bg-gray-100 p-8"
            >
              <ArrowUpFromLine className="w-16 h-16 text-gray-400" />
            </Button>
            <input
              // className="absolute inset-0 opacity-0 hover:none"
              ref={inputRef}
              type="file"
              onChange={handleUpload}
              hidden
            />
          </div>
          <p className="text-sm mb-2">Drag and drop video files to upload</p>
          <p className="text-xs mb-8 text-gray-600">
            Your videos will be private until you publish them.
          </p>
          <Button
            onClick={openFileDialog}
            variant="default"
            className="bg-blue-600 hover:bg-blue-600 text-sm px-4 text-white rounded-none uppercase"
          >
            Select Files
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
