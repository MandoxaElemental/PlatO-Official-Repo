import { useState, useEffect } from 'react';
import { getToken, updateUserItem } from '../Utils/DataServices';
import { IUserData } from '../Utils/Interfaces';
import Image from 'next/image';

interface SaveButtonProps {
  postId: number;
  currentUser: IUserData | null;
  onUpdate?: (user: IUserData) => void;
}

const SaveButton = ({ postId, currentUser, onUpdate }: SaveButtonProps) => {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setIsSaved(currentUser.savedRecipes?.includes(postId));
    }
  }, [currentUser, postId]);

  const handleSave = async () => {
    if (!currentUser) return;
    const { salt, hash, ...rest } = currentUser;

    const updatedSavedRecipes = isSaved
      ? currentUser.savedRecipes.filter((id) => id !== postId)
      : [...new Set([...(currentUser.savedRecipes || []), postId])];

      const updatedUser: IUserData = {
        ...rest,
        salt,
        hash,
        savedRecipes: updatedSavedRecipes,
      };

    try {
      const success = await updateUserItem(updatedUser, getToken());
      if (success) {
        setIsSaved(!isSaved);
        if (onUpdate) onUpdate(updatedUser);
        alert(isSaved ? "Removed from saved recipes" : "Saved to recipes");
      }
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  return (
    <div className="flex items-center cursor-pointer" onClick={handleSave}>
        <Image width={20} height={20} className="h-5 w-5 dark:invert" src={isSaved ? "/assets/bookmark-fill.svg" : "/assets/bookmark.svg"} alt="save"/>
        <p className="pl-2">{isSaved ? "Saved" : "Save"}</p>
    </div>
  );
};

export default SaveButton;