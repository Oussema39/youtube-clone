import { FirebaseStorage, ref, uploadBytes } from "firebase/storage";
import { useFirebase } from "../../context/FirebaseContext";
import { ChangeEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

type FileUploadProps = {
  onComplete?: () => void;
};

const FileUpload = ({ onComplete }: FileUploadProps) => {
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

  return (
    <div>
      <p>FileUpload</p>
      <input
        type="file"
        // accept="video/mp4,video/x-m4v,video/*"
        onChange={handleUpload}
      />
    </div>
  );
};

export default FileUpload;
