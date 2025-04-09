'use client'
import { Button, FileInput, TextInput, Modal, ModalBody, ModalFooter, ModalHeader, Dropdown, DropdownItem, DropdownDivider } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { tagArr } from '@/app/Utils/Interfaces'

const Recipe = () => {

    
    // const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    type Ingredient = {
      amount: string;
      measurement: string;
      name: string;
    };
    
    const [ingredients, setIngredients] = useState<Ingredient[]>([
      { amount: '', measurement: 'Measurement', name: '' },
    ]);
    const [length, setLength] = useState(200);
    const [openModal, setOpenModal] = useState(false);
    const [steps, setSteps] = useState<string[]>(['']);
    const [query, setQuery] = useState<string>('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const updateStep = (index: number, value: string) => {
      const updatedSteps = [...steps];
      updatedSteps[index] = value;
      setSteps(updatedSteps);
    };

    const addIngredient = () => {
      setIngredients([...ingredients, { amount: '', measurement: 'Measurement', name: '' }]);
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
      console.log(ingredients)
      console.log(steps)
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
  
    const updateIngredient = (index: number, field: keyof Ingredient, value: string) => {
      const updatedIngredients = [...ingredients];
      updatedIngredients[index][field] = value;
      setIngredients(updatedIngredients);
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
            {ingredients.map((ing, index) => (
  <div key={index} className="flex items-center px-2">
    <img
      className="h-10 w-10 pr-5 hover:opacity-50 dark:invert cursor-pointer"
      src="../assets/x-lg.svg"
      alt="remove"
      onClick={() => removeIngredient(index)}
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
        value={ing.name}
        onChange={(e) =>
          updateIngredient(index, 'name', e.target.value)
        }
      />
    </div>
  </div>
))}
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
        <TextInput
            className='w-[600px]'
            value={steps[ibx]}
            onChange={(e) => updateStep(ibx, e.target.value)}/>
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