import { Button } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { getToken, updateUserItem } from '../Utils/DataServices';
import { IUserData } from '../Utils/Interfaces';

interface FollowButtonProps {
  targetUserId: number;
  currentUser: IUserData | null;
  onUpdate?: (user: IUserData) => void;
}

const FollowButton = ({ targetUserId, currentUser, onUpdate }: FollowButtonProps) => {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setIsFollowing(currentUser.following?.includes(targetUserId));
    }
  }, [currentUser, targetUserId]);

  const handleFollow = async () => {
    if (!currentUser) return;

    const updatedFollowing = isFollowing
      ? currentUser.following.filter((id) => id !== targetUserId)
      : [...new Set([...(currentUser.following || []), targetUserId])];

    const updatedUser: IUserData = {
      ...currentUser,
      following: updatedFollowing,
      ...(currentUser.salt && { salt: currentUser.salt }),
      ...(currentUser.hash && { hash: currentUser.hash }),
    };

    try {
      const success = await updateUserItem(updatedUser, getToken());
      if (success) {
        setIsFollowing(!isFollowing);
        if (onUpdate) onUpdate(updatedUser);
        alert(isFollowing ? "Unfollowed" : "Following");
      }
    } catch (error) {
      console.error('Error updating follow status:', error);
    }
  };

  return (
    <Button
      className={`rounded-md ${isFollowing ? "bg-red-200 hover:bg-red-400" : "bg-blue-200 hover:bg-blue-400"} rounded-full h-8 text-black cursor-pointer dark:bg-blue-100 dark:hover:bg-blue-200`}
      onClick={handleFollow}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default FollowButton;
