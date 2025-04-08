export interface IBlogItems{
    id: number
    userId: number
    publisherName: string
    date: string
    image: string
    recipeName: string
    description: string
    ingredients: string
    steps: string
    isPublished: boolean
    isDeleted: boolean
}
export interface IUserInfo {
username: string
password: string
}
export interface IUserData {
id: number
username: string
}
export interface IToken {
token: string
}

export interface Ingredients {
    amount: number
    measurement: string
    ingredient: string
}