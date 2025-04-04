'use client'
import { Button, FileInput, TextInput, Modal, ModalBody, ModalFooter, ModalHeader } from 'flowbite-react'
import React, { useState } from 'react'

const Recipe = () => {

    const [openModal, setOpenModal] = useState(false);

    const [ingredients, setIngredients] = useState<string[]>(['']);
    const [steps, setSteps] = useState<string[]>(['']);

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

  return (
    <div className='pt-10 px-5 w-full'>
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>Tags</ModalHeader>
        <ModalBody>
          <div className="space-y-6">
            Search for tags
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
            <TextInput placeholder='[Recipe Name]' className='w-[200px] pb-2'></TextInput>
            <p className='text-center text-blue-600'>Description 200/200</p>
            <TextInput className='w-[400px]'></TextInput>
        </div>
        <div className='border-b-1 border-solid border-slate-300 p-2'>
            <p className='font-semibold text-xl text-center'>Ingredients</p>
            {ingredients.map((ingredient: string, ibx: number) => (
                <div key={ibx} className='flex items-center px-2'>
            <img className='h-10 w-10 pr-5 hover:opacity-50' src="../assets/x-lg.svg" alt="remove" onClick={() => removeIngredient(ibx)}/>
                <div className="mb-4 px-1">
        <label className="block text-gray-700 text-sm font-bold mb-2">
            AMOUNT
        </label>
        <TextInput className='w-[80px]'></TextInput>
            </div>
                <div className="mb-4 px-1">
        <label className="block text-gray-700 text-sm font-bold mb-2">
            MEASUREMENT
        </label>
        <TextInput className='w-[140px]'></TextInput>
                </div>
                <div className="mb-4 px-1">
        <label className="block text-gray-700 text-sm font-bold mb-2">
            INGREDIENT
        </label>
        <TextInput className='w-[300px]'></TextInput>
                </div>
                </div>
            )
        )}
            <div className='flex justify-center items-center font-semibold hover:opacity-50 underline text-blue-600' onClick={addIngredient}><img className='h-6 w-6 pr-2' src="../assets/plus-circle.svg" alt="add" /><p>Add Ingredient</p></div>
        </div>
        <div className='border-b-1 border-solid border-slate-300 p-2'>
        <p className='font-semibold text-xl text-center'>Instructions</p>
            {steps.map((step: string, ibx: number) => (
                <div key={ibx} className='flex items-center px-2'>
            <img className='h-10 w-10 pr-5 hover:opacity-50' src="../assets/x-lg.svg" alt="remove" onClick={() => removeStep(ibx)}/>
                <div className="mb-4 px-1">
        <label className="block text-gray-700 text-sm font-bold mb-2">
            Step {ibx + 1}
        </label>
        <TextInput className='w-[600px]'></TextInput>
                </div>
                </div>
            )
        )}
            <div className='flex justify-center items-center font-semibold hover:opacity-50 underline text-blue-600' onClick={addStep}><img className='h-6 w-6 pr-2' src="../assets/plus-circle.svg" alt="add" /><p>Add Step</p></div>
        </div>
        <div className='border-b-1 border-solid border-slate-300 p-2'>
        <p className='font-semibold text-xl text-center'>Tags</p>
        <div onClick={() => setOpenModal(true)} className='flex justify-center items-center font-semibold hover:opacity-50 underline text-blue-600'><img className='h-6 w-6 pr-2' src="../assets/plus-circle.svg" alt="add" /><p>Add Tags</p></div>
        </div>
        <div className='p-2 flex justify-end'>
            <Button outline className='mx-1 w-[100px]'>Draft</Button>
            <Button className='mx-1 w-[100px]'>Post</Button>
        </div>
    </div>
  )
}

export default Recipe