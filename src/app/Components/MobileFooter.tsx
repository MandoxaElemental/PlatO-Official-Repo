import Link from "next/link";

export function MobileFooter() {
  return (
    <div className="sticky bottom-0 block md:hidden bg-blue-200">
      <div className="flex h-16 p-2 justify-around items-center">
        <Link href={"/Home"}>
          <div>Home</div>
        </Link>
        <Link href={"/Discover"}>
          <div>Discover</div>
        </Link>
        <Link href={"/NewPost"}>
          <div>Post</div>
        </Link>
        <Link href={"/Notifications"}>
          <div>Notifications</div>
        </Link>
      </div>
    </div>
  );
}

