import { IUserData, IUserInfoCreate, IUserInfoLogin } from "./Interfaces"

const url = "https://platobackend-a7hagaahdvdfesgm.westus-01.azurewebsites.net"

let userData: IUserData

export const createAccount = async (user: IUserInfoCreate) =>
{
    console.log(user);

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