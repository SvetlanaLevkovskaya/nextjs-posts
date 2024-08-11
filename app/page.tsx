import { NavLayout } from '@/components/Layouts/NavLayout'

import { getAuth } from '@/config/auth/getAuth'

import { PostsContent } from '@/app/(home)/_components'


export default function PostsPage({ searchParams }: { searchParams: { page: string } }) {
  const page = parseInt(searchParams.page) || 1
  const { isAuth } = getAuth()

  return <NavLayout isAuth={isAuth}>{isAuth && <PostsContent page={page} />}</NavLayout>
}
