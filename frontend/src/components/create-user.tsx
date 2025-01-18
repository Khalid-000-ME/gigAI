"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().trim().email({
    message: "Invalid email address"
  }),
  resume_uri: z.string().trim().url({
    message: "Invalid URL",
  }),
  company: z.string().min(1, {
    message: "Company name cannot be empty",
  }),
  role: z.string().min(1, {
    message: "Input your role",
  }),
  skills: z.array(z.string()).min(1, {
    message: "Input your skills"
  })
})

export function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      resume_uri: "",
      company: "",
      role: "",
      skills: []
    },
  })

  const handleAddSkill = (e: React.FormEvent<HTMLInputElement>, setValue: any, getValues: any) => {
    e.preventDefault()
    const skill = e.currentTarget.value.trim()
    if (skill && !getValues("skills").includes(skill)) {
      const skills = [...getValues("skills"), skill]
      setValue("skills", skills)
      e.currentTarget.value = ""
    }
  }

  const handleRemoveSkill = (skill: string, setValue: any, getValues: any) => {
    const updatedSkills = getValues("skills").filter((item: string) => item !== skill)
    setValue("skills", updatedSkills)
  }


  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const profileData = {
        name: values.name,
        email: values.email,
        resume_uri: values.resume_uri,
        company: values.company,
        role: values.role,
        skills: values.skills,
      }
  
      // Post the data to FastAPI backend
      try {
        const response = await fetch('http://127.0.0.1:8000/profile/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(profileData),
        })
  
        if (response.ok) {
          const result = await response.json()
          console.log('Profile created:', result)
        } else {
          console.error('Failed to submit data')
        }
      } catch (error) {
        console.error('Error occurred:', error)
      }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your Name" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
            
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormDescription>
                Your Work email
              </FormDescription>
              <FormMessage />
            </FormItem>
            
          )}
        />
        <FormField
          control={form.control}
          name="resume_uri"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resume URL</FormLabel>
              <FormControl>
                <Input placeholder="URL for your Resume" {...field} />
              </FormControl>
              <FormDescription>
                Give the URL for your Resume.
              </FormDescription>
              <FormMessage />
            </FormItem>
            
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Company" {...field} />
              </FormControl>
              <FormDescription>
                Give your company name.
              </FormDescription>
              <FormMessage />
            </FormItem>
            
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Input placeholder="Role in your organization" {...field} />
              </FormControl>
              <FormDescription>
                Role??
              </FormDescription>
              <FormMessage />
            </FormItem>
            
          )}
        />

        <FormField
        control={form.control}
        name="skills"
        render={({ field }) => (
            <FormItem>
            <FormLabel>Skills</FormLabel>
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
                    placeholder="Add a skill"
                    onKeyDown={(e) => e.key === "Enter" && handleAddSkill(e, form.setValue, form.getValues)}
                />
                </div>
            </FormControl>
            <FormDescription>Press Enter to add a skill.</FormDescription>
            <FormMessage />
            </FormItem>
        )}
        />


        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}