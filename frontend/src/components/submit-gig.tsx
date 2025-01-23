"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { parseISO, format } from 'date-fns'

import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation"

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
  submission_date: z.string().date({
    message: "Invalid submission date"
  }),
  submission_time: z.string().time().min(2, {
    message: "Submission time must be in 24-hour format",
  })
})

export function SubForm() {
    const router = useRouter()
    const { toast } = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      prize_pool: 0,
      accepted_num: 0,
      tags: []
    },
  })



  const handleAddSkill = (e: React.FormEvent<HTMLInputElement>, setValue: any, getValues: any) => {
    e.preventDefault()
    const skill = e.currentTarget.value.trim()
    if (skill && !getValues("tags").includes(skill)) {
      const skills = [...getValues("tags"), skill]
      setValue("tags", skills)
      e.currentTarget.value = ""
    }
  }

  const handleRemoveSkill = (skill: string, setValue: any, getValues: any) => {
    const updatedSkills = getValues("tags").filter((item: string) => item !== skill)
    setValue("tags", updatedSkills)
  }


  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const profileData = {
        title: values.title,
        description: values.description,
        prize_pool: ""+values.prize_pool,
        accepted_num: ""+values.accepted_num,
        tags: {
            skills: values.tags
        },
      }
      console.log(profileData)
      // Post the data to FastAPI backend
      try {
        const response = await fetch('http://127.0.0.1:8000/gigs/', {
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
    <p className="text-3xl font-bold">Create a Gig</p>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 my-10">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gig Title</FormLabel>
              <FormControl>
                <Input placeholder="Title of the Gig" {...field} />
              </FormControl>
              <FormDescription>
                Public display name of the gig.
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
                <Textarea placeholder="Description of the Gig" {...field}/>
              </FormControl>
              <FormDescription>
                Describe the Gig
              </FormDescription>
              <FormMessage />
            </FormItem>
            
          )}
        />
        <FormField
          control={form.control}
          name="prize_pool"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prize Pool in $</FormLabel>
              <FormControl>
                <Input type="number" min="0" placeholder="Min Prize Pool" {...field} />
              </FormControl>
              <FormDescription>
                Keep it high!
              </FormDescription>
              <FormMessage />
            </FormItem>
            
          )}
        />
        <FormField
          control={form.control}
          name="accepted_num"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Accepted submissions</FormLabel>
              <FormControl>
                <Input type="number" min="0" placeholder="Minimum submissions accepted" {...field} />
              </FormControl>
              <FormDescription>
                The min no. of submissions accepted
              </FormDescription>
              <FormMessage />
            </FormItem>
            
          )}
        />
        <FormField
        control={form.control}
        name="tags"
        render={({ field }) => (
            <FormItem>
            <FormLabel>Tags</FormLabel>
            <FormControl>
                <div className="flex flex-col gap-2">
                {/* Display skills as chips */}
                <div className="flex gap-2 flex-wrap">
                    {field.value?.map((skill: string, index: number) => (
                    <div key={index} className="flex items-center bg-black text-white dark:bg-white dark:text-black px-3 py-1 rounded-lg">
                        {skill}
                        <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill, form.setValue, form.getValues)}
                        className="ml-2 text-white  dark:text-black text-sm"
                        >
                        x
                        </button>
                    </div>
                    ))}
                </div>

                {/* Input to add skills */}
                <Input
                    placeholder="Add skills involved"
                    onKeyDown={(e) => e.key === "Enter" && handleAddSkill(e, form.setValue, form.getValues)}
                />
                </div>
            </FormControl>
            <FormDescription>This can be AI, Python, Web3, etc.</FormDescription>
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