'use client'
import { Button, FileInput, TextInput, Modal, ModalBody, ModalFooter, ModalHeader, Dropdown, DropdownItem } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Ingredient, IngredientGroup, StepGroup, tagArr } from '@/app/Utils/Interfaces'
import Image from 'next/image'
import { addBlogItem, getToken } from '@/app/Utils/DataServices'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'

const Recipe = () => {
    const [blogId, setBlogId] = useState<number>(0);
    const [id, setId] = useState<number>(0);
    const [username, setUsername] = useState<string>("");
    const [recipeImage, setImage] = useState<string|ArrayBuffer|null>('');
    const [length, setLength] = useState(200);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [ingredientGroups, setIngredientGroups] = useState<IngredientGroup[]>([
      { title: "", ingredients: [{ amount: '', measurement: 'Measurement', ingredient: '' }] }
    ]);
    const [stepGroups, setStepGroups] = useState<StepGroup[]>([
      { title: "", steps: [''] }
    ]);
    const [query, setQuery] = useState<string>('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const router = useRouter();
  
    useEffect(() => {
      const storedUsername = localStorage.getItem("Username");
      const storedId = localStorage.getItem("UserID");
    
      if (storedUsername) setUsername(storedUsername);
      if (storedId) setId(Number(storedId));
    }, []);

    const addIngredient = (groupIndex: number) => {
      const newGroups = [...ingredientGroups];
      newGroups[groupIndex].ingredients.push({ amount: '', measurement: 'Measurement', ingredient: '' });
      setIngredientGroups(newGroups);
    };
    
    const removeIngredient = (groupIndex: number, ingredientIndex: number) => {
      const newGroups = [...ingredientGroups];
      newGroups[groupIndex].ingredients.splice(ingredientIndex, 1);
      setIngredientGroups(newGroups);
    };

    const updateIngredient = (groupIndex: number, ingredientIndex: number, field: keyof Ingredient, value: string) => {
      const newGroups = [...ingredientGroups];
      newGroups[groupIndex].ingredients[ingredientIndex][field] = value;
      setIngredientGroups(newGroups);
    };
    
    const addStep = (groupIndex: number) => {
      const newGroups = [...stepGroups];
      newGroups[groupIndex].steps.push('');
      setStepGroups(newGroups);
    };
  
    const removeStep = (groupIndex: number, stepIndex: number) => {
      const newGroups = [...stepGroups];
      newGroups[groupIndex].steps.splice(stepIndex, 1);
      setStepGroups(newGroups);
    };

    const updateStep = (groupIndex: number, stepIndex: number, value: string) => {
      const newGroups = [...stepGroups];
      newGroups[groupIndex].steps[stepIndex] = value;
      setStepGroups(newGroups);
    };

          const addIngredientGroup = () => {
        setIngredientGroups([...ingredientGroups, { title: 'New Section', ingredients: [{ amount: '', measurement: 'Measurement', ingredient: '' }] }]);
      };

      const addStepGroup = () => {
        setStepGroups([...stepGroups, { title: 'New Section', steps: [''] }]);
      };

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
  
    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
  
      const reader = new FileReader();
      const file = e.target.files?.[0]
  
      if(file){
        reader.onload = () => {
          setImage(reader.result);
        }
        reader.readAsDataURL(file);
      }
    }
    const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
      setBlogId(0)
      const item = {
        id: blogId,
        userId: id,
        publisherName: username,
        image: recipeImage,
        date: format(new Date(), 'MM-dd-yyyy'),
        recipeName: name,
        description: description,
        ingredients: ingredientGroups.map(group => ({
          title: group.title,
          ingredients: group.ingredients.map(i => `${i.amount} ${i.measurement} ${i.ingredient}`)
        })),
        steps: stepGroups.map(group => ({
          title: group.title,
          steps: group.steps
        })),
        tags: selectedTags,
        rating: 0,
        numberOfRatings: 0,
        averageRating: 5,
        numberOfLikes: 0,
        postType: 'recipe',
        isPublished: e.currentTarget.textContent === 'Save' ? false : true,
        isDeleted: false
      }
      let result = false
      result = await addBlogItem(item, getToken())
      if (result)
      {
        alert('Post Success!')
        router.push("/Home");
      }else{
        alert('Post Error')
      }
    }
  
  

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
                    ? 'bg-blue-400 text-white border-blue-600'
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
            <FileInput onChange={handleImage} id="Picture" accept="image/png, image/jpg" />
        </div>
        <div className='border-b-1 border-solid border-slate-300 p-2 flex flex-col items-center'>
            <TextInput placeholder='[Recipe Name]' className='w-[200px] pb-2' onChange={(e) => setName(e.target.value)}></TextInput>
            <p className='text-center text-blue-600'>Description 200/{length}</p>
            <TextInput onChange={(e) => setDescription(e.target.value)} className='w-[400px]'></TextInput>
        </div>
        <div className='border-b-1 border-solid border-slate-300 p-2'>
            <p className='font-semibold text-xl text-center'>Ingredients</p>
            {ingredientGroups.map((group, groupIndex) => (
  <div key={groupIndex}>
    <div className='my-2 flex flex-col items-center'>
    <TextInput
      className="w-[400px] font-bold"
      value={group.title}
      onChange={(e) => {
        const newGroups = [...ingredientGroups];
        newGroups[groupIndex].title = e.target.value;
        setIngredientGroups(newGroups);
      }}
    />
    </div>
    {group.ingredients.map((ing, index) => (
        <div key={index} className="flex items-center px-2">
          <Image
            className="h-10 w-10 pr-5 hover:opacity-50 dark:invert cursor-pointer"
            src="../assets/x-lg.svg"
            alt="remove"
            onClick={() => removeIngredient(groupIndex, index)}
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
              onChange={(e) => updateIngredient(groupIndex, index, 'amount', e.target.value)}
            />
          </div>
          <div className="mb-4 px-1">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              MEASUREMENT
            </label>
            <Dropdown label={ing.measurement} className="w-[140px]">
              {[
                'tsp', 'tbsp', 'c', 'qt', 'gal', 'oz', 'lbs', 'kg', 'g', 'ml', 'l', 'sm', 'md', 'lg'
              ].map((unit) => (
                <DropdownItem
                  key={unit}
                  onClick={() => updateIngredient(groupIndex, index, 'measurement', unit)}
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
                updateIngredient(groupIndex, index, 'ingredient', e.target.value)
              }
            />
          </div>
        </div>
    ))}
    <div className='p-2 flex justify-center items-center font-semibold hover:opacity-50 underline text-blue-600 cursor-pointer' onClick={() => addIngredient(groupIndex)}><Image className='h-6 w-6 pr-2' src="../assets/plus-circle.svg" alt="add" width={100} height={100}/><p>Add Ingredient</p></div>
  </div>
))}
  <div className='p-2 flex justify-center items-center font-semibold hover:opacity-50 underline text-blue-600 cursor-pointer' onClick={addIngredientGroup}><Image className='h-6 w-6 pr-2' src="../assets/plus-circle.svg" alt="add" width={100} height={100}/><p>Add Ingredient Group</p></div>
        </div>
        <div className='border-b-1 border-solid border-slate-300 p-2'>
  <p className='font-semibold text-xl text-center'>Instructions</p>
  {stepGroups.map((group, groupIndex) => (
    <div key={groupIndex}>
      <div className='my-2 flex flex-col items-center'>
        <TextInput
          className="w-[400px] font-bold"
          value={group.title}
          onChange={(e) => {
            const newGroups = [...stepGroups];
            newGroups[groupIndex].title = e.target.value;
            setStepGroups(newGroups);
          }}
        />
      </div>
      {group.steps.map((step, stepIndex) => (
        <div key={stepIndex} className="flex items-center px-2">
          <Image
            className="h-10 w-10 pr-5 hover:opacity-50 dark:invert cursor-pointer"
            src="../assets/x-lg.svg"
            alt="remove"
            onClick={() => removeStep(groupIndex, stepIndex)}
            width={100}
            height={100}
          />
          <div className="mb-4 px-1">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Step {stepIndex + 1}
            </label>
            <TextInput
              className="w-[550px]"
              value={step}
              onChange={(e) => updateStep(groupIndex, stepIndex, e.target.value)}
            />
          </div>
        </div>
      ))}
      <div className='p-2 flex justify-center items-center font-semibold hover:opacity-50 underline text-blue-600 cursor-pointer' onClick={() => addStep(groupIndex)}><Image className='h-6 w-6 pr-2' src="../assets/plus-circle.svg" alt="add" width={100} height={100}/><p>Add</p></div>
    </div>
  ))}
  <div className='p-2 flex justify-center items-center font-semibold hover:opacity-50 underline text-blue-600 cursor-pointer' onClick={addStepGroup}><Image className='h-6 w-6 pr-2' src="../assets/plus-circle.svg" alt="add" width={100} height={100}/><p>Add Step Group</p></div>
  </div>


        <div className='border-b-1 border-solid border-slate-300 p-2'>
        <p className='font-semibold text-xl text-center'>Tags</p>
        <div className='flex flex-wrap gap-2 p-2'>
        {selectedTags.length > 0 ? (
                selectedTags.map((tag, i) => (
                  <span
                    key={i} onClick={() => toggleTag(tag)}
                    className="px-3 py-1 bg-blue-200 text-blue-900 rounded-full text-sm cursor-pointer hover:bg-blue-400"
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