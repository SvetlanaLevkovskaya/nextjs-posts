import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required().min(5, 'Password must be at least 5 characters'),
})

export const createPostValidationSchema = yup.object().shape({
  title: yup.string().required('Title is required').min(5, 'Title must be at least 5 characters'),
  body: yup.string().required('Body is required').min(10, 'Body must be at least 10 characters'),
})
