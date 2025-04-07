import { IBlogItems, IUserData, IUserInfo } from "./Interfaces";

const url = "https://platobackend-a7hagaahdvdfesgm.westus-01.azurewebsites.net"


let userData : IUserData;

export const createAccount = async (user: IUserInfo) => {
    const res = await fetch(url + "User/CreateUser" , {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(user)
    });

    if(!res.ok){
        const data = await res.json();
        const message = data.message;
        console.log(message)
        return data.success;
    }

    const data = await res.json();
    return data.success;
}

export const login = async (user: IUserInfo) => {
    const res = await fetch(url + "User/Login" , {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(user)
    });

    if(!res.ok){
        const data = await res.json();
        const message = data.message;
        console.log(message);

        return null
    }

    const data = await res.json();
    return data;
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

export const checkToken = () => {
    let result = false;
    if(typeof window !== null){
        const isData = localStorage.getItem("Token")
    
        if(isData != null){
            result = true
        }
    }
    return result
}

export const getAllBlogs = async (token: string) => {
    const res = await fetch(url + "Blog/GetAllBlogs", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    });
    if(!res.ok)
    {
        const errorData = await res.json();
        const message = errorData.message;
        console.log(message)
        return [];
    }
    const data = await res.json();
    return data;
}

export const getBlogItemsByUserID = async (userId: number, token: string) => {
    const res = await fetch(url + "Blog/GetBlogsByUserId/" + userId, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    });
    if(!res.ok)
    {
        const errorData = await res.json();
        const message = errorData.message;
        console.log(message)
        return [];
    }
    const data = await res.json();
    return data;
}

export const addBlogItem = async (blog:IBlogItems, token:string) => {
    const res = await fetch(url + "Blog/AddBlog", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
        body:JSON.stringify(blog)
    });
    if(!res.ok)
        {
            const errorData = await res.json();
            const message = errorData.message;
            console.log(message)
            return false;
        }
        const data = await res.json();
        return data.success;
}

export const updateBlogItem = async (blog:IBlogItems, token:string) => {
    const res = await fetch(url + "Blog/EditBlog", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body:JSON.stringify(blog)

    });
    if(!res.ok)
        {
            const errorData = await res.json();
            const message = errorData.message;
            console.log(message)
            return false;
        }
        const data = await res.json();
        return data.success;
}

export const deleteBlogItem = async (blog:IBlogItems, token:string) => {
    const res = await fetch(url + "Blog/DeleteBlog", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body:JSON.stringify(blog)

    });
    if(!res.ok)
        {
            const errorData = await res.json();
            const message = errorData.message;
            console.log(message)
            return false;
        }
        const data = await res.json();
        return data.success;
}

export const getToken = () => {
    return localStorage.getItem("Token") ?? '';
}