'use client';

import { format } from 'date-fns';
import { Button } from 'flowbite-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { IReplyItems } from '../Utils/Interfaces';
import { addReplyItem, getReplyItemsByCommentId, getToken } from '../Utils/DataServices';
import Reply from './Reply';

const Comment = ({ username, date, comment, commentId}: { username: string; date: string; comment: string; commentId: number;}) => {
  
    const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [userId, setUserId] = useState<number>(0);
  const [user, setUsername] = useState<string>("");
    const [replySection, setReplySection] = useState<IReplyItems[]>([]);
  
      useEffect(() => {
            const storedUsername = localStorage.getItem("Username");
            const storedId = localStorage.getItem("UserID");
          
            if (storedUsername) setUsername(storedUsername);
            if (storedId) setUserId(Number(storedId));
          }, []);

  const handleReplyClick = () => {
    setShowReplyInput(true);
  };

  const handleCancel = () => {
    setReplyText('');
    setShowReplyInput(false);
  };

  const handlePost = async () => {
    console.log('Posting reply:', replyText);
    const item = {
            id: 0,
            commentId: Number(commentId),
            userId: userId,
            publisherName: user,
            date: format(new Date(), 'MM-dd-yyyy'),
            reply: replyText,
            isPublished: true,
            isDeleted: false
          }
          console.log(item)
          let result = false
            result = await addReplyItem(item, getToken())
            
            if(result){
                  const userReplyItems = await getReplyItemsByCommentId(Number(commentId), getToken());
                  setReplySection(userReplyItems)
                  alert('Comment Added')
                }else{
                  alert(`Comment was not Added`)
                }
    setReplyText('');
    setShowReplyInput(false);
  };

  useEffect(() => {
        const fetchComments = async () => {
          if (!commentId) return;
          const replies = await getReplyItemsByCommentId(Number(commentId), getToken());
          setReplySection(replies);
        };
        fetchComments();
      }, []);

  return (
    <div className='text-left border-b border-slate-300 pt-2'>
      <div className='flex'>
        <div className='rounded-full bg-green-500 w-10 h-10 flex justify-center items-center'>
          <Image
            width={50}
            height={50}
            src='/assets/person.svg'
            alt='profilePic'
          />
        </div>
        <div className='pl-4'>
          <p>
            {username} - {date}
          </p>
          <p className='w-max-4'>{comment}</p>
        </div>
      </div>

      <div className='flex justify-between py-2 px-5'>
        <div className='flex items-center'>
          <Image
            width={50}
            height={50}
            className='h-4 w-4'
            src='/assets/heart.svg'
            alt='like'
          />
          <p className='pl-2'>Like</p>
        </div>
        <div className='flex items-center cursor-pointer' onClick={handleReplyClick}>
          <Image
            width={50}
            height={50}
            className='h-4 w-4'
            src='/assets/chat-left.svg'
            alt='reply'
          />
          <p className='pl-2'>Reply</p>
        </div>
        <div className='flex items-center'>
          <Image
            width={50}
            height={50}
            className='h-4 w-4'
            src='/assets/repeat.svg'
            alt='share'
          />
          <p className='pl-2'>Share</p>
        </div>
      </div>
      {showReplyInput && (
        <div className='px-5 pb-4'>
          <textarea
            className='w-full border border-gray-300 rounded p-2 mt-2'
            rows={3}
            placeholder='Write a reply...'
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <div className='flex gap-2 mt-2'>
            <Button onClick={handlePost} className="rounded-full h-8 bg-blue-200 hover:bg-blue-400 text-black cursor-pointer dark:bg-blue-100 dark:hover:bg-blue-200">Post</Button>
            <Button onClick={handleCancel} className="rounded-full h-8 bg-gray-200 hover:bg-gray-400 text-black cursor-pointer dark:bg-gray-100 dark:hover:bg-gray-200">Cancel</Button>
          </div>
        </div>
      )}
        <div className='border-t-1 border-solid border-slate-300'>
            {
            replySection.map((item: IReplyItems, idx: number) => {
                return(
                <div key={idx}>
                    {item.isPublished && !item.isDeleted && (
                        <Reply
                            username={item.publisherName}
                                    date={item.date}
                                    comment={item.reply}
                                  />
                                )
                              }
                            </div>
                          )
                      })
                    } 
            </div>

    </div>
  );
};

export default Comment;
