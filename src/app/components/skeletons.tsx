import { Skeleton } from '@/app/components/ui/skeleton'

export function FaqSkeleton() {
  return (
    <div className='container flex flex-col items-center gap-6 py-14 sm:gap-7 md:py-28'>
      <Skeleton className="h-6 w-24 bg-zinc-200 dark:bg-zinc-800" />
      <Skeleton className="h-10 w-3/4 max-w-md bg-zinc-200 dark:bg-zinc-800" />
      <Skeleton className="h-6 w-full max-w-lg bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-6 w-full max-w-3xl space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full bg-zinc-200 dark:bg-zinc-800" />
        ))}
      </div>
    </div>
  )
}

export function ContactFormSkeleton() {
  return (
    <div className="container max-w-4xl py-14 md:py-28" id="contact">
      <div className="rounded-lg border bg-card text-card-foreground shadow-xs">
        <div className='flex flex-col space-y-1.5 p-6'>
          <Skeleton className="h-8 w-48 bg-zinc-200 dark:bg-zinc-800" />
          <Skeleton className="h-5 w-64 bg-zinc-200 dark:bg-zinc-800" />
        </div>
        <div className='p-6 pt-0'>
          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-5 w-32 bg-zinc-200 dark:bg-zinc-800" />
              <Skeleton className="h-10 w-full bg-zinc-200 dark:bg-zinc-800" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-32 bg-zinc-200 dark:bg-zinc-800" />
              <Skeleton className="h-10 w-full bg-zinc-200 dark:bg-zinc-800" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-32 bg-zinc-200 dark:bg-zinc-800" />
              <Skeleton className="h-10 w-full bg-zinc-200 dark:bg-zinc-800" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-32 bg-zinc-200 dark:bg-zinc-800" />
              <Skeleton className="h-24 w-full bg-zinc-200 dark:bg-zinc-800" />
            </div>
            <div className='flex items-center space-x-2'>
              <Skeleton className="h-4 w-4 bg-zinc-200 dark:bg-zinc-800" />
              <Skeleton className="h-4 w-full max-w-sm bg-zinc-200 dark:bg-zinc-800" />
            </div>
          </div>
        </div>
        <div className='flex items-center p-6 pt-0'>
          <Skeleton className="h-10 w-32 bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </div>
    </div>
  )
} 
