'use client'

import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'

import { Button, Input, Spinner, TextArea } from '@/components/ui'

import { useCreatePost } from '@/hooks/mutations/useCreatePost'
import { createPostValidationSchema } from '@/utils/validationSchema'

import styles from './CreatePostForm.module.scss'


interface CreatePostFormData {
  title: string
  body: string
}

export const CreatePostForm: FC = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreatePostFormData>({
    resolver: yupResolver(createPostValidationSchema),
  })

  const { mutate: createPost } = useCreatePost((newPost) => {
    reset()
    router.push(`/posts/${newPost.id}`)
  })

  const onSubmit: SubmitHandler<CreatePostFormData> = (data) => {
    createPost({ ...data, userId: 1 })
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <h4 className="mb-4">Create New Post</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            register={register('title')}
            placeholder="Title"
            error={errors.title?.message}
            disabled={isSubmitting}
          />
          <TextArea register={register('body')} placeholder="Body" error={errors.body?.message} />
          <Button color="neon" className={styles.btn} disabled={isSubmitting}>
            {isSubmitting ? <Spinner /> : 'Create Post'}
          </Button>
        </form>
      </div>
    </div>
  )
}
