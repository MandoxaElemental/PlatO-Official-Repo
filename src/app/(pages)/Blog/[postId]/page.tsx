'use client'

import React, { useEffect, useState } from 'react'
import Image from "next/image";
import BlogPost from '@/app/Components/Blog';
import { getBlogbyId, getToken } from '@/app/Utils/DataServices';
import { useParams } from 'next/navigation';
import { Button, TextInput } from 'flowbite-react';

const Blog = () => {
    const { postId } = useParams();
    const [name, setName] = useState<string>('');
    const [id, setId] = useState<string>('');
    const [user, setUser] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [steps, setSteps] = useState<string[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [comment, setComment] = useState<string>('')

    useEffect(() => {
      const getData = async () => {
        if (!postId) return;
        const data = await getBlogbyId(Number(postId), getToken());
        console.log(data);
        setName(data.recipeName);
        setId(data.id);
        setUser(data.publisherName);
        setImage(data.image ?? "/assets/Placeholder.png");
        setDescription(data.description);
        setIngredients(data.ingredients);
        setSteps(data.steps);
        setTags(data.tags);
      };
      getData();
    }, [postId]);

    return (
        <div className="pt-10 w-min-full">
        <BlogPost username={user} id={id} post={
          <div>
            <div className='font-semibold text-2xl pb-2'>- Recipe -</div>
          <Image className='h-48 w-full object-cover' src={`${image}`} alt="post" width={500} height={500}/>
          <p className='font-semibold text-2xl p-2'>{name}</p>
          <div className='flex items-center justify-center'>
              <Image className='h-8 w-8 px-1' src="../assets/star.svg" alt="star"  width={500} height={500}/>
              <Image className='h-8 w-8 px-1' src="../assets/star.svg" alt="star"  width={500} height={500}/>
              <Image className='h-8 w-8 px-1' src="../assets/star.svg" alt="star"  width={500} height={500}/>
              <Image className='h-8 w-8 px-1' src="../assets/star.svg" alt="star"  width={500} height={500}/>
              <Image className='h-8 w-8 px-1' src="../assets/star.svg" alt="star"  width={500} height={500}/>
          </div>
          <div className='p-2 text-left'>{description}</div>
          <div className='border-t-1 border-solid border-slate-300 py-2'>
            <p className='font-semibold'>Ingredients</p>
            <ul className='list-disc text-left pl-5'>
            {ingredients.map((item, i) => {
                return (
                  <li key={i}>{item}</li>
                )
              })}
            </ul>
          </div>
          <div className='border-t-1 border-solid border-slate-300 py-2'>
            <p className='font-semibold'>Steps</p>
            <ol className="list-decimal text-left pl-5">
            {steps.map((item, i) => {
                return (
                  <li key={i}>{item}</li>
                )
              })}
            </ol>
          </div>
          <div className='flex flex-wrap justify-center gap-2 p-2 border-t-1 border-solid border-slate-300'>
          {tags.map((tag, i) => {
            return(
              <span key={i} className="px-3 py-1 bg-blue-200 text-blue-900 rounded-full text-sm cursor-pointer hover:bg-blue-600">{tag}</span>
            )
          })}
          </div>
          </div>}
          comments={
            <div>
              <div className='p-5 border-t-1 border-solid border-slate-300 flex items-center justify-between'>
                <div className='rounded-full bg-green-500 w-10 h-10 flex justify-center items-center'><img className='' src="../assets/person.svg" alt="profilePic" /></div>
                  <TextInput onChange={(e) => setComment(e.target.value)} className='w-[320px]'></TextInput>
                  <Button className="rounded-full h-8 bg-blue-200 hover:bg-blue-400 text-black cursor-pointer dark:bg-blue-100 dark:hover:bg-blue-200">Post</Button>
                </div>
                <div className='p-5 border-t-1 border-solid border-slate-300'>
              </div>
            </div>
          }/>
    </div>
    )
}

export default Blog;
