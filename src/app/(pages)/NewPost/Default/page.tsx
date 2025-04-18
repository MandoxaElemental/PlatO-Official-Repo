'use client'

import { tagArr } from '@/app/Utils/Interfaces';
import { Button, FileInput, Modal, ModalBody, ModalFooter, ModalHeader, TextInput } from 'flowbite-react'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const Post = () => {

        const [description, setDescription] = useState('');
        const [length, setLength] = useState(200);
        const [openModal, setOpenModal] = useState(false);
        const [query, setQuery] = useState<string>('');
        const [selectedTags, setSelectedTags] = useState<string[]>([]);
        
    
        useEffect(() => {
            const num = (200 - description.length)
            setLength(num)
            if(description.length === 200){
                alert('error')
            }
          }, [description])

          const filteredTags = tagArr.filter((tag) =>
                tag.toLowerCase().includes(query.toLowerCase())
              );
          
              const toggleTag = (tag: string) => {
                setSelectedTags((prevSelected) =>
                  prevSelected.includes(tag)
                    ? prevSelected.filter((t) => t !== tag)
                    : [...prevSelected, tag]
                );
              };

    return (
        
       <div className='pt-10 px-5 w-full'>
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <ModalHeader>Tags</ModalHeader>
                <ModalBody className="ScrollBar">
                  <div className="space-y-6">
                    Search for tags
                    <TextInput value={query} onChange={(e) => setQuery(e.target.value)}/>
                        <div className="flex flex-wrap gap-2">
                      {selectedTags.length > 0 ? (
                        selectedTags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-blue-200 text-blue-900 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))
                      ) : (
                        <p className="text-sm text-gray-400">No tags selected</p>
                      )}
                    </div>
                      <div className='w-screen-min grid grid-cols-5 gap-3'>                
                      {filteredTags.length > 0 ? (
                  filteredTags.map((tag, index) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={index}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1 rounded-full text-sm border cursor-pointer ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })
                ) : (
                  <p className="text-gray-500 italic">No tags found.</p>
                )}
                      </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button onClick={() => setOpenModal(false)}>Back</Button>
                </ModalFooter>
              </Modal>
            <div className='border-b-1 border-solid border-slate-300 p-2 text-2xl font-semibold text-center'>
                New Post
            </div>
            <div className='border-b-1 border-solid border-slate-300 p-2'>
                <FileInput/>
            </div>
            <div className='border-b-1 border-solid border-slate-300 p-2 flex flex-col items-center'>
                <p className='text-center text-blue-600'>Description 200/{length}</p>
            <TextInput onChange={(e) => setDescription(e.target.value)} className='w-[400px]'></TextInput>
            </div>
            <div className='border-b-1 border-solid border-slate-300 p-2'>
        <p className='font-semibold text-xl text-center'>Tags</p>
        <div className='flex flex-wrap gap-2 p-2'>
        {selectedTags.length > 0 ? (
                selectedTags.map((tag, i) => (
                  <span
                    key={i} onClick={() => toggleTag(tag)}
                    className="px-3 py-1 bg-blue-200 text-blue-900 rounded-full text-sm cursor-pointer hover:bg-blue-600"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <p className="text-sm text-gray-400">No tags selected</p>
              )}
        </div>
        <div onClick={() => setOpenModal(true)} className='flex justify-center items-center font-semibold hover:opacity-50 underline text-blue-600 cursor-pointer'><Image className='h-6 w-6 pr-2' src="../assets/plus-circle.svg" alt="add" width={100} height={100}/><p>Add Tags</p></div>
        </div>
            <div className='p-2 flex justify-end'>
                <Button className='mx-1 w-[100px] rounded-md bg-transparent hover:bg-transparent text-blue-200 hover:text-blue-400 border-4 border-blue-200 hover:border-blue-400 cursor-pointer dark:bg-transparent dark:hover:bg-transparent dark:border-blue-100 dark:hover:border-blue-200'>Draft</Button>
                <Button className='mx-1 w-[100px] rounded-md bg-blue-200 hover:bg-blue-400 text-black cursor-pointer dark:bg-blue-100 dark:hover:bg-blue-200'>Post</Button>
            </div>
        </div>
  )
}

export default Post