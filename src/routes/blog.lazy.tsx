import BlogListItem from '../components/BlogPosts/BlogListItem'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/blog')({
  component: Blog,
})

function Blog() {
  return (
    <div className="pt-12 md:pt-16 flex flex-col font-geist">
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100">
          read my blog
        </h1>
        <p className="text-xs mt-2 pb-5 font-medium text-neutral-400 dark:text-neutral-500">
          Ocassionally updated with stuff that is on my mind or I think might be
          useful.
        </p>
      </div>
      <div className="list-none pt-5 font-sans flex flex-col gap-2">
        <p className="font-medium text-sm">Currently in the works...</p>
        {/* {Array.from({ length: 5 }).map((_, i) => (
                    <BlogListItem key={i} slug={i} />
                ))} */}
      </div>
    </div>
  )
}
