'use client'
import { Button, FileInput, TextInput, Modal, ModalBody, ModalFooter, ModalHeader, Textarea} from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Ingredient, IngredientGroup, StepGroup, tagArr } from '@/app/Utils/Interfaces'
import Image from 'next/image'
import {getBlogbyId, getToken, updateBlogItem } from '@/app/Utils/DataServices'
import { format } from 'date-fns'
import { useParams, useRouter } from 'next/navigation'
import MeasurementDropdown from '@/app/Components/MeasurementDropdown'

const Recipe = () => {
    const [id, setId] = useState<number>(0);
    const [username, setUsername] = useState<string>("");
    const [recipeImage, setImage] = useState<string>('');
    const [length, setLength] = useState(200);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [ingredientGroups, setIngredientGroups] = useState<IngredientGroup[]>([
      { title: "", ingredients: [{ amount: '', measurement: 'Measurement', ingredient: '' }] }
        ]);
    const [stepGroups, setStepGroups] = useState<StepGroup[]>([
      { title: "", steps: [""] }
    ]);
    const [query, setQuery] = useState<string>('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [totalTime, setTotalTime] = useState('');
    const [servings, setServings] = useState('');
    const [source, setSource] = useState('');
    const [rating, setRating] = useState<number>(0);
    const [ratingNumber, setRatingNumber] = useState<number>(0);
    const [ratingAverage, setRatingAverage] = useState<number>(0);
    const [likes, setLikes] = useState<number>(0);
    const [openModal, setOpenModal] = useState(false);
    const [postType, setPostType] = useState<'recipe' | 'image' | 'video'>('recipe');
    const router = useRouter();
    const { postId } = useParams();

    useEffect(() => {
      const getData = async () => {
        if (!postId) return;
      
        const data = await getBlogbyId(Number(postId), getToken());

        setPostType(data.postType);
      
        const parseIngredients = (rawIngredients: string[]): Ingredient[] => {
          const measurements = [
            'tsp', 'teaspoon', 'teaspoons',
            'tbsp', 'tablespoon', 'tablespoons',
            'c', 'cup', 'cups',
            'pt', 'pint', 'pints',
            'qt', 'quart', 'quarts',
            'gal', 'gallon', 'gallons',
            'oz', 'ounce', 'ounces',
            'lb', 'lbs', 'pound', 'pounds',
            'ml', 'dl', 'l', 'liter', 'liters',
            'mg', 'g', 'gram', 'grams', 'kg', 'kilogram', 'kilograms',
            'sm', 'md', 'lg', 'pinch', 'dash',
            'piece', 'pieces', 'whole', 'half', 'slice', 'clove', 'stick', 'can', 'bottle', 'pkg',
            'large', 'medium', 'small', "Measurement"
          ];          return rawIngredients.map((item) => {
            const parts = item.trim().split(' ');
            const amountParts: string[] = [];
            let measurement = 'Measurement';
            let ingredient = '';
      
            for (let i = 0; i < parts.length; i++) {
              const part = parts[i];
              if (measurements.includes(part)) {
                measurement = part;
                ingredient = parts.slice(i + 1).join(' ');
                break;
              } else {
                amountParts.push(part);
              }
            }
      
            return {
              amount: amountParts.join(' '),
              measurement,
              ingredient
            };
          });
        };
      
        setName(data.recipeName);
        setId(data.id);
        setImage(data.image);
        setDescription(data.description);
      
        setIngredientGroups(
          (data.ingredients as IngredientGroup[]).map((group) => ({
            title: group.title || "",
            ingredients: parseIngredients(group.ingredients as [] || [])
          }))
        );
        
        setStepGroups(
          (data.steps as StepGroup[] || []).map((group) => ({
            title: group.title || "",
            steps: group.steps || []
          }))
        );

        setSelectedTags(data.tags || []);
        setTotalTime(data.totalTime)
        setServings(data.servings)
        setSource(data.source)
        setRating(data.rating);
        setRatingNumber(data.numberOfRatings);
        setRatingAverage(data.averageRating);
        setLikes(data.numberOfLikes);
      };
      
      
        getData();
      }, [postId]);
      

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

          const removeIngredientGroup = (groupIndex: number) => {
            const newGroups = [...ingredientGroups];
            newGroups.splice(groupIndex, 1);
            setIngredientGroups(newGroups);
          };
          
          const removeStepGroup = (groupIndex: number) => {
            const newGroups = [...stepGroups];
            newGroups.splice(groupIndex, 1);
            setStepGroups(newGroups);
          };
   

    useEffect(() => {
      const num = (200 - description.length)
      setLength(num)
      if(description.length === 200){
        alert('error')
      }
    }, [description])

        const filteredCategories = tagArr
      .map((cat) => ({
        ...cat,
        tags: cat.tags.filter((tag) =>
          tag.toLowerCase().includes(query.toLowerCase())
        )
      }))
      .filter((cat) => cat.tags.length > 0);

    const toggleTag = (tag: string) => {
      setSelectedTags((prevSelected) =>
        prevSelected.includes(tag)
          ? prevSelected.filter((t) => t !== tag)
          : [...prevSelected, tag]
      );
    };

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  }
};

    const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const item = {
          id: Number(postId),
          userId: id,
          publisherName: username,
          image: recipeImage,
          date: `${format(new Date(), 'MM-dd-yyyy')} (edited)`,
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
          totalTime: totalTime,
          servings: servings,
          source: source,
          rating: rating,
          numberOfRatings: ratingNumber,
          averageRating: ratingAverage,
          numberOfLikes: likes,
          postType: postType,
          isPublished:  e.currentTarget.textContent === 'Draft' ? false : true,
          isDeleted: false
        };
            
        const result = await updateBlogItem(item, getToken());
      
        if (result) {
          alert('Edit Success!');
          router.push("/Home");
        } else {
          alert('Edit Error');
        }
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
            <div className='w-screen-min'>                
              <div className="space-y-4">
              {filteredCategories.map((cat, i) => (
                <div key={i}>
                  <h3 className="text-md font-bold text-gray-700 mb-2">{cat.category}</h3>
                  <div className="grid grid-cols-4 gap-3">
                    {cat.tags.map((tag, j) => {
                      const isSelected = selectedTags.includes(tag);
                      return (
                        <button
                          key={j}
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
                    })}
                  </div>
                </div>
              ))}
            </div>

              </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setOpenModal(false)}>Back</Button>
        </ModalFooter>
      </Modal>
        <div className='border-b-1 border-solid border-blue-100 p-2 text-2xl font-semibold text-center'>
            Edit {postType === 'recipe' ? "Recipe" : "Post"}
        </div>
        <div className='border-b-1 border-solid border-blue-100 p-2'>
          <div className="flex justify-center mb-2">
                <div className="my-4">
                    <Image
                      src={recipeImage}
                      alt="Uploaded preview"
                      width={400}
                      height={300}
                      className="rounded-lg object-cover"
                    />
                  </div>
                </div>
            <FileInput onChange={handleImage} id="Picture" accept="image/png, image/jpg" />
        </div>
        <div className='border-b-1 border-solid border-blue-100 p-2 flex flex-col items-center'>
          {postType === 'recipe' && (
              <>
                <TextInput value={name} placeholder='[Recipe Name]' className='w-[200px] pb-2' onChange={(e) => setName(e.target.value)}/>
              </>
            )}
            <p className='text-center text-blue-600'>Description 200/{length}</p>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} className='w-[400px]'/>
            {postType === 'recipe' && (
              <>
                        <div className="mt-4 flex justify-between">    
                      <div className="px-1">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Total Time
                        </label>
                        <TextInput value={totalTime}
                          className="w-[100px]"
                          onChange={(e) => setTotalTime(e.target.value)}
                        />
                      </div>
                      <div className="px-1">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Servings
                      </label>
                      <TextInput value={servings}
                        className="w-[100px]"
                        onChange={(e) => setServings(e.target.value)}
                      />
                    </div>
                    </div>
                    <div className="mb-4 px-1">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Source
                        </label>
                        <TextInput
                          className="w-[400px]"
                          onChange={(e) => setSource(e.target.value)}
                        />
                      </div>
              </>
            )}
        </div>
        {postType === 'recipe' && (
              <>
        <div className='border-b-1 border-solid border-blue-100 p-2'>
            <p className='font-semibold text-xl text-center'>Ingredients</p>
            {ingredientGroups.map((group, groupIndex) => (
  <div key={groupIndex}>
     <label className="block text-gray-700 text-sm font-bold mb-2">
              INGREDIENT GROUP {groupIndex + 1}
            </label>
    <div className='my-2 flex items-center px-2'>
      <TextInput
        className="w-full font-bold"
        placeholder='ex. pie filling/piecrust'
        value={group.title}
        onChange={(e) => {
          const newGroups = [...ingredientGroups];
          newGroups[groupIndex].title = e.target.value;
          setIngredientGroups(newGroups);
        }}
      />
      <Image className="h-8 w-8 pt-2 pl-2 hover:opacity-50 dark:invert cursor-pointer" src="../assets/trash.svg" alt="remove" onClick={() => removeIngredientGroup(groupIndex)} width={100} height={100}/>

    </div>

{group.ingredients.map((ing, index) => (
  <div
    key={index}
    className="ml-5 flex flex-col md:flex-row md:items-center px-2 mb-2"
  >

    <div className="flex flex-row md:flex-row gap-2 mb-2 md:mb-0">
      <TextInput
      placeholder="Amount"
        className="w-[80px]"
        value={ing.amount}
        onChange={(e) =>
          updateIngredient(groupIndex, index, 'amount', e.target.value)
        }
      />
      <MeasurementDropdown
        selected={ing.measurement}
        onSelect={(val) =>
          updateIngredient(groupIndex, index, 'measurement', val)
        }
      />
    </div>

    <div className="flex mb-4 px-1 md:mb-0 md:px-1 md:ml-2 w-full">
      <TextInput
      placeholder="Ingredient"
        className="w-full"
        value={ing.ingredient}
        onChange={(e) =>
          updateIngredient(groupIndex, index, 'ingredient', e.target.value)
        }
      />
                <Image className="h-8 w-8 pt-2 pl-2 hover:opacity-50 dark:invert cursor-pointer" src="../assets/trash.svg" alt="remove" onClick={() => removeIngredient(groupIndex, index)} width={100} height={100}/>

    </div>
  </div>
))}

              <div className="flex justify-center">
                <div className="w-[250px}">
                <Button className="m-2 rounded-md bg-orange-200 hover:bg-orange-400 text-black w-full h-8 cursor-pointer dark:bg-orange-100 dark:hover:bg-orange-200 font-semibold" onClick={() => addIngredient(groupIndex)}>Add Ingredient</Button>
                </div>
              </div>
                </div>
              ))}
              <Button className="m-2 rounded-md bg-orange-200 hover:bg-orange-400 text-black w-full h-8 cursor-pointer dark:bg-orange-100 dark:hover:bg-orange-200 font-semibold" onClick={addIngredientGroup}>Add Ingredient Group</Button>

                    </div>
                    <div className='border-b-1 border-solid border-blue-100 p-2'>
  <p className='font-semibold text-xl text-center'>Instructions</p>
  {stepGroups.map((group, groupIndex) => (
    <div key={groupIndex}>
     <label className="block text-gray-700 text-sm font-bold mb-2">
              STEP GROUP {groupIndex + 1}
            </label>
            <div className="flex px-2 mb-2">
            <TextInput
          className="w-full"
              value={group.title}
          onChange={(e) => {
            const newGroups = [...stepGroups];
            newGroups[groupIndex].title = e.target.value;
            setStepGroups(newGroups);
          }}
              />
          <Image className="h-8 w-8 pt-2 pl-2 hover:opacity-50 dark:invert cursor-pointer" src="../assets/trash.svg" alt="remove" onClick={() => removeStepGroup(groupIndex)} width={100} height={100}/>
            </div>
      {group.steps.map((step, stepIndex) => (
        <div key={stepIndex} className="ml-5 flex items-center px-2 mb-4">
          <div className="px-1 w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Step {stepIndex + 1}
            </label>
            <div className="flex">
            <TextInput
          className="w-full"
              value={step}
              onChange={(e) => updateStep(groupIndex, stepIndex, e.target.value)}
              />
          <Image className="h-8 w-8 pt-2 pl-2 hover:opacity-50 dark:invert cursor-pointer" src="../assets/trash.svg" alt="remove" onClick={() => removeStep(groupIndex, stepIndex)} width={100} height={100}/>
            </div>
          </div>
        </div>
      ))}
              <div className="flex justify-center">
                <div className="w-[250px}">
                <Button className="m-2 rounded-md bg-orange-200 hover:bg-orange-400 text-black w-full h-8 cursor-pointer dark:bg-orange-100 dark:hover:bg-orange-200 font-semibold" onClick={() => addStep(groupIndex)}>Add Step</Button>
                </div>
              </div>
                </div>
              ))}
              <Button className="m-2 rounded-md bg-orange-200 hover:bg-orange-400 text-black w-full h-8 cursor-pointer dark:bg-orange-100 dark:hover:bg-orange-200 font-semibold" onClick={addStepGroup}>Add Step Group</Button>

        </div>
              </>
        )}

        <div className='border-b-1 border-solid border-blue-100 p-2'>
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
            <Button onClick={handleSave} outline className='mx-1 w-[100px]'>Draft</Button>
            <Button onClick={handleSave} className='mx-1 w-[100px]'>Save</Button>
        </div>
    </div>
  )
}

export default Recipe