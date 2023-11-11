import { FirebaseStorage, listAll, ref } from "firebase/storage";

export const getAllSubFolders = async (
  storage: FirebaseStorage,
  root: string
): Promise<string[]> => {
  const rootRef = ref(storage, root);
  const subfolders = (await listAll(rootRef)).prefixes.map((prefix) =>
    prefix.fullPath.replace(root, "")
  );
  return subfolders;
};
