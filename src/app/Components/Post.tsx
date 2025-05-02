import { Button } from 'flowbite-react'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import { IBlogItems } from '../Utils/Interfaces';
import { getToken, updateBlogItem } from '../Utils/DataServices';

const Post = ({ blog }: { blog: IBlogItems }) => {
    const [likes, setLikes] = useState(blog.numberOfLikes);
    const [liked, setLiked] = useState(false);
  
    const handleLike = async () => {
      const updatedLikes = liked ? likes - 1 : likes + 1;
      const updatedBlog: IBlogItems = { ...blog, numberOfLikes: updatedLikes };
  
      try {
        await updateBlogItem(updatedBlog, getToken());
        setLikes(updatedLikes);
        setLiked(!liked);
      } catch (error) {
        console.error('Error updating likes:', error);
      }
    };
  
    return (
      <div className='text-center max-w-[500px] border-t-1 border-solid border-slate-300'>
        <div className='flex justify-between items-center py-2 px-5'>
          <div className='flex items-center'>
            <div className='rounded-full bg-green-500 w-10 h-10 flex justify-center items-center'>
              <Image width={50} height={50} src="/assets/person.svg" alt="profilePic" />
            </div>
            <Link href={`/Profile/${blog.publisherName}`} className='pl-3 cursor-pointer'>
              {blog.publisherName}
            </Link>
          </div>
          <Button className="rounded-md bg-blue-200 hover:bg-blue-400 text-black cursor-pointer dark:bg-blue-100 dark:hover:bg-blue-200">
            Follow
          </Button>
        </div>
  
        {blog.postType !== 'recipe' ? (
          <Link href={`/Blog/${blog.id}`}>
            <Image
              src={String(blog.image)}
              alt="post"
              className="aspect-square object-cover object-center"
              width={500}
              height={500}
            />
          </Link>
        ) : (
          <div>
            <div className='font-semibold text-2xl pb-2'>- Recipe -</div>
            <Image className='object-cover h-[200px] w-full' src={String(blog.image)} alt="post" width={50} height={20} />
            <p className='font-semibold text-2xl p-2'>{blog.recipeName}</p>
            <div className='p-2 text-left'>{blog.description}</div>
            <Link className='text-blue-600 text-xl underline pb-2' href={`/Blog/${blog.id}`}>Read Full Recipe</Link>
          </div>
        )}
  
        <div className='flex justify-evenly p-2 pt-5'>
          <div className="flex items-center cursor-pointer" onClick={handleLike}>
            <Image
              width={20}
              height={20}
              className="h-5 w-5"
              src={liked ? "/assets/heart-fill.svg" : "/assets/heart.svg"}
              alt="like"
            />
            <p className="pl-2">{liked ? 'Liked' : 'Like'} ({likes})</p>
          </div>
          <div className="flex items-center">
            <Image width={20} height={20} className="h-5 w-5" src="/assets/chat-left.svg" alt="comment" />
            <p className="pl-2">Comment</p>
          </div>
          <div className="flex items-center">
            <Image width={20} height={20} className="h-5 w-5" src="/assets/repeat.svg" alt="share" />
            <p className="pl-2">Share</p>
          </div>
        </div>
      </div>
    );
  };
  
export default Post;
  