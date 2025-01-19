"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

import { useRouter } from 'next/navigation'

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  email: z.string().trim().email({
    message: "Invalid email address"
  }),
  password: z.string().trim().min(6, {
    message: "Password must be atleast 6 characters long"
  })
})

export function LoginForm() {
    const { toast } = useToast()
    const router = useRouter();
    const [remember, setRemember] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  // 2. Define a submit handler.
  const handleLogin = async (values: z.infer<typeof formSchema>) => {
    
    const email = values.email
    const password = values.password
    
    try {
      const response = await fetch(`http://127.0.0.1:8000/users/?email=${email}`);
      if (!response.ok) {
        console.error('Login failed');
        return;
      }
  
      const user = await response.json();
      console.log('User logged in:', user);
  
      if (remember) {
        // Store user ID in local storage or cookies
        localStorage.setItem('userId', user.id.toString());
        router.push('/profile');
      } else {
        // Use session storage for non-remember-me sessions
        sessionStorage.setItem('userId', user.id.toString());
        router.push('/profile')
      }
    } catch (error) {
      console.error('Error during login:', error);
    }

  };

  return (
    <div className="space-y-5 m-10">
      <p className="text-3xl font-bold">Log in</p>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormDescription>
                Registered email
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormDescription>
                Keep it strong
              </FormDescription>
              <FormMessage />
            </FormItem>
            
          )}
        />
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" onClick={() => {setRemember(!remember)}}/>
          <p>Remember Me</p>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </div>
  )
}