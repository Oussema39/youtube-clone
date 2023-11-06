import { FirebaseStorage, getDownloadURL, list, ref } from "firebase/storage";

export const getAllVideosURLs = async (
  storage: FirebaseStorage,
  url: string
): Promise<string[]> => {
  const videosListRef = ref(storage, url);
  try {
    const videosList = await list(videosListRef);
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
