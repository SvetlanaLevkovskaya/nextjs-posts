'use client'

import { useState } from 'react'

import { Button, Loader, TextInput, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useRouter } from 'next/navigation'

import { useCreatePost } from '@/hooks/mutations/useCreatePost'

import styles from './CreatePostForm.module.scss'


interface CreatePostFormData {
  title: string
  body: string
}

export const CreatePostForm = () => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<CreatePostFormData>({
    initialValues: {
      title: '',
      body: '',
    },
    validate: {
      title: (value) => (value.length < 5 ? 'Title must be at least 5 characters' : null),
      body: (value) => (value.length < 10 ? 'Body must be at least 10 characters' : null),
    },
  })

  const { mutate: createPost } = useCreatePost()

  const onSubmit = async (values: CreatePostFormData) => {
    setIsSubmitting(true)
    createPost(
      { ...values, userId: 1 },
      {
        onSuccess: (newPost) => {
          form.reset()
          router.push(`/posts/${newPost.id}`)
        },
        onSettled: () => {
          setIsSubmitting(false)
        },
      }
    )
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <h4 className="mb-4">Create New Post</h4>
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            size="lg"
            placeholder="Title"
            disabled={isSubmitting}
            {...form.getInputProps('title')}
            error={form.errors.title}
            className="transition-all2"
          />
          <Textarea
            size="xl"
            placeholder="Body"
            disabled={isSubmitting}
            {...form.getInputProps('body')}
            error={form.errors.body}
            className="transition-all2"
          />
          <Button
            radius={100}
            fw={400}
            fz={14}
            size="lg"
            type="submit"
            fullWidth
            color="neon"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loader size="sm" /> : 'Create Post'}
          </Button>
        </form>
      </div>
    </div>
  )
}
