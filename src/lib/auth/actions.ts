"use server"

import { redirect } from "next/navigation";
import { APIError } from "better-auth/api";
import { auth } from "./auth";
import { db } from '../prisma';

interface State {
  errorMessage?: string | null
}

export async function signUp(prevState: State,formData:FormData) {
  const rawFormData = {
    email: formData.get("email") as string,
    password: formData.get("pwd") as string,
    firstName: formData.get("firstname") as string,
    lastName: formData.get("lastname") as string,
  }

  const {email,password,firstName,lastName} = rawFormData;

  try {
    await auth.api.signUpEmail({
      body: {
        name: `${firstName} ${lastName}`,
        email,
        password,
      }
    })
  } catch (error) {
    if(error instanceof APIError) {
      switch(error.status) {
        case "UNPROCESSABLE_ENTITY":
          return {errorMessage: "User already exists."};
        case "BAD_REQUEST":
          return {errorMessage: "Invalid email."}
        default: 
          return {errorMessage: "Something went wrong."}
      }
    }
    console.log("sign up with email and password has not worked.", error)
  }

  redirect("/dashboard")
}

export async function signIn(prevState: State,formData:FormData) {
  const rawFormData = {
    email: formData.get("email") as string,
    password: formData.get("pwd") as string,
  }

  const {email,password} = rawFormData;

  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      }
    })
  } catch (error) {
    if(error instanceof APIError) {
      switch(error.status) {
        case "UNAUTHORIZED":
          return {errorMessage: "User not found."};
        case "BAD_REQUEST":
          return {errorMessage: "Invalid email."}
        default: 
          return {errorMessage: "Something went wrong."}
      }
    }
    console.log("sign in with email has not worked.", error)
  }
  redirect("/dashboard")
}

export async function searchAccount(email: string) {
  const user = await db.user.findUnique({
    where: {email}
  })

  return !!user
}