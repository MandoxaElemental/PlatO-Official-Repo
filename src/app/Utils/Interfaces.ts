export interface IBlogItems
{
    id: number,
    userId: number,
    publisherName: string,
    date: string,
    image: string|ArrayBuffer|null,
    recipeName: string,
    description: string,
    // ingredients: {
    //     title: string,
    //     ingredients: string[]
    // }[],
    // steps: {
    //     title: string,
    //     steps: string[]
    // }[],
    tags: string[],
    rating: number,
    numberOfRatings: number,
    averageRating: number,
    numberOfLikes: number,
    postType: string,
    isPublished: boolean,
    isDeleted: boolean
}

export interface IUserInfoLogin
{
    username: string,
    email: string,
    password: string
}

export interface IIngredientItems
{
    blogId: number,
    title: string,
    ingredients: string[]
}

export interface IStepItems
{
    blogId: number,
    title: string,
    steps: string[]
}

export interface IUserInfoCreate
{
    email: string,
    username: string,
    password: string,
    name: string,
    phoneNumber: string,
    dateOfBirth: string
}

export interface IUserData
{
    id: number,
    name: string,
    username: string,
    email: string,
    phoneNumber: string,
    dateOfBirth: string,
    profilePicture: string
}
export interface ICommentItems
{
    id: number,
    blogId: number,
    userId: number,
    publisherName: string,
    date: string,
    comment: string,
    isPublished: boolean,
    isDeleted: boolean

}
export interface IReplyItems
{
    id: number,
  commentId: number,
  userId: number,
  publisherName: string,
  date: string,
  reply: string,
  isPublished: boolean,
  isDeleted: boolean
}

export interface IToken
{
    token: string
}

export interface Ingredient {
    amount: string
    measurement: string
    ingredient: string
}

export interface ProfileProps {
    params: {
      username: string;
    };
  }

  export interface IngredientGroup {
    title: string;
    ingredients: Ingredient[];
  }
  
  export interface StepGroup {
    title: string;
    steps: string[];
  }

  export interface TagCategory {
    category: string;
    tags: string[];
  }
  
export const tagArr: TagCategory[] = [
    {
        category: "Meal Type",
        tags: [
          "Breakfast",
          "Brunch",
          "Lunch",
          "Dinner",
          "Snack",
          "Dessert",
          "Appetizer",
          "Side Dish",
          "Main Course",
          "Baked",
          "Homemade",
          "Street Food",
          "Comfort Food",
          "Holiday Food",
          "Party Food"
        ],
    },
    {
        category: "Cuisine",
        tags: [
          "Filipino",
          "Spanish",
          "Mexican",
          "Japanese",
          "Greek",
          "Nigerian",
          "Chinese",
          "Italian",
          "Indian",
          "Thai",
          "Korean",
          "Vietnamese",
          "French",
          "American",
          "Middle Eastern",
          "Mediterranean",
          "Brazilian",
          "Caribbean",
          "German",
          "Ethiopian",
          "Russian",
          "Turkish",
          "International"
        ]
    },
    {
      category: "Ingredients",
      tags: [
        "Meat", "Beef", "Chicken", "Pork", "Turkey", "Lamb", "Goat", "Sheep", "Duck", "Veal", "Game Meat",
        "Seafood", "Fish", "Salmon", "Tuna", "Lobster", "Crab", "Shrimp", "Oysters", "Scallops", "Clams", "Squid",
        "Vegetables", "Leafy Greens", "Root Vegetables", "Fruits", "Berries", "Tropical Fruits", "Citrus", "Tomatoes", "Onions", "Garlic", "Mushrooms",
        "Eggs", "Cheese", "Tofu", "Tempeh", "Legumes", "Beans", "Lentils", "Nuts", "Seeds", "Rice", "Pasta", "Potatoes", "Grains", "Corn", "Quinoa", "Oats", "Bread"
      ]
    },
        {
            category: "Dietary", 
            tags: [
              "Vegan",
              "Vegetarian",
              "Pescatarian",
              "Gluten Free",
              "Dairy Free",
              "Nut Free",
              "Soy Free",
              "Low Carb",
              "Low Fat",
              "High Protein",
              "Paleo",
              "Keto",
              "Whole30",
              "Diabetic Friendly",
              "Heart Healthy"
            ],
        },
        {
            category: "Cooking Method",
            tags: [
            "Grilled",
          "Roasted",
          "Baked",
          "Fried",
          "Deep Fried",
          "Steamed",
          "Boiled",
          "Blanched",
          "Poached",
          "Slow Cooked",
          "Pressure Cooked",
          "Instant Pot",
          "Air Fried",
          "Raw",
          "Sous Vide",
          "Stir Fried",
          "Smoked"
        ]
    }, 
    {
       category: "Dish Type", 
       tags: [
          "Soup",
          "Stew",
          "Casserole",
          "Salad",
          "Sandwich",
          "Wrap",
          "Pizza",
          "Pasta",
          "Noodles",
          "Rice Dish",
          "Grain Bowl",
          "Skewers",
          "Tacos",
          "Burrito",
          "Curry",
          "Dip",
          "Smoothie",
          "Juice"
        ]
    },
    {
      category: "Baked Goods",
      tags: [
        "Cake",
        "Cookies",
        "Brownies",
        "Cupcakes",
        "Muffins",
        "Bread",
        "Scones",
        "Biscuits",
        "Pies",
        "Tarts",
        "Pastries",
        "Donuts",
        "Bagels",
        "Rolls",
        "Croissants"
      ],
    },
    {
      category: "Drinks",
      tags: [
        "Drinks",
        "Smoothie",
        "Milkshake",
        "Juice",
        "Iced Tea",
        "Lemonade",
        "Cocktails",
        "Mocktails",
        "Coffee",
        "Tea",
        "Hot Chocolate",
        "Infused Water",
        "Soda",
        "Alcoholic",
        "Non-Alcoholic"
      ]
    },
    {
      category: "Occasion", 
      tags: [
        "Christmas",
        "Thanksgiving",
        "Easter",
        "New Year",
        "Valentine's Day",
        "Halloween",
        "Birthday",
        "Ramadan",
        "Hanukkah",
        "Weekend",
        "Weeknight",
        "Picnic",
        "BBQ",
        "Potluck"
      ]
    }
     
];

export interface StarRatingProps {
    currentRating: number;
    onRate: (rating: number) => void;
  }