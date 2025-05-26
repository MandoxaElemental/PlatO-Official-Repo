'use client'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Popover } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import { IBlogItems } from '../Utils/Interfaces';
import { deleteBlogItem, getToken } from '../Utils/DataServices';
import { useRouter } from 'next/navigation';

const BlogPost = ({ profile, post, username, id, comments, save, item }: {
  profile: string;
  post: React.ReactNode;
  username: string;
  id: string;
  comments: React.ReactNode;
  save: React.ReactNode;
  item: IBlogItems; }) => {
  
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const confirmDelete = () => {
    setShowModal(true);
  };

    const handleDelete = async (items: IBlogItems) => {
        items.isPublished = !items.isPublished;
    
        const result = await deleteBlogItem(items, getToken());
    
        if (result){
            router.push("/Home");
        } else {
          alert("Blog Item(s) were not deleted")
        }
      }

  return (
    <div className='mb-10 text-center max-w-[500px] border-1 border-solid border-blue-100 rounded-md'>
      <div className='flex justify-between items-center py-2 px-5'>
        <div className='flex items-center'>
          <div className="rounded-full overflow-hidden w-10 h-10 relative bg-blue-200">
            <Image src={profile} alt="profilePic" fill className="object-cover" />
          </div>
          <Link href={`/Profile/${username}`} className='pl-3 cursor-pointer'>{username}</Link>
        </div>

        {username === localStorage.getItem("Username") ?
          <div className='pl-5'>
                <Popover
                trigger="click"
                content={
                    <>
                        <div className='p-2'>
                            <Link href={`/Edit/${id}`}>
                                <div className='flex items-center cursor-pointer p-2'>
                                        <Image className='h-4 w-4' src="../assets/pencil.svg" alt="edit" width={100} height={100}/> 
                                        <p className='pl-2'>
                                            Edit Post
                                        </p>
                                </div>
                            </Link>
                            <div onClick={confirmDelete} className='flex items-center font-semibold text-red-600 cursor-pointer p-2 hover:border-red-600 hover:border-1'>
                                <Image className='h-4 w-4' src="../assets/trash.svg" alt="edit" width={100} height={100}/>
                                <p className='pl-2'>
                                    Delete Post
                                </p>
                            </div>
                        </div>
                    </>
                }
            >
        <Image className='h-5 w-5 cursor-pointer' src="../assets/three-dots-vertical.svg" alt="edit" width={100} height={100}/> 
      </Popover>{" "}
          </div>
          : <Button className="rounded-full h-8 bg-blue-200 hover:bg-blue-400 text-black cursor-pointer dark:bg-blue-100 dark:hover:bg-blue-200">Follow</Button>
        }
      </div>

      <div>{post}</div>

      <div className='flex justify-evenly p-2 pt-5 border-t-1 border-solid border-blue-200'>
        <div className="flex items-center">
          <Image width={50} height={50} className="h-5 w-5 dark:invert" src="../assets/heart.svg" alt="like" /><p className="pl-2">Like</p>
        </div>
        <div className="flex items-center">
          <Image width={50} height={50} className="h-5 w-5 dark:invert" src="../assets/repeat.svg" alt="share" /><p className="pl-2">Share</p>
        </div>
        {save}
      </div>

      {comments}

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ModalHeader>Confirm Delete</ModalHeader>
        <ModalBody>
          <div className="text-center">
            <p>Are you sure you want to delete this post?</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button className="cursor-pointer" color="danger" onClick={() => handleDelete(item)}>
            Delete
          </Button>
          <Button className="cursor-pointer" color="gray" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default BlogPost;
