'use client'
import { Button, FileInput, TextInput, Modal, ModalBody, ModalFooter, ModalHeader, Dropdown, DropdownItem, DropdownDivider } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { tagArr } from '@/app/Utils/Interfaces'

const Recipe = () => {

    
    // const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [measurement, setMeasurement] = useState('Measurement');
    const [ingredient, setIngredient] = useState('');
    const [step, setStep] = useState('');
    const [length, setLength] = useState(200);
    const [openModal, setOpenModal] = useState(false);
    const [ingredients, setIngredients] = useState<string[]>(['']);
    const [steps, setSteps] = useState<string[]>(['']);
    const [query, setQuery] = useState<string>('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const addIngredient = () => {
      setIngredients([...ingredients, '']);
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

    const DisplayItems = () => {
      console.log(name)
      console.log(description)
      console.log(`${amount} ${measurement} ${ingredient}`)
      console.log(step)
    }

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
            {ingredients.map((ingredient: string, ibx: number) => (
                <div key={ibx} className='flex items-center px-2'>
            <img className='h-10 w-10 pr-5 hover:opacity-50 dark:invert cursor-pointer' src="../assets/x-lg.svg" alt="remove" onClick={() => removeIngredient(ibx)}/>
                <div className="mb-4 px-1">
        <label className="block text-gray-700 text-sm font-bold mb-2">
            AMOUNT
        </label>
        <TextInput className='w-[80px]' onChange={(e) => setAmount(e.target.value)}></TextInput>
            </div>
                <div className="mb-4 px-1">
        <label className="block text-gray-700 text-sm font-bold mb-2">
            MEASUREMENT
        </label>
        <Dropdown className='w-[140px]' label={measurement}>
          <DropdownItem onClick={() => setMeasurement('Measurement')}>Measurement</DropdownItem>
          <DropdownDivider />
          <DropdownItem onClick={() => setMeasurement('tsp')}>tsp</DropdownItem>
          <DropdownItem onClick={() => setMeasurement('tbsp')}>tbsp</DropdownItem>
          <DropdownItem onClick={() => setMeasurement('c')}>c</DropdownItem>
          <DropdownItem onClick={() => setMeasurement('qt')}>qt</DropdownItem>
          <DropdownItem onClick={() => setMeasurement('gal')}>gal</DropdownItem>
          <DropdownDivider />
          <DropdownItem onClick={() => setMeasurement('oz')}>oz</DropdownItem>
          <DropdownItem onClick={() => setMeasurement('lbs')}>lbs</DropdownItem>
          <DropdownDivider />
          <DropdownItem onClick={() => setMeasurement('kg')}>kg</DropdownItem>
          <DropdownItem onClick={() => setMeasurement('g')}>g</DropdownItem>
          <DropdownItem onClick={() => setMeasurement('ml')}>ml</DropdownItem>
          <DropdownItem onClick={() => setMeasurement('l')}>l</DropdownItem>
        </Dropdown>
                  </div>
                <div className="mb-4 px-1">
        <label className="block text-gray-700 text-sm font-bold mb-2">
            INGREDIENT
        </label>
        <TextInput className='w-[300px]' onChange={(e) => setIngredient(e.target.value)}></TextInput>
                </div>
                </div>
            )
        )}
            <div className='flex justify-center items-center font-semibold hover:opacity-50 underline text-blue-600 cursor-pointer' onClick={addIngredient}><img className='h-6 w-6 pr-2' src="../assets/plus-circle.svg" alt="add" /><p>Add Ingredient</p></div>
        </div>
        <div className='border-b-1 border-solid border-slate-300 p-2'>
        <p className='font-semibold text-xl text-center'>Instructions</p>
            {steps.map((step: string, ibx: number) => (
                <div key={ibx} className='flex items-center px-2'>
            <img className='h-10 w-10 pr-5 hover:opacity-50 dark:invert cursor-pointer' src="../assets/x-lg.svg" alt="remove" onClick={() => removeStep(ibx)}/>
                <div className="mb-4 px-1">
        <label className="block text-gray-700 text-sm font-bold mb-2">
            Step {ibx + 1}
        </label>
        <TextInput className='w-[600px]' onChange={(e) => setStep(e.target.value)}></TextInput>
                </div>
                </div>
            )
        )}
            <div className='flex justify-center items-center font-semibold hover:opacity-50 underline text-blue-600 cursor-pointer' onClick={addStep}><img className='h-6 w-6 pr-2' src="../assets/plus-circle.svg" alt="add" /><p>Add Step</p></div>
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
        <div onClick={() => setOpenModal(true)} className='flex justify-center items-center font-semibold hover:opacity-50 underline text-blue-600 cursor-pointer'><img className='h-6 w-6 pr-2' src="../assets/plus-circle.svg" alt="add" /><p>Add Tags</p></div>
        </div>
        <div className='p-2 flex justify-end'>
            <Button outline className='mx-1 w-[100px]'>Draft</Button>
            <Button onClick={DisplayItems} className='mx-1 w-[100px]'>Post</Button>
        </div>
    </div>
  )
}

export default Recipe