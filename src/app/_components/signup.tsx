"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { api } from "@/trpc/react";

export function Register() {
  const initialState = {
    username : "",
    password : "",
    email : ""
  }
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const utils = api.useUtils();
  const createUser = api.user.create.useMutation({
    onSuccess: async (res) => {
      setFormData(initialState);
      localStorage.setItem('verificationProp', formData.email);
      router.push('/verify');
    },
    onError: async (error) => {
      setError(error.message);
    },
    
  });

  return (
    <div className="w-full max-w-xs">
      <form onSubmit={(e) => {
          e.preventDefault();
          createUser.mutate({ ...formData });
        }}
        className="flex flex-col gap-2">
          <input
          type="text"
          placeholder="username"
          value={formData.username}
          onChange={(e) => setFormData((prevVal) => { 
            return { ...prevVal, username: e.target.value}
          })}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <input
          type="email"
          placeholder="email"
          value={formData.email}
          onChange={(e) => setFormData((prevVal) => { 
            return { ...prevVal, email: e.target.value}
          })}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <input
          type="password"
          placeholder="password"
          value={formData.password}
          onChange={(e) => setFormData((prevVal) => { 
            return { ...prevVal, password: e.target.value}
          })}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createUser.isPending}
        >
          {createUser.isPending ? "Creating..." : "Create Account"}
        </button>
        <div className="w-100 text-center mt-2">
        Have an account? <Link href="/login">Login</Link>
      </div>
            
          </form>
      
    </div>
  );
}
