import Link from "next/link";

export function MobileFooter() {
  return (
    <div className="sticky bottom-0 block md:hidden">
      <div className="flex bg-blue-200 h-15 p-2 justify-around">
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
