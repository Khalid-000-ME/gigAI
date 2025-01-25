"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { parseISO, fromUnixTime } from 'date-fns'

import { useToast } from "@/hooks/use-toast";
import { useRouter, useParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  user_id: z.coerce.number().min(0, {
    message: "Enter a valid User ID"
  }),
  gig_id: z.coerce.number().min(0, {
    message: "Enter a valid GIG ID"
  }),
  title: z.string().min(2, {
    message: "Enter a valid title",
  }),
  description: z.string().trim().min(25, {
    message: "Description too short"
  }),
  submission_url: z.string().trim().min(8, {
    message: "Invalied URL"
  }),
  submission_date: z.string().min(10, 
    {
      message: "Invalid submission time"
    }),
  submission_time: z.string().min(8,
    {
      message: "Invalid submission time"
    }
  ).min(2, {
    message: "Submission time must be in 24-hour format",
  }),
})

export function SubForm() {
    const router = useRouter()
    const { gig_id } = useParams();
    const { toast } = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_id: 0,
      gig_id: 0,
      title: "",
      description: "",
      submission_url: "",
      submission_date: "",
      submission_time: "",
    },
  })


  console.log((new Date()).toString())

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const profileData = {
        user_id: localStorage.getItem('userId'),
        gig_id: (gig_id || 0),
        title: values.title,
        description: values.description,
        submission_url: values.submission_url,
        submission_date: "25-MAR-2025",
        submission_time: "00:07:59",
      }
      console.log(profileData)
      // Post the data to FastAPI backend
      try {
        const response = await fetch("http://127.0.0.1:8000/submissions/", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(profileData),
        })
  
        if (response.ok) {
          const result = await response.json()
          toast({
            title: "Profile created successfully",
            description: "Happy coding!",
          })
          console.log('Profile created:', result)
        } else {
            toast({
                title: "Error",
                description: "Failed to submit data",
              })
          console.error('Failed to submit data')
        }
      } catch (error) {
        toast({
            title: "Error",
            description: "Internal erro occured",
          })
        console.error('Error occurred:', error)
      }
  }

  return (
    <div className="m-10 space-y-5 min-w-[50vw]">
    <p className="text-3xl font-bold">Submit a Gig</p>
    <Form {...form}>
      <form
      onSubmit={(e) => {
          e.preventDefault(); // Prevent default browser behavior
          form.handleSubmit(onSubmit)(e); // Pass to react-hook-form
      }}
      className="space-y-8 my-10"
      >
         <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title of the submission" {...field} />
              </FormControl>
              <FormDescription>
                Name of the submission.
              </FormDescription>
              <FormMessage />
            </FormItem>
            
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description of the submission" {...field}/>
              </FormControl>
              <FormDescription>
                Describe the submission
              </FormDescription>
              <FormMessage />
            </FormItem>
            
          )}
        />
        <FormField
          control={form.control}
          name="submission_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Submission URL</FormLabel>
              <FormControl>
                <Input placeholder="URL of the submission" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
            
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </div>
  )
}