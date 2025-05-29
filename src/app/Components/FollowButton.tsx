import { Button } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { getToken, followUser } from '../Utils/DataServices';
import { IUserData } from '../Utils/Interfaces';

interface FollowButtonProps {
  targetUserId: number;
  currentUser: IUserData | null;
  onUpdate: (isNowFollowing: boolean) => void;
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

    const success = await followUser(currentUser.id, targetUserId, getToken());

    if (success) {
      const nowFollowing = !isFollowing;
      setIsFollowing(nowFollowing);
      if (onUpdate) onUpdate(nowFollowing);
      alert(nowFollowing ? "Following" : "Unfollowed");
    }
  };

  return (
    <Button
      className={`rounded-md ${
        isFollowing ? "hover:bg-orange-400 bg-white border-2 border-orange-200" : "bg-orange-200 hover:bg-orange-400"
      } rounded-full h-8 text-black cursor-pointer dark:bg-orange-100 dark:hover:bg-orange-200`}
      onClick={handleFollow}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default FollowButton;
