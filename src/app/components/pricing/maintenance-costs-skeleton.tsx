import { Skeleton } from '@/app/components/ui/skeleton'

export function MaintenanceCostsSkeleton() {
  return (
    <div className='w-full max-w-4xl mx-auto'>
      <div className='bg-zinc-900/60 border border-zinc-800 rounded-2xl p-8 md:p-12'>
        <div className='text-center mb-8'>
          <Skeleton className="h-8 w-48 mx-auto mb-4 bg-zinc-700/50" />
          <Skeleton className="h-10 w-3/4 mx-auto mb-4 bg-zinc-700/50" />
          <Skeleton className="h-6 w-full max-w-2xl mx-auto bg-zinc-700/50" />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className='flex flex-col items-center p-6 bg-zinc-800/40 rounded-xl border border-zinc-700/50'>
              <Skeleton className="h-7 w-24 mb-3 bg-zinc-700/50" />
              <Skeleton className="h-5 w-40 bg-zinc-700/50" />
            </div>
          ))}
        </div>
        <div className='text-center'>
          <Skeleton className="h-12 w-36 mx-auto bg-zinc-700/50" />
        </div>
      </div>
    </div>
  )
} 
