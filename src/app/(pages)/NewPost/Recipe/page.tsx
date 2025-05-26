'use client'
import { Button, FileInput, TextInput, Modal, ModalBody, ModalFooter, ModalHeader, Textarea} from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Ingredient, IngredientGroup, StepGroup, tagArr } from '@/app/Utils/Interfaces'
import Image from 'next/image'
import { addBlogItem, getToken } from '@/app/Utils/DataServices'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import MeasurementDropdown from '@/app/Components/MeasurementDropdown'
import BackButton from '@/app/Components/BackButton'

const Recipe = () => {
    const [blogId, setBlogId] = useState<number>(0);
    const [id, setId] = useState<number>(0);
    const [username, setUsername] = useState<string>("");
    const [recipeImage, setImage] = useState<string|ArrayBuffer|null>('../assets/Placeholder.png');
    const [length, setLength] = useState(200);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [totalTime, setTotalTime] = useState('');
    const [servings, setServings] = useState('');
    const [source, setSource] = useState('');
    const [ingredientGroups, setIngredientGroups] = useState<IngredientGroup[]>([
      { title: "", ingredients: [{ amount: '', measurement: 'Measurement', ingredient: '' }] }
    ]);
    const [stepGroups, setStepGroups] = useState<StepGroup[]>([
      { title: "", steps: [] }
    ]);
    const [query, setQuery] = useState<string>('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);
    const [pastedText, setPastedText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);

    const router = useRouter();
  
    useEffect(() => {
      const storedUsername = localStorage.getItem("Username");
      const storedId = localStorage.getItem("UserID");
      setBlogId(0)
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
        setIngredientGroups([...ingredientGroups, { title: '', ingredients: [{ amount: '', measurement: 'Measurement', ingredient: '' }] }]);
      };

      const addStepGroup = () => {
        setStepGroups([...stepGroups, { title: '', steps: [''] }]);
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
  setIsLoading(true);
  setPostSuccess(false);

  const blogItem = {
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
    totalTime: totalTime,
    servings: servings,
    source: source,
    rating: 0,
    numberOfRatings: 0,
    averageRating: 5,
    numberOfLikes: 0,
    postType: 'recipe',
    isPublished: e.currentTarget.textContent === 'Draft' ? false : true,
    isDeleted: false
  };

  const result = await addBlogItem(blogItem, getToken());

  if (result) {
    setPostSuccess(true);
    setTimeout(() => {
      router.push("/Home");
    }, 1500); // delay to show checkmark
  } else {
    setIsLoading(false);
    alert("Post Error");
  }
};


    const handleAutoFill = () => {
      const parsed = parseRecipeText(pastedText);
    
      setName(parsed.title);
      setDescription(parsed.description);
      setTotalTime(parsed.totalTime);
      setServings(parsed.servings);
      setIngredientGroups(parsed.ingredients);
      setStepGroups(parsed.steps);
      setOpenModal2(false)
    };

    const parseRecipeText = (rawText: string) => {
      const lines = rawText.split('\n').map(line => line.trim()).filter(Boolean);
    
      let title = '';
      let description = '';
      let totalTime = '';
      let servings = '';
      const ingredients: IngredientGroup[] = [{ title: '', ingredients: [] }];
      const steps: StepGroup[] = [];
      let currentSection = '';
    
      const unicodeFractions = '½⅓⅔¼¾⅛⅜⅝⅞';
      const ingredientRegex = new RegExp(`^((\\d+[\\s-])?(\\d+\\/\\d+)|[\\d${unicodeFractions}\\/\\.\\s-]+)?\\s*([a-zA-Z]+)?\\s+(.+)$`);
    
      let i = 0;
    
      if (lines.length > 0) title = lines[i++];
      if (lines.length > 1) description = lines[i++];
    
      for (; i < lines.length; i++) {
        const line = lines[i];
    
        if (/ingredients?/i.test(line)) {
          currentSection = 'ingredients';
          continue;
        } else if (/instructions?|directions?/i.test(line)) {
          currentSection = 'steps';
          steps.push({ title: '', steps: [] }); // Initialize step group
          continue;
        }
    
        if (/total time/i.test(line)) {
          totalTime = line.split(':')[1]?.trim() || '';
          continue;
        }
    
        if (/servings?/i.test(line)) {
          servings = line.split(':')[1]?.trim() || '';
          continue;
        }
    
        if (currentSection === 'ingredients') {
          if (!/\d/.test(line) && !ingredientRegex.test(line)) {
            ingredients.push({ title: line, ingredients: [] }); // new group title
            continue;
          }
    
          const match = line.match(ingredientRegex);
          if (match) {
            const amount = (match[1] || '').trim();
            const measurement = (match[4] || 'Measurement').trim();
            const ingredient = (match[5] || '').trim();
    
            ingredients[ingredients.length - 1].ingredients.push({ amount, measurement, ingredient });
          }
        } else if (currentSection === 'steps') {
          if (/^[A-Z][a-z]+:/.test(line)) {
            steps.push({ title: line.replace(':', '').trim(), steps: [] });
          } else {
            if (steps.length === 0) steps.push({ title: '', steps: [] });
            steps[steps.length - 1].steps.push(line.replace(/^\d+\.\s*/, '').trim());
          }
        }
      }
    
      return { title, description, totalTime, servings, ingredients, steps };
    };
    

    const handleScrapeFromURL = async () => {
      if (!source) {
        alert("Please enter a source URL.");
        return;
      }
    
      try {
        const response = await fetch('/api/scrape-recipe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: source }),
        });
    
        const data = await response.json();
    
        if (data.error) {
          alert(data.error);
          return;
        }
    
        const formattedIngredients: IngredientGroup[] = [
          {
            title: '',
            ingredients: data.ingredients.map((line: string) => parseIngredientLine(line)),
          },
        ];
    
        const formattedSteps: StepGroup[] = [
          {
            title: '',
            steps: data.steps.map((s: string) => s.trim()).filter(Boolean),
          },
        ];
    
        setName(data.title);
        setDescription(data.description);
        setTotalTime(data.totalTime);
        setServings(data.servings);
        setIngredientGroups(formattedIngredients);
        setStepGroups(formattedSteps);
    
      } catch (err) {
        console.error(err);
        alert('Failed to scrape recipe from the URL.');
      }
    };

    useEffect(()=> {
      console.log(stepGroups)
    }, [stepGroups])
    
    const parseIngredientLine = (line: string): Ingredient => {
      const fractionRegex = /^((?:\d+\s)?[\d\/⅓⅔¼¾½⅛⅜⅝⅞]+)\s+([a-zA-Z]+)\s+(.+)$/;
      const match = line.match(fractionRegex);
    
      if (match) {
        return {
          amount: match[1].trim(),
          measurement: match[2].trim(),
          ingredient: match[3].trim(),
        };
      } else {
        return {
          amount: '',
          measurement: 'Measurement',
          ingredient: line.trim(),
        };
      }
    };
    
    
    

  return (
    <>
    <BackButton/>
    <div className='px-5 w-full'>
        <Modal show={openModal2} onClose={() => setOpenModal2(false)}>
        <ModalHeader>Paste Recipe</ModalHeader>
        <ModalBody>
                <div className='my-4'>
          <p className='font-bold mb-2'>Paste Recipe</p>
          <textarea
            className='w-full p-2 border rounded h-60'
            placeholder='Paste full recipe here...'
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
          />
          <Button className='mt-2' onClick={handleAutoFill}>Auto Fill Recipe</Button>
        </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setOpenModal2(false)}>Back</Button>
        </ModalFooter>
      </Modal>

        <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>Tags</ModalHeader>
        <ModalBody className="">
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
        <div className='border-b-1 border-solid border-slate-300 p-2 text-2xl font-semibold text-center'>
            New Recipe
        </div>
        <div className='border-b-1 border-solid border-slate-300 p-2'>
          <div className='flex justify-center mb-2'>
          <img src={recipeImage as string} alt="Preview" className="mt-4 max-w-xs rounded-lg" />
          </div>
            <FileInput onChange={handleImage} id="Picture" accept="image/png, image/jpg" />
        </div>
        <div className='border-b-1 border-solid border-slate-300 p-2 flex flex-col items-center'>
        <Button disabled className="mb-2" onClick={() => setOpenModal2(true)}>Paste Recipe</Button>
        <div className="flex items-center gap-2 my-2">
  <TextInput
    value={source}
    onChange={(e) => setSource(e.target.value)}
    placeholder="Paste recipe URL"
    disabled
  />
  <Button disabled onClick={handleScrapeFromURL}>Scrape Recipe</Button>
</div>

            <TextInput value={name} placeholder='[Recipe Name]' className='w-[200px] pb-2' onChange={(e) => setName(e.target.value)}></TextInput>
            <p className='text-center text-blue-600'>Description 200/{length}</p>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} className='w-[350px]'/>
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
                className="w-[350px]"
                onChange={(e) => setSource(e.target.value)}
              />
            </div>
        </div>
        <div className='border-b-1 border-solid border-slate-300 p-2'>
            <p className='font-semibold text-xl text-center'>Ingredients</p>
            {ingredientGroups.map((group, groupIndex) => (
  <div key={groupIndex}>
            <label className="block text-gray-700 text-sm font-bold pl-15 mb-2">
              INGREDIENT GROUP {groupIndex + 1}
            </label>
    <div className='my-2 flex items-center px-2'>
        <Image
            className="h-10 w-10 pr-5 hover:opacity-50 dark:invert cursor-pointer"
            src="../assets/x-lg.svg"
            alt="remove"
            onClick={() => removeIngredientGroup(groupIndex)}
            width={100}
            height={100}
        />
      <TextInput
        className="w-[550px] font-bold"
        placeholder='ex. pie filling/piecrust'
        value={group.title}
        onChange={(e) => {
          const newGroups = [...ingredientGroups];
          newGroups[groupIndex].title = e.target.value;
          setIngredientGroups(newGroups);
        }}
      />
    </div>
    <div className="flex pl-5">
            <label className="block text-gray-700 text-sm pl-10 font-bold mb-2">
              AMOUNT
            </label>
            <label className="block text-gray-700 text-sm font-bold pl-6 mb-2">
              MEASUREMENT
            </label>
            <label className="block text-gray-700 text-sm font-bold pl-6 mb-2">
              INGREDIENT
            </label>
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
            <TextInput
              className="w-[80px]"
              value={ing.amount}
              onChange={(e) => updateIngredient(groupIndex, index, 'amount', e.target.value)}
            />
          </div>
          <div className="mb-4 px-1">
            <MeasurementDropdown
              selected={ing.measurement}
              onSelect={(val) => updateIngredient(groupIndex, index, 'measurement', val)}
            />
          </div>
          <div className="mb-4 px-1">
            <TextInput
              className="w-[250px]"
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
    <label className="block text-gray-700 text-sm font-bold pl-15 mb-2">
              STEP GROUP {groupIndex + 1}
    </label>
      <div className='my-2 flex items-center px-2'>
      <Image
            className="h-10 w-10 pr-5 hover:opacity-50 dark:invert cursor-pointer"
            src="../assets/x-lg.svg"
            alt="remove"
            onClick={() => removeStepGroup(groupIndex)}
            width={100}
            height={100}
        />
        <TextInput
          className="w-[500px] font-bold"
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
            <Textarea
              className="w-[450px]"
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
            <Button onClick={handleSave} outline className='mx-1 w-[100px]'>Draft</Button>
            <Button onClick={handleSave} className='mx-1 w-[100px]'>Post</Button>
        </div>
    </div>
    {isLoading && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000080]">
    {!postSuccess ? (
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-white border-dashed rounded-full animate-spin"></div>
        <span className="text-white text-xl font-medium">Posting...</span>
      </div>
    ) : (
      <div className="flex flex-col items-center space-y-4">
        <svg
          className="w-16 h-16 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span className="text-white text-xl font-medium">Success!</span>
      </div>
    )}
  </div>
)}

    </>
  )
}

export default Recipe