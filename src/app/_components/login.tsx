"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { api } from "@/trpc/react";

export function Login() {
  const initialState = {
    password : "",
    email : ""
  }
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const utils = api.useUtils();
  const login = api.user.login.useMutation({
    onSuccess: async (res) => {
      setFormData(initialState);
      localStorage.setItem('verificationProp', formData.email);
      router.push('/');
    },
    onError: async (error) => {
      console.log(error);
      setError(error.message);
      
      setTimeout(() =>{
        if(error.message === 'User not registered'){
          router.push('/');
        } else if(error.message === 'User not verified'){
          console.log('formData.email', formData.email);
          localStorage.setItem('verificationProp', formData.email);
          router.push('/verify');
        }
      })
    },
    
  });

  return (
    <div className="w-full max-w-xs">
      {error && <p>{error}</p>}
      <form onSubmit={(e) => {
          e.preventDefault();
          login.mutate({ ...formData });
        }}
        className="flex flex-col gap-2">
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
          disabled={login.isPending}
        >
          {login.isPending ? "Logging in..." : "LOGIN"}
        </button>
        <div className="w-100 text-center mt-2">
        Don't have an account? <Link href="/">Signup</Link>
      </div>
            
          </form>
      
    </div>
  );
}
