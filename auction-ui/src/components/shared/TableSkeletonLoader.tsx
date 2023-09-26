'use client'

export function TableSkeletonLoader({ title }: { title?: string }) {
  return (
    <div>
      {title && <h1 className="mb-4 text-center text-primary">{title}</h1>}
      <div
        role="status"
        className="w-12/12 m-auto mb-24 animate-pulse space-y-4 divide-y divide-gray-200 rounded border border-gray-200 p-4 opacity-25 shadow dark:divide-gray-700 dark:border-gray-700 sm:w-5/12 md:p-6"
      >
        <div className="flex items-center justify-between">
          <div className="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
          <div className="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
          <div className="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
          <div className="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
          <div className="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        </div>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between pt-4">
            <div>
              <div className="mb-2.5 h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-600"></div>
              <div className="h-2 w-6 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            </div>
            <div>
              <div className="mb-2.5 h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-600"></div>
              <div className="h-2 w-6 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            </div>
            <div>
              <div className="mb-2.5 h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-600"></div>
              <div className="h-2 w-6 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            </div>
            <div>
              <div className="mb-2.5 h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-600"></div>
              <div className="h-2 w-6 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            </div>
            <div>
              <div className="mb-2.5 h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-600"></div>
              <div className="h-2 w-6 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            </div>
          </div>
        ))}

        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}
