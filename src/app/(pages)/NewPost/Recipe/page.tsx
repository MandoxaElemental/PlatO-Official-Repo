'use client'
import { Button, FileInput, TextInput, Modal, ModalBody, ModalFooter, ModalHeader, Dropdown, DropdownItem } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Ingredient, tagArr } from '@/app/Utils/Interfaces'
import Image from 'next/image'
import { addBlogItem, getToken, loggedInData } from '@/app/Utils/DataServices'
import { format } from 'date-fns'

const Recipe = () => {

    
    // const [image, setImage] = useState('');
    const [blogId, setBlogId] = useState<number>(0);
    const [blogUserId, setBlogUserId] = useState<number>(0);
    const [blogPublisherName, setBlogPublisherName] = useState<string>("");
    const [length, setLength] = useState(200);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState<Ingredient[]>([{ amount: '', measurement: 'Measurement', ingredient: '' },]);
    const [steps, setSteps] = useState<string[]>(['']);
    const [query, setQuery] = useState<string>('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [openModal, setOpenModal] = useState(false);

    const updateStep = (index: number, value: string) => {
      const updatedSteps = [...steps];
      updatedSteps[index] = value;
      setSteps(updatedSteps);
    };

    const addIngredient = () => {
      setIngredients([...ingredients, { amount: '', measurement: 'Measurement', ingredient: '' }]);
    };
    
    const removeIngredient = (index: number) => {
      const newIngredients = [...ingredients];
      newIngredients.splice(index, 1);
      setIngredients(newIngredients);
    };
    
    const addStep = () => {
      setSteps([...steps, '']);
    };
  
    const removeStep = (index: number) => {
      const newSteps = [...steps];
      newSteps.splice(index, 1);
      setSteps(newSteps);
    };

    // const DisplayItems = () => {
    //   console.log(name)
    //   console.log(description)
    //   console.log(ingredients)
    //   console.log(steps)
    //   console.log(selectedTags)
      
    // }

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
  
    const updateIngredient = (index: number, field: keyof Ingredient, value: string) => {
      const updatedIngredients = [...ingredients];
      updatedIngredients[index][field] = value;
      setIngredients(updatedIngredients);
    };

    const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
      const item = {
        id: blogId,
        userId: blogUserId,
        publisherName: blogPublisherName,
        image: '',
        date: format(new Date(), 'MM-dd-yyyy'),
        recipeName: name,
        description: description,
        ingredients: ingredients.map(i => `${i.amount} ${i.measurement} ${i.ingredient}`),
        steps: steps,
        tags: selectedTags,
        isPublished: e.currentTarget.textContent === 'Save' ? false : true,
        isDeleted: false
      }
      let result = false
        result = await addBlogItem(item, getToken())
      alert('Post Success!')
    }

    useEffect(() => {
      const getLoggedInData = async () => {
        const loggedIn = loggedInData();
        setBlogUserId(loggedIn.id)
        setBlogPublisherName(loggedIn.username)
      }
      getLoggedInData()
    }, [])
  
  

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
            New Recipe
        </div>
        <div className='border-b-1 border-solid border-slate-300 p-2'>
            <FileInput/>
        </div>
        <div className='border-b-1 border-solid border-slate-300 p-2 flex flex-col items-center'>
            <TextInput placeholder='[Recipe Name]' className='w-[200px] pb-2' onChange={(e) => setName(e.target.value)}></TextInput>
            <p className='text-center text-blue-600'>Description 200/{length}</p>
            <TextInput onChange={(e) => setDescription(e.target.value)} className='w-[400px]'></TextInput>
        </div>
        <div className='border-b-1 border-solid border-slate-300 p-2'>
            <p className='font-semibold text-xl text-center'>Ingredients</p>
            {ingredients.map((ing, index) => (
  <div key={index} className="flex items-center px-2">
    <Image
      className="h-10 w-10 pr-5 hover:opacity-50 dark:invert cursor-pointer"
      src="../assets/x-lg.svg"
      alt="remove"
      onClick={() => removeIngredient(index)}
      width={100}
      height={100}
    />
    <div className="mb-4 px-1">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        AMOUNT
      </label>
      <TextInput
        className="w-[80px]"
        value={ing.amount}
        onChange={(e) =>
          updateIngredient(index, 'amount', e.target.value)
        }
      />
    </div>
    <div className="mb-4 px-1">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        MEASUREMENT
      </label>
      <Dropdown label={ing.measurement} className="w-[140px]">
        {[
          'tsp', 'tbsp', 'c', 'qt', 'gal', 'oz', 'lbs', 'kg', 'g', 'ml', 'l',
        ].map((unit) => (
          <DropdownItem
            key={unit}
            onClick={() => updateIngredient(index, 'measurement', unit)}
          >
            {unit}
          </DropdownItem>
        ))}
      </Dropdown>
    </div>
    <div className="mb-4 px-1">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        INGREDIENT
      </label>
      <TextInput
        className="w-[300px]"
        value={ing.ingredient}
        onChange={(e) =>
          updateIngredient(index, 'ingredient', e.target.value)
        }
      />
    </div>
  </div>
))}
            <div className='flex justify-center items-center font-semibold hover:opacity-50 underline text-blue-600 cursor-pointer' onClick={addIngredient}><Image className='h-6 w-6 pr-2' src="../assets/plus-circle.svg" alt="add" width={100} height={100}/><p>Add Ingredient</p></div>
        </div>
        <div className='border-b-1 border-solid border-slate-300 p-2'>
        <p className='font-semibold text-xl text-center'>Instructions</p>
            {steps.map((step: string, ibx: number) => (
                <div key={ibx} className='flex items-center px-2'>
            <Image className='h-10 w-10 pr-5 hover:opacity-50 dark:invert cursor-pointer' src="../assets/x-lg.svg" alt="remove" onClick={() => removeStep(ibx)} width={100} height={100}/>
                <div className="mb-4 px-1">
        <label className="block text-gray-700 text-sm font-bold mb-2">
            Step {ibx + 1}
        </label>
        <TextInput
            className='w-[600px]'
            value={steps[ibx]}
            onChange={(e) => updateStep(ibx, e.target.value)}/>
            </div>
            </div>
            )
        )}
            <div className='flex justify-center items-center font-semibold hover:opacity-50 underline text-blue-600 cursor-pointer' onClick={addStep}><Image className='h-6 w-6 pr-2' src="../assets/plus-circle.svg" alt="add" width={100} height={100}/><p>Add Step</p></div>
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
            <Button outline className='mx-1 w-[100px]'>Draft</Button>
            <Button onClick={handleSave} className='mx-1 w-[100px]'>Post</Button>
        </div>
    </div>
  )
}

export default Recipe