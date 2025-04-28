export interface IBlogItems
{
    id: number,
    userId: number,
    publisherName: string,
    date: string,
    image: string|ArrayBuffer|null,
    recipeName: string,
    description: string,
    ingredients: string[],
    steps: string[],
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

  
export const tagArr: Array<string> = [
    'Fruits',
    'Meat',
    'Chicken',
    'Beef',
    'Pork',
    'Sheep',
    'Goat',
    'Turkey',
    'Seafood',
    'Fish',
    'Lobster',
    'Crab',
    'Vegetables',
    'Baked',
    'Muffins',
    'Cookies',
    'Cake',
    'Bread',
    'Cupcakes',
    'Brownies',
    'Gluten Free',
    'Vegan',
    'Paleo',
    'Drinks',
    'Homemade',
    'Breakfast',
    'Lunch',
    'Dinner',
    'Snack',
    'Dessert',
    'Foreign',
    'Eggs',
    'Filipino',
    'Spanish',
    'Mexican',
    'Japanese',
    'Greek',
    'Nigerian'
];