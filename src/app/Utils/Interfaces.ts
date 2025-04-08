export interface IBlogItems
{
    id: number,
    userId: number,
    publisherName: string,
    date: string,
    image: string,
    recipeName: string,
    description: string
    ingredients: string,
    steps: string,
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

export interface IToken
{
    token: string
}

export interface Ingredients {
    amount: number
    measurement: string
    ingredient: string
}