import { FirebaseStorage, getDownloadURL, list, ref } from "firebase/storage";
import { getAllSubFolders } from "./getAllSubFolders";

export const getAllVideosURLs = async (
  storage: FirebaseStorage,
  url: string
): Promise<string[]> => {
  try {
    const subfolders = await getAllSubFolders(storage, url);

    const videosList = await Promise.all(
      subfolders.map((folder) =>
        list(
          ref(storage, `${import.meta.env.VITE_STORAGE_VIDEOS_PATH}${folder}`)
        )
      )
    );

    // Fetch all videos under all subfolders for the videos folder path
    const videosUrls = (
      await Promise.all(
        videosList.map(
          async (list) =>
            await Promise.all(
              list.items.map((video) =>
                getDownloadURL(ref(storage, video.fullPath))
              )
            )
        )
      )
    ).flat(1);

    return videosUrls;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong fetching videos");
  }
};
