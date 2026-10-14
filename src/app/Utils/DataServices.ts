import axios from "axios";
import { supabase } from "@/app/lib/supabase";
import {
  IBlogItems,
  ICommentItems,
  IConversation,
  IIngredientItems,
  IMessage,
  IReplyItems,
  IStepItems,
  IUserData,
  IUserInfoCreate,
  IUserInfoLogin,
} from "./Interfaces";

// const url = "https://plato-backend-service-ckfsdddugkazhmgz.westus-01.azurewebsites.net"
const url = "https://platobackend-a7hagaahdvdfesgm.westus-01.azurewebsites.net";

let userData: IUserData;

// export const createAccount = async (user: IUserInfoCreate) => {
//   const response = await fetch(`${url}/User/CreateUser`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(user),
//   });

//   if (!response.ok) {
//     const data = await response.json();
//     const message = data.message;
//     console.log(message);
//     return data.success;
//   }

//   const data = await response.json();
//   return data.success;
// };

export const createAccount = async (user: IUserInfoCreate) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: user.email.trim(),
      password: user.password,
      options: {
        data: {
          username: user.username.trim().toLowerCase(),
          name: user.name.trim(),
          phone_number: user.phoneNumber.trim(),
          date_of_birth: user.dateOfBirth,
          interests: user.interests ?? [],
        },
      },
    });

    if (error) {
      console.error("Signup error:", error.message);
      return {
        success: false,
        message: error.message,
      };
    }

    if (!data.user) {
      return {
        success: false,
        message: "Supabase did not return a user.",
      };
    }

    return {
      success: true,
      message: data.session
        ? "Account created successfully."
        : "Account created. Check your email to confirm your account.",
    };
  } catch (error) {
    console.error("Unexpected signup error:", error);
    return {
      success: false,
      message: "Something went wrong while creating your account.",
    };
  }
};

export const login = async (user: IUserInfoLogin) => {
  try {
    const email = user.email.trim();

    if (!email) {
      return {
        success: false,
        message: "Please sign in with your email address.",
        user: null,
        session: null,
      };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: user.password,
    });

    if (error) {
      console.error("Login error:", error.message);

      return {
        success: false,
        message: error.message,
        user: null,
        session: null,
      };
    }

    return {
      success: true,
      message: "Login successful.",
      user: data.user,
      session: data.session,
    };
  } catch (error) {
    console.error("Unexpected login error:", error);

    return {
      success: false,
      message: "Something went wrong while signing in.",
      user: null,
      session: null,
    };
  }
};

export const updateUserItem = async (
  user: Partial<IUserData>,
  _token?: string,
): Promise<boolean> => {
  try {
    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !authUser) {
      console.error("Profile update requires a signed-in user.");
      return false;
    }

    const updates: Record<string, unknown> = {};

    if (user.name !== undefined) {
      updates.name = user.name;
    }

    if (user.username !== undefined) {
      updates.username = user.username.trim().toLowerCase();
    }

    if (user.phoneNumber !== undefined) {
      updates.phone_number = user.phoneNumber;
    }

    if (user.dateOfBirth !== undefined) {
      updates.date_of_birth = user.dateOfBirth || null;
    }

    if (user.profilePicture !== undefined) {
      updates.profile_picture = user.profilePicture;
    }

    if (user.interests !== undefined) {
      updates.interests = user.interests;
    }

    if (Object.keys(updates).length === 0) {
      return false;
    }

    const { error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", authUser.id);

    if (error) {
      console.error("Profile update failed:", error.message);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Unexpected profile update error:", error);
    return false;
  }
};

// export const updateUserItem = async (user: IUserData, token: string) => {
//   const response = await fetch(`${url}/User/EditUser`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + token,
//     },
//     body: JSON.stringify(user),
//   });
//   if (!response.ok) {
//     const errorData = await response.json();
//     const message = errorData.message;
//     console.log(message);
//     return false;
//   }
//   const data = await response.json();
//   return data.success;
// };

export const getUserInfoByUsername = async (username: string) => {
  const response = await fetch(`${url}/User/GetUserByUsername/${username}`);
  userData = await response.json();
  return userData;
};

export const getUserInfoById = async (userId: string) => {
  const response = await fetch(`${url}/User/GetUserById/${userId}`);
  userData = await response.json();
  return userData;
};

export const getUserInfoByEmail = async (email: string) => {
  const response = await fetch(`${url}/User/GetUserByEmail/${email}`);
  userData = await response.json();
  return userData;
};

export const getLoggedInUserData = async (username: string) => {
  const res = await fetch(url + `User/GetUserInfoByUsername/${username}`);

  if (!res.ok) {
    const data = await res.json();
    const message = data.message;
    console.log(message);
    return null;
  }
  userData = await res.json();
  return userData;
};

export const loggedInData = () => {
  return userData;
};

export const checkToken = () => {
  let result = false;

  if (typeof window !== null) {
    const isData = localStorage.getItem("Token");

    if (isData != null) {
      result = true;
    }
  }
  return result;
};

export const followUser = async (
  followerId: number,
  targetUserId: number,
  token: string,
): Promise<boolean> => {
  try {
    const response = await fetch(
      url + `/User/FollowUser/${followerId}/${targetUserId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.Message || "Follow action failed.");
    }

    return true;
  } catch (error) {
    console.error("followUser error:", error);
    return false;
  }
};

//----------BLOG ENDPOINTS----------//

export const getAllBlogs = async (token: string) => {
  const response = await fetch(`${url}/Blog/GetAllBlogs`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData.message;
    console.log(message);
    return [];
  }

  const data = await response.json();
  return data;
};

export const getBlogItemsByUserId = async (userId: number, token: string) => {
  const response = await fetch(`${url}/Blog/GetBlogsByUserId/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData.message;
    console.log(message);
    return [];
  }

  const data = await response.json();
  return data;
};
export const getBlogbyId = async (blogId: number, token: string) => {
  const response = await fetch(`${url}/Blog/GetBlogById/${blogId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData.message;
    console.log(message);
    return [];
  }

  const data = await response.json();
  return data;
};
export const getBlogbyTag = async (tag: string, token: string) => {
  const response = await fetch(`${url}/Blog/GetBlogsByTags/${tag}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData.message;
    console.log(message);
    return [];
  }

  const data = await response.json();
  return data;
};

export const addBlogItem = async (blog: IBlogItems, token: string) => {
  const response = await fetch(`${url}/Blog/AddBlog`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(blog),
  });
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData.message;
    console.log(message);
    return false;
  }
  const data = await response.json();
  return data.success;
};

