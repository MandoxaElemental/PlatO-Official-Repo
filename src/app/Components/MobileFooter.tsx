import Image from "next/image";
import Link from "next/link";

export function MobileFooter() {
  return (
    <div className="sticky bottom-0 block md:hidden bg-[#f9fafb] dark:bg-[#1f2937]">
      <div className="flex h-16 p-2 justify-around items-center">
        <Link href={"/Home"}>
        <div className="flex justify-center pt-2">
          <Image className="h-8 w-8 dark:invert" src="../assets/house.svg" alt="home" width={0} height={100}/>
        </div>
          <div>Home</div>
        </Link>
        <Link href={"/Discover"}>
        <div className="flex justify-center pt-2">
          <Image className="h-8 w-8 dark:invert" src="../assets/search.svg" alt="home" width={0} height={100}/>
        </div>
          <div>Discover</div>
        </Link>
        <Link href={"/NewPost"}>
        <div className="flex justify-center pt-2">
          <Image className="h-8 w-8 dark:invert" src="../assets/camera.svg" alt="home" width={0} height={100}/>
        </div>
          <div>Post</div>
        </Link>
        <Link href={"/Notifications"}>
        <div className="flex justify-center pt-2">
          <Image className="h-8 w-8 dark:invert" src="../assets/bell.svg" alt="home" width={0} height={100}/>
        </div>
          <div>Notifications</div>
        </Link>
      </div>
    </div>
  );
}

