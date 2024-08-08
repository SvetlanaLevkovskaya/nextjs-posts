import { NavLayout } from '@/components/Layouts/NavLayout'

import { PostsContent } from '@/app/(home)/_components'
import { getAuth } from '@/app/config/providers/auth/getAuth'

export default function PostsPage({ searchParams }: { searchParams: { page: string } }) {
  const page = parseInt(searchParams.page) || 1
  const { isAuth } = getAuth()

  return <NavLayout isAuth={isAuth}>{isAuth && <PostsContent page={page} />}</NavLayout>
}
