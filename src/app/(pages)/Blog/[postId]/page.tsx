'use client'

import React, { useEffect, useState } from 'react'
import Image from "next/image";
import BlogPost from '@/app/Components/Blog';
import { addCommentItem, getBlogbyId, getCommentItemsByBlogId, getToken, getUserInfoByUsername } from '@/app/Utils/DataServices';
import { useParams } from 'next/navigation';
import { Button, TextInput, Spinner } from 'flowbite-react';
import { IBlogItems, ICommentItems, IIngredientItems, IStepItems, IUserData } from '@/app/Utils/Interfaces';
import { format } from 'date-fns';
import Comment from '@/app/Components/Comment';
import Link from 'next/link';
import SaveButton from '@/app/Components/SaveButton';

const Blog = () => {
    const { postId } = useParams();
    const [name, setName] = useState<string>('');
    const [id, setId] = useState<string>('');
    const [userId, setUserId] = useState<number>(0);
    const [username, setUsername] = useState<string>("");
    const [user, setUser] = useState<string>('');
    const [profilePic, setProfilePic] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [postType, setPostType] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [ingredients, setIngredients] = useState<IIngredientItems[]>([]);
    const [steps, setSteps] = useState<IStepItems[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [comment, setComment] = useState<string>('');
    const [commentSection, setCommentSection] = useState<ICommentItems[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [rating, setRating] = useState<number>(0);
    const [hover, setHover] = useState<number>(0);
    const [currentUser, setCurrentUser] = useState<IUserData | null>(null);
    const [blogItem, setBlogItem] = useState<IBlogItems | null>(null);
    

    useEffect(() => {
        const storedUsername = localStorage.getItem("Username");
        const storedId = localStorage.getItem("UserID");

        if (storedUsername) setUsername(storedUsername);
        if (storedId) setUserId(Number(storedId));
    }, []);

      useEffect(() => {
        const fetchUser = async () => {
          if (!username) return;
      
          try {
            const user = await getUserInfoByUsername(username);
            if (user) {
              setCurrentUser(user);
            }
          } catch (error) {
            console.error("Failed to fetch user info:", error);
          }
        };
      
        fetchUser();
      }, [username]);



    useEffect(() => {
      const getData = async () => {
        if (!postId) return;
        const data = await getBlogbyId(Number(postId), getToken());
        console.log(data)
        setBlogItem(data);
        setName(data.recipeName);
        setId(String(data.id));
        setUser(data.publisherName);
        setImage(data.image ?? "/assets/Placeholder.png");
        setDescription(data.description);
        setIngredients(data.ingredients ?? []);
        setSteps(data.steps ?? []);
        setTags(data.tags);
        setPostType(data.postType);
        setLoading(false);

        const getProfile = async () => {
          try {
            const data2 = await getUserInfoByUsername(String(data.publisherName));
            setProfilePic(data2.profilePicture ?? "./assets/person.svg");
          } catch (error) {
            console.error("Failed to load profile picture", error);
            setProfilePic("/assets/person.svg");
          }
        };
      
        getProfile();
    };
        const fetchComments = async () => {
            if (!postId) return;
            const comments = await getCommentItemsByBlogId(Number(postId), getToken());
            setCommentSection(comments);
        };
        getData();
        fetchComments();
    }, [postId]);

    const handleComment = async () => {
        const item = {
            id: 0,
            blogId: Number(postId),
            userId: userId,
            publisherName: username,
            date: format(new Date(), 'MM-dd-yyyy'),
            comment: comment,
            isPublished: true,
            isDeleted: false
        };

        const result = await addCommentItem(item, getToken());

        if (result) {
            const userCommentItems = await getCommentItemsByBlogId(Number(postId), getToken());
            setCommentSection(userCommentItems);
            alert('Comment Added');
        } else {
            alert('Comment was not Added');
        }
    };


    if (loading) {
        return (
            <div className="flex justify-center mt-15">
                <Spinner aria-label="Loading post..." size="xl" />
            </div>
        );
    }

    return (
        <div className="pt-10 w-min-full">
            <BlogPost
                item={blogItem!}
                profile={`${profilePic}`}
                username={user}
                id={id}
                post={(
                    <div>
                        {postType !== 'recipe' ? (
                            <div>
                                <div className='p-2 text-left'>{description}</div>
                                <Image src={`${image}`} alt="post" className="aspect-square object-cover object-center" width={500} height={500} />
                                <div className='flex flex-wrap justify-center gap-2 p-2 border-t border-solid border-slate-300'>
                                    {tags.map((tag, i) => (
                                        <Link key={i} href={`/Discover/${tag}`}>
                                            <span className="px-3 py-1 bg-blue-200 text-blue-900 rounded-full text-sm cursor-pointer hover:bg-blue-400">{tag}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className='font-semibold text-2xl pb-2'>- Recipe -</div>
                                <Image className='h-48 w-full object-cover' src={`${image}`} alt="post" width={500} height={500} />
                                <p className='font-semibold text-2xl p-2'>{name}</p>
                                <div className='flex items-center justify-center'>
                                  {[...Array(5)].map((_, index) => {
                                    const starValue = index + 1;
                                    return (
                                      <button
                                        key={index}
                                        type="button"
                                        onClick={() => setRating(starValue)}
                                        onMouseEnter={() => setHover(starValue)}
                                        onMouseLeave={() => setHover(0)}
                                        className='px-1'
                                      >
                                        <Image
                                          src={starValue <= (hover || rating) ? "/assets/star-fill.svg" : "/assets/star.svg"}
                                          alt={`star-${starValue}`}
                                          width={32}
                                          height={32}
                                        />
                                      </button>
                                    );
                                  })}
                                </div>

                                <div className='p-2 text-left'>{description}</div>
                                <div className='border-t border-solid border-slate-300 py-2'>
                                    <p className='font-semibold'>Ingredients</p>
                                    {ingredients.map((item, i) => (
                                        <div key={i}>
                                            <h1 className="font-bold">{item.title}</h1>
                                            <ul className='list-disc text-left pl-10'>
                                                {item.ingredients.map((ingredient, j) => (
                                                    <li key={j}>{ingredient}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                                <div className='border-t border-solid border-slate-300 py-2'>
                                    <p className='font-semibold'>Steps</p>
                                    {steps.map((item, i) => (
                                        <div key={i}>
                                            <h1>{item.title}</h1>
                                            <ol className="list-decimal text-left mx-8">
                                                {item.steps.map((steps, j) => (
                                                    <li key={j}>{steps}</li>
                                                ))}
                                            </ol>
                                        </div>
                                    ))}
                                </div>
                                <div className='flex flex-wrap justify-center gap-2 p-2 border-t border-solid border-slate-300'>
                                    {tags.map((tag, i) => (
                                        <Link key={i} href={`/Discover/${tag}`}>
                                            <span className="px-3 py-1 bg-blue-200 text-blue-900 rounded-full text-sm cursor-pointer hover:bg-blue-400">{tag}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
                save={(
                    <SaveButton
                    postId={Number(id)}
                    currentUser={currentUser}
                    onUpdate={setCurrentUser}
                    />
                )}
                comments={(
                    <div>
                        <div className='p-5 border-t border-solid border-slate-300 flex items-center justify-between'>
                        <div className="rounded-full overflow-hidden w-10 h-10 relative bg-blue-200">
                            <Image src={`${profilePic}`} alt="profilePic" fill className="object-cover"/>
                          </div>
                            <TextInput value={comment} onChange={(e) => setComment(e.target.value)} className='w-[320px]' />
                            <Button onClick={handleComment} className="rounded-full h-8 bg-blue-200 hover:bg-blue-400 text-black cursor-pointer dark:bg-blue-100 dark:hover:bg-blue-200">Post</Button>
                        </div>
                        <div className='p-5 border-t border-solid border-slate-300'>
                            {commentSection.map((item: ICommentItems, idx: number) => (
                                item.isPublished && !item.isDeleted && (
                                    <Comment
                                        key={idx}
                                        username={item.publisherName}
                                        date={item.date}
                                        comment={item.comment}
                                        commentId={item.id}
                                    />
                                )
                            ))}
                        </div>
                    </div>
                )}
            />
        </div>
    );
};

export default Blog;
