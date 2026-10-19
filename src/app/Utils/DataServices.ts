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

export const getAllBlogs = async (): Promise<IBlogItems[]> => {
  // 1. Fetch recipes visible under the blogs table's RLS policies.
  const { data: recipes, error: recipesError } = await supabase
    .from("blogs")
    .select("*")
    .order("date", { ascending: false });

  if (recipesError) {
    throw recipesError;
  }

  if (!recipes || recipes.length === 0) {
    return [];
  }

  const blogIds = recipes.map((recipe) => recipe.id);

  // 2. Fetch ingredient groups and instruction groups.
  const [
    { data: ingredientRows, error: ingredientsError },
    { data: stepRows, error: stepsError },
  ] = await Promise.all([
    supabase
      .from("ingredients")
      .select("id, blog_id, title, ingredients")
      .in("blog_id", blogIds)
      .order("id", { ascending: true }),

    supabase
      .from("steps")
      .select("id, blog_id, title, steps")
      .in("blog_id", blogIds)
      .order("id", { ascending: true }),
  ]);

  if (ingredientsError) throw ingredientsError;
  if (stepsError) throw stepsError;

  // 3. Convert Supabase rows into the existing IBlogItems format.
  return recipes.map((recipe) => ({
    id: Number(recipe.id),

    // Supabase user IDs are UUIDs, not the old numeric IDs.
    userId: recipe.user_id,

    publisherName: recipe.publisher_name ?? "PlatO User",
    date: recipe.date ?? recipe.created_at ?? "",
    image: recipe.image ?? null,
    recipeName: recipe.recipe_name ?? "",
    description: recipe.description ?? "",

    ingredients: (ingredientRows ?? [])
      .filter((row) => row.blog_id === recipe.id)
      .map((row) => ({
        title: row.title ?? "",
        ingredients: row.ingredients ?? [],
      })),

    steps: (stepRows ?? [])
      .filter((row) => row.blog_id === recipe.id)
      .map((row) => ({
        title: row.title ?? "",
        steps: row.steps ?? [],
      })),

    tags: recipe.tags ?? [],

    // Ratings and likes haven't been migrated in the schema described so far.
    rating: 0,
    numberOfRatings: 0,
    averageRating: 0,
    numberOfLikes: 0,

    postType: recipe.post_type ?? "recipe",
    totalTime: recipe.total_time ?? "",
    servings: recipe.servings ?? "",
    source: recipe.source ?? "",
    isPublished: recipe.is_published ?? false,
    isDeleted: recipe.is_deleted ?? false,
  }));
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
export const getBlogbyId = async (blogId: number) => {
  try {
    const { data: blog, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("id", blogId)
      .maybeSingle();

    if (error) throw error;
    if (!blog) {
      console.error("Recipe not found.");
      return null;
    }

    const { data: ingredients, error: ingredientsError } = await supabase
      .from("ingredients")
      .select("title, ingredients")
      .eq("blog_id", blogId);

    if (ingredientsError) throw ingredientsError;

    const { data: steps, error: stepsError } = await supabase
      .from("steps")
      .select("title, steps")
      .eq("blog_id", blogId);

    if (stepsError) throw stepsError;

    return {
      id: blog.id,
      userId: blog.user_id,
      publisherName: blog.publisher_name,
      date: blog.date ?? blog.created_at ?? "",
      image: blog.image,
      recipeName: blog.recipe_name,
      description: blog.description,
      ingredients: (ingredients ?? []).map((group) => ({
        title: group.title,
        ingredients: group.ingredients ?? [],
      })),
      steps: (steps ?? []).map((group) => ({
        title: group.title,
        steps: group.steps ?? [],
      })),
      tags: blog.tags ?? [],
      rating: 0,
      numberOfRatings: 0,
      averageRating: 0,
      numberOfLikes: 0,
      postType: blog.post_type,
      totalTime: blog.total_time,
      servings: blog.servings,
      source: blog.source,
      isPublished: blog.is_published,
      isDeleted: blog.is_deleted,
    };
  } catch (error) {
    console.error("Failed to fetch recipe:", error);
    return null;
  }
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

export const addBlogItem = async (
  blog: IBlogItems,
  imageFile: File | null,
): Promise<boolean> => {
  let uploadedImagePath: string | null = null;
  let newBlogId: number | null = null;

  try {
    // 1. Get the real authenticated Supabase user.
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error("Please sign in before posting a recipe.");
    }

    // 2. Get the user's profile and username.
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) {
      console.error("Profile lookup failed:", profileError.message);
      throw profileError;
    }

    if (!profile) {
      throw new Error(
        "Your user profile was not found. Please check the profiles table.",
      );
    }

    // 3. Upload the image, if one was selected.
    let imageUrl: string | null = null;

    if (imageFile) {
      const extension = imageFile.type === "image/png" ? "png" : "jpg";

      uploadedImagePath = `${user.id}/${crypto.randomUUID()}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(uploadedImagePath, imageFile, {
          contentType: imageFile.type,
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("blog-images")
        .getPublicUrl(uploadedImagePath);

      imageUrl = publicUrlData.publicUrl;
    }

    // 4. Insert the main recipe.
    const { data: recipe, error: recipeError } = await supabase
      .from("blogs")
      .insert({
        user_id: user.id,
        publisher_name: profile.username,
        image: imageUrl,
        recipe_name: blog.recipeName,
        description: blog.description,
        tags: blog.tags ?? [],
        post_type: blog.postType ?? "recipe",
        total_time: blog.totalTime,
        servings: blog.servings,
        source: blog.source,
        is_published: blog.isPublished,
        is_deleted: false,
      })
      .select("id")
      .single();

    if (recipeError) throw recipeError;

    newBlogId = recipe.id;

    // 5. Save ingredient groups.
    const ingredientRows = (blog.ingredients ?? []).map((group) => ({
      blog_id: newBlogId,
      title: group.title,
      ingredients: group.ingredients,
    }));

    if (ingredientRows.length > 0) {
      const { error } = await supabase
        .from("ingredients")
        .insert(ingredientRows);

      if (error) throw error;
    }

    // 6. Save instruction groups.
    const stepRows = (blog.steps ?? []).map((group) => ({
      blog_id: newBlogId,
      title: group.title,
      steps: group.steps,
    }));

    if (stepRows.length > 0) {
      const { error } = await supabase.from("steps").insert(stepRows);

      if (error) throw error;
    }

    return true;
  } catch (error: unknown) {
    console.error("Failed to save recipe:", error);

    if (error && typeof error === "object") {
      const supabaseError = error as {
        message?: string;
        code?: string;
        details?: string;
        hint?: string;
      };

      console.error("Recipe error details:", {
        message: supabaseError.message,
        code: supabaseError.code,
        details: supabaseError.details,
        hint: supabaseError.hint,
      });
    }
    if (newBlogId !== null) {
      const ingredientCleanup = await supabase
        .from("ingredients")
        .delete()
        .eq("blog_id", newBlogId);

      const stepCleanup = await supabase
        .from("steps")
        .delete()
        .eq("blog_id", newBlogId);

      const blogCleanup = await supabase
        .from("blogs")
        .delete()
        .eq("id", newBlogId);

      console.error("Cleanup results:", {
        ingredientCleanup: ingredientCleanup.error?.message,
        stepCleanup: stepCleanup.error?.message,
        blogCleanup: blogCleanup.error?.message,
      });
    }

    if (uploadedImagePath) {
      const { error: imageCleanupError } = await supabase.storage
        .from("blog-images")
        .remove([uploadedImagePath]);

      if (imageCleanupError) {
        console.error("Image cleanup failed:", imageCleanupError.message);
      }
    }

    return false;
  }
};

export const updateBlogItem = async (blog: IBlogItems): Promise<boolean> => {
  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw authError ?? new Error("Please sign in to edit this recipe.");
    }

    // Only allow editing a recipe owned by the signed-in user.
    const { data: existingBlog, error: lookupError } = await supabase
      .from("blogs")
      .select("id, image")
      .eq("id", blog.id)
      .eq("user_id", user.id)
      .maybeSingle();

    if (lookupError) throw lookupError;

    if (!existingBlog) {
      throw new Error(
        "Recipe not found or you don't have permission to edit it.",
      );
    }

    // Keep the existing image if the editor hasn't uploaded a new one.
    // A new data:image URL must be uploaded to Storage separately.
    const imageUrl =
      typeof blog.image === "string" && blog.image.startsWith("data:")
        ? existingBlog.image
        : blog.image || existingBlog.image;

    const { error: updateError } = await supabase
      .from("blogs")
      .update({
        publisher_name: blog.publisherName,
        image: imageUrl,
        recipe_name: blog.recipeName,
        description: blog.description,
        tags: blog.tags,
        post_type: blog.postType,
        total_time: blog.totalTime,
        servings: blog.servings,
        source: blog.source,
        is_published: blog.isPublished,
        is_deleted: blog.isDeleted,
      })
      .eq("id", blog.id)
      .eq("user_id", user.id);

    if (updateError) throw updateError;

    // Remove the previous ingredient and instruction groups.
    const { error: ingredientDeleteError } = await supabase
      .from("ingredients")
      .delete()
      .eq("blog_id", blog.id);

    if (ingredientDeleteError) throw ingredientDeleteError;

    const { error: stepsDeleteError } = await supabase
      .from("steps")
      .delete()
      .eq("blog_id", blog.id);

    if (stepsDeleteError) throw stepsDeleteError;

    // Insert the current ingredient groups.
    if (blog.ingredients.length > 0) {
      const { error } = await supabase.from("ingredients").insert(
        blog.ingredients.map((group) => ({
          blog_id: blog.id,
          title: group.title,
          ingredients: group.ingredients,
        })),
      );

      if (error) throw error;
    }

    // Insert the current instruction groups.
    if (blog.steps.length > 0) {
      const { error } = await supabase.from("steps").insert(
        blog.steps.map((group) => ({
          blog_id: blog.id,
          title: group.title,
          steps: group.steps,
        })),
      );

      if (error) throw error;
    }

    return true;
  } catch (error) {
    console.error("Failed to update recipe:", error);
    return false;
  }
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
