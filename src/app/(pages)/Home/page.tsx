import Link from "next/link";
import Post from "@/app/Components/Post";
import Recommended from "@/app/Components/Recommended";

export default function Home() {
  return (
    <div className="pt-10">
      <Post post={<img src="./assets/burger.png" alt="post" />}/>
      <Post post={
        <div>
          <div className='font-semibold text-2xl pb-2'>- Recipe -</div>
        <img className='object-cover h-[150px] w-full' src="./assets/chocolate-cake.png" alt="post" />
        <p className='font-semibold text-2xl p-2'>Moist Chocolate Cake</p>
        <div className='flex items-center justify-center'>
            <img className='h-8 w-8 px-1' src="./assets/star.svg" alt="star" />
            <img className='h-8 w-8 px-1' src="./assets/star.svg" alt="star" />
            <img className='h-8 w-8 px-1' src="./assets/star.svg" alt="star" />
            <img className='h-8 w-8 px-1' src="./assets/star.svg" alt="star" />
            <img className='h-8 w-8 px-1' src="./assets/star.svg" alt="star" />
        </div>
        <div className='p-2 text-left'>Indulge in the rich, velvety goodness of our homemade chocolate cake recipe, perfect for any occasion. This delightful treat features layers of moist chocolate sponge, complemented by a luscious chocolate frosting that melts in your mouth.</div>
        <Link className='text-blue-600 text-xl underline pb-2' href={"#"}>Read Full Recipe</Link></div>}/>
        <Recommended/>
    </div>
  );
}
