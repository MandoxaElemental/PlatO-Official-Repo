'use client'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import { IBlogItems } from '../Utils/Interfaces';
import { deleteBlogItem, getToken } from '../Utils/DataServices';
import { useRouter } from 'next/router';

const BlogPost = ({ profile, post, username, id, comments, save, item }: {
  profile: string;
  post: React.ReactNode;
  username: string;
  id: string;
  comments: React.ReactNode;
  save: React.ReactNode;
  item: IBlogItems;
}) => {
  const router = useRouter();
  
  const [showModal, setShowModal] = useState(false);

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
    <div className='text-center max-w-[500px] border-1 border-solid border-blue-100 rounded-md'>
      <div className='flex justify-between items-center py-2 px-5'>
        <div className='flex items-center'>
          <div className="rounded-full overflow-hidden w-10 h-10 relative bg-blue-200">
            <Image src={profile} alt="profilePic" fill className="object-cover" />
          </div>
          <Link href={`/Profile/${username}`} className='pl-3 cursor-pointer'>{username}</Link>
        </div>

        {username === localStorage.getItem("Username") ?
          <div className='pl-5 grid grid-cols-2 gap-3'>
            <div className='relative'>
              <div className='absolute right-0'>
                <div className='p-2 bg-white border rounded-md shadow-md'>
                  <Link href={`/Edit/${id}`}>
                    <div className='flex items-center cursor-pointer'>
                      <Image className='h-4 w-4 dark:invert' src="../assets/pencil.svg" alt="edit" width={100} height={100} />
                      <p className='pl-2'>Edit Post</p>
                    </div>
                  </Link>
                  <div
                    className='flex items-center font-semibold text-red-600 cursor-pointer'
                    onClick={confirmDelete}
                  >
                    <Image className='h-4 w-4 dark:invert' src="../assets/trash.svg" alt="delete" width={100} height={100} />
                    <p className='pl-2'>Delete Post</p>
                  </div>
                </div>
              </div>
            </div>
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
          <Button color="failure" onClick={() => handleDelete(item)}>
            Yes, Delete
          </Button>
          <Button color="gray" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default BlogPost;
