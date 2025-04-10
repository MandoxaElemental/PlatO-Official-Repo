import { IBlogItems, IUserData, IUserInfoCreate, IUserInfoLogin } from "./Interfaces"

const url = "https://platobackend-a7hagaahdvdfesgm.westus-01.azurewebsites.net"

let userData: IUserData

export const createAccount = async (user: IUserInfoCreate) =>
{
    const response = await fetch(`${url}/User/CreateUser`,
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });

    if (!response.ok)
    {
        const data = await response.json();
        const message = data.message;
        console.log(message);
        return data.success;
    }

    const data = await response.json();
    return data.success;
}

export const login = async (user: IUserInfoLogin) =>
{
    const response = await fetch(`${url}/User/Login`,
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });

    if (!response.ok)
    {
        const data = await response.json();
        const message = data.message;
        console.log(message);
        return null;
    }

    const data = await response.json();
    return data;
}

export const getUserInfoByUsername = async (username: string) =>
{
    const response = await fetch(`${url}/User/GetUserByUsername/${username}`);
    userData = await response.json();
    return userData;
}

export const getUserInfoByEmail = async (email: string) =>
{
    const response = await fetch(`${url}/User/GetUserByEmail/${email}`)
    userData = await response.json();
    return userData;
}


export const getLoggedInUserData = async (username:string) => {
    const res = await fetch(url + `User/GetUserInfoByUsername/${username}`)

    if(!res.ok){
        const data = await res.json()
        const message = data.message;
        console.log(message)
        return null
    }
    userData = await res.json()
    return userData;
}

export const loggedInData = () => {
    return userData;
}

export const checkToken = () =>
{
    let result = false;

    if (typeof window !== null)
    {
        const isData = localStorage.getItem("Token");

        if (isData != null)
        {
            result = true;
        }
    }
    return result;
}

//----------BLOG ENDPOINTS----------//

export const getAllBlogs = async (token: string) =>
{
    const response = await fetch(`${url}/Blog/GetAllBlogs`,
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    });
    if (!response.ok)
    {
        const errorData = await response.json();
        const message = errorData.message;
        console.log(message);
        return [];
    }

    const data = await response.json();
    return data;
}

export const getBlogItemsByUserId = async (userId: number, token: string) =>
{
    const response = await fetch(`${url}/Blog/GetBlogsByUserId/${userId}`,
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    });
    if (!response.ok)
    {
        const errorData = await response.json();
        const message = errorData.message;
        console.log(message);
        return [];
    }
    
    const data = await response.json();
    return data;
}

export const addBlogItem = async (blog: IBlogItems, token: string) =>
{
    const response = await fetch(`${url}/Blog/AddBlog`,
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(blog)
    });
    if (!response.ok)
    {
        const errorData = await response.json();
        const message = errorData.message;
        console.log(message);
        return false;
    }
    const data = await response.json();
    return data.success;
}

export const updateBlogItem = async (blog: IBlogItems, token: string) =>
{
    const response = await fetch(`${url}/Blog/EditBlog`,
    {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(blog)
    });
    if (!response.ok)
    {
        const errorData = await response.json();
        const message = errorData.message;
        console.log(message);
        return false;
    }
    const data = await response.json();
    return data.success;
}

export const deleteBlogItem = async (blog: IBlogItems, token: string) =>
{
    const response = await fetch(`${url}/Blog/DeleteBlog`,
    {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(blog)
    });
    if (!response.ok)
    {
        const errorData = await response.json();
        const message = errorData.message;
        console.log(message);
        return false;
    }
    const data = await response.json();
    return data.success;
}

export const getToken = () => {
    return localStorage.getItem("Token") ?? '';
}