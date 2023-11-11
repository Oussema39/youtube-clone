import {
  FirebaseStorage,
  getDownloadURL,
  list,
  listAll,
  ref,
} from "firebase/storage";
import { getAllSubFolders } from "./getAllSubFolders";

export const getAllVideosURLs = async (
  storage: FirebaseStorage,
  url: string
): Promise<string[]> => {
  try {
    const subfolders = await getAllSubFolders(storage, url);

    const videosList = await Promise.all(
      subfolders.map((folder) => list(ref(storage, folder)))
    );

    const videosUrls = await Promise.all(
      videosList.items.map((video) =>
        getDownloadURL(ref(storage, video.fullPath))
      )
    );

    return videosUrls;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong fetching videos");
  }
};
