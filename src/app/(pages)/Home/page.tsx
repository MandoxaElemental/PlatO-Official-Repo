import Link from "next/link";
import Post from "@/app/Components/Post";
import Recommended from "@/app/Components/Recommended";
import Image from "next/image";

export default function Home() {
  return (
    <div className="pt-10">
      <Post post={<Image src="/assets/burger.png" alt="post" width={500} height={500}/>}/>
      <Post post={
        <div>
          <div className='font-semibold text-2xl pb-2'>- Recipe -</div>
        <Image className='object-cover h-[500px] w-full' src="/assets/chocolate-cake.png" alt="post" width={50} height={50}/>
        <p className='font-semibold text-2xl p-2'>Moist Chocolate Cake</p>
        <div className='flex items-center justify-center'>
            <Image className='h-8 w-8 px-1' src="./assets/star.svg" alt="star"  width={500} height={500}/>
            <Image className='h-8 w-8 px-1' src="./assets/star.svg" alt="star"  width={500} height={500}/>
            <Image className='h-8 w-8 px-1' src="./assets/star.svg" alt="star"  width={500} height={500}/>
            <Image className='h-8 w-8 px-1' src="./assets/star.svg" alt="star"  width={500} height={500}/>
            <Image className='h-8 w-8 px-1' src="./assets/star.svg" alt="star"  width={500} height={500}/>
        </div>
        <div className='p-2 text-left'>Indulge in the rich, velvety goodness of our homemade chocolate cake recipe, perfect for any occasion. This delightful treat features layers of moist chocolate sponge, complemented by a luscious chocolate frosting that melts in your mouth.</div>
        <Link className='text-blue-600 text-xl underline pb-2' href={"#"}>Read Full Recipe</Link></div>}/>
        <Recommended/>
    </div>
  );
}