export const updateBlogItem = async (blog: IBlogItems, token: string) => {
  const response = await fetch(`${url}/Blog/EditBlog`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(blog),
  });
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData.message;
    console.log(message);
    return false;
  }
  const data = await response.json();
  return data.success;
};

export const deleteBlogItem = async (blog: IBlogItems, token: string) => {
  const response = await fetch(`${url}/Blog/DeleteBlog`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(blog),
  });
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData.message;
    console.log(message);
    return false;
  }
  const data = await response.json();
  return data.success;
};

export const getToken = () => {
  return localStorage.getItem("Token") ?? "";
};

export const likeBlog = async (
  userId: number,
  blogId: number,
  token: string,
): Promise<boolean> => {
  try {
    const response = await fetch(url + `/Blog/Likes/${userId}/${blogId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.Message || "Follow action failed.");
    }

    return true;
  } catch (error) {
    console.error("likeBlog error:", error);
    return false;
  }
};

export const ratingBlog = async (
  userId: number,
  blogId: number,
  rating: number,
  token: string,
): Promise<boolean> => {
  try {
    const response = await fetch(
      url + `/Blog/Rating/${blogId}/${userId}/${rating}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.Message || "Follow action failed.");
    }

    return true;
  } catch (error) {
    console.error("ratingBlog error:", error);
    return false;
  }
};

export const uploadUserImage = async (file: File, token: string) => {
  const formData = new FormData();
  formData.append("imageFile", file);

  try {
    const res = await fetch(`${url}/Blog/UploadImage`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Upload failed:", res.status, errorText);
      return null;
    }

    const data = await res.json();
    return data?.imageUrl || null; // matches your backend return
  } catch (err) {
    console.error("Image upload error:", err);
    return null;
  }
};

//----------COMMENT ENDPOINTS----------//
export const getAllComments = async (token: string) => {
  const response = await fetch(`${url}/Comments/GetAllComments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData.message;
    console.log(message);
    return [];
  }

  const data = await response.json();
  return data;
};

export const getCommentItemsByUserId = async (
  userId: number,
  token: string,
) => {
  const response = await fetch(
    `${url}/Comments/GetCommentsByUserId/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    },
  );
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData.message;
    console.log(message);
    return [];
  }

  const data = await response.json();
  return data;
};
export const getCommentbyId = async (CommentId: number, token: string) => {
  const response = await fetch(`${url}/Comments/GetCommentById/${CommentId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData.message;
    console.log(message);
    return [];
  }

  const data = await response.json();
  return data;
};

export const addCommentItem = async (comment: ICommentItems, token: string) => {
  const response = await fetch(`${url}/Comments/AddComment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(comment),
  });
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData.message;
    console.log(message);
    return false;
  }
  const data = await response.json();
  return data.success;
};

export const updateCommentItem = async (
  Comment: ICommentItems,
  token: string,
) => {
  const response = await fetch(`${url}/Comments/EditComment`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(Comment),
  });
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData.message;
    console.log(message);
    return false;
  }
  const data = await response.json();
  return data.success;
};

export const deleteCommentItem = async (
  Comment: ICommentItems,
  token: string,
) => {
  const response = await fetch(`${url}/Comments/DeleteComment`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(Comment),
  });
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData.message;
    console.log(message);
    return false;
  }
  const data = await response.json();
  return data.success;
};

export const getCommentItemsByBlogId = async (id: number, token: string) => {
  const response = await fetch(`${url}/Comments/GetCommentsByBlogId/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData.message;
    console.log(message);
    return [];
  }

  const data = await response.json();
  return data;
};

//----------INGREDIENT ENDPOINTS----------//

export const AddIngredientItem = async (
  blog: IIngredientItems,
  token: string,
) => {
  const response = await fetch(`${url}/Ingredients/AddIngredients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(blog),
  });
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData.message;
    console.log(message);
    return false;
  }
  const data = await response.json();
  return data.success;
};

export const updateIngredientItem = async (
  ingredient: IIngredientItems,
  token: string,
) => {
  const response = await fetch(`${url}/Ingredients/EditIngredients`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(ingredient),
  });
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData.message;
    console.log(message);
    return false;
  }
  const data = await response.json();
  return data.success;
};

export const getIngredientsByBlogId = async (blogId: number, token: string) => {
  const response = await fetch(
    `${url}/Ingredients/GetIngredientsByBlogId/${blogId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    },
  );
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData.message;
    console.log(message);
    return [];
  }

  const data = await response.json();
  return data;
};

//----------STEP ENDPOINTS----------//

export const AddStepItem = async (blog: IStepItems, token: string) => {
  const response = await fetch(`${url}/Steps/AddSteps`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(blog),
  });
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData.message;
    console.log(message);
    return false;
  }
  const data = await response.json();
  return data.success;
};

export const getStepsByBlogId = async (blogId: number, token: string) => {
  const response = await fetch(`${url}/Steps/GetStepsByBlogId/${blogId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData.message;
    console.log(message);
    return [];
  }

  const data = await response.json();
  return data;
};

//----------REPLY ENDPOINTS----------//
export const getAllReplies = async (token: string) => {
  const response = await fetch(`${url}/Replys/GetAllReplies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData.message;
    console.log(message);
    return [];
  }

  const data = await response.json();
  return data;
};

export const getReplyItemsByUserId = async (userId: number, token: string) => {
  const response = await fetch(`${url}/Replys/GetReplyByUserId/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData.message;
    console.log(message);
    return [];
  }

  const data = await response.json();
  return data;
};
export const getReplybyId = async (replyId: number, token: string) => {
  const response = await fetch(`${url}/Replys/GetReplyById/${replyId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData.message;
    console.log(message);
    return [];
  }

  const data = await response.json();
  return data;
};

export const addReplyItem = async (reply: IReplyItems, token: string) => {
  const response = await fetch(`${url}/Replys/AddReply`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(reply),
  });
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData.message;
    console.log(message);
    return false;
  }
  const data = await response.json();
  return data.success;
};

export const updateReplyItem = async (reply: IReplyItems, token: string) => {
  const response = await fetch(`${url}/Replys/EditReply`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(reply),
  });
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData.message;
    console.log(message);
    return false;
  }
  const data = await response.json();
  return data.success;
};

export const deleteReplyItem = async (reply: IReplyItems, token: string) => {
  const response = await fetch(`${url}/Replys/DeleteReply`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(reply),
  });
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData.message;
    console.log(message);
    return false;
  }
  const data = await response.json();
  return data.success;
};

export const getReplyItemsByCommentId = async (id: number, token: string) => {
  const response = await fetch(`${url}/Replys/GetReplyByCommentId/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData.message;
    console.log(message);
    return [];
  }

  const data = await response.json();
  return data;
};
//----------MESSAGES ENDPOINTS----------//
export const getAllConversations = async () => {
  const res = await axios.get(`${url}/GetAllConversations`);
  return res.data;
};

export const getConversationById = async (id: number) => {
  const res = await axios.get(`${url}/GetConversationById/${id}`);
  return res.data;
};

export const getConversationsByUserOneId = async (userId: number) => {
  const res = await axios.get(`${url}/GetConversationsByUserOneId/${userId}`);
  return res.data;
};

export const getConversationsByUserTwoId = async (userId: number) => {
  const res = await axios.get(`${url}/GetConversationsByUserTwoId/${userId}`);
  return res.data;
};

export const addConversation = async (conversation: IConversation) => {
  const res = await axios.post(`${url}/AddConversation`, conversation);
  return res.data;
};

export const editConversation = async (conversation: IConversation) => {
  const res = await axios.put(`${url}/EditConversations`, conversation);
  return res.data;
};

export const addMessage = async (message: IMessage) => {
  const res = await axios.post(`${url}/AddMessage`, message);
  return res.data;
};

export const getMessagesByUserAndConversation = async (
  userId: number,
  conversationId: number,
) => {
  const res = await axios.get(
    `${url}/GetMessagesByUserIdAndConversationId/${userId}/${conversationId}`,
  );
  return res.data;
};

export const getMessageById = async (id: number) => {
  const res = await axios.get(`${url}/GetMessageById/${id}`);
  return res.data;
};

export const editMessage = async (message: IMessage) => {
  const res = await axios.put(`${url}/EditMessage`, message);
  return res.data;
};
