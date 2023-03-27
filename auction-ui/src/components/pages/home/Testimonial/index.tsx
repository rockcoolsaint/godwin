import QuoteSvg from 'src/assets/svg/quote.svg'
import { useTranslation } from 'src/hooks'

const testimonials = [
  [
    [
      {
        body: 'The Rigly experience is quick and seamless, giving you the opportunity to start mining right away - I can’t wait to watch the team build out this great platform',
        author: {
          name: 'Devon Lane',
          handle: 'Customer',
          imageUrl:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
    ],
    [
      {
        body: 'The Rigly experience is quick and seamless, giving you the opportunity to start mining right away - I can’t wait to watch the team build out this great platform',
        author: {
          name: 'Eleanor Pena',
          handle: 'Customer',
          imageUrl:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
    ],
    [
      {
        body: 'The Rigly experience is quick and seamless, giving you the opportunity to start mining right away - I can’t wait to watch the team build out this great platform',
        author: {
          name: 'Ralph Edwards',
          handle: 'Customer',
          imageUrl:
            'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
      // More testimonials...
    ],
  ],
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const { t } = useTranslation()

  return (
    <div className="relative isolate bg-white pt-24 pb-32 sm:pt-32">
      <div className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl">
        <svg viewBox="0 0 1313 771" aria-hidden="true" className="ml-[max(50%,38rem)] w-[82.0625rem]">
          <path
            id="bc169a03-3518-42d4-ab1e-d3eadac65edc"
            fill="url(#85a0eca5-25f1-4ab9-af84-4e2d8d9cdbf3)"
            d="M360.508 589.796 231.671 770.522 0 498.159l360.508 91.637 232.034-325.485c1.485 150.396 51.235 393.965 238.354 165.069C1064.79 143.261 1002.42-107.094 1171.72 46.97c135.44 123.252 148.51 335.641 138.11 426.428L971.677 339.803l24.062 411.461-635.231-161.468Z"
          />
          <defs>
            <linearGradient
              id="85a0eca5-25f1-4ab9-af84-4e2d8d9cdbf3"
              x1="1313.17"
              x2="-88.881"
              y1=".201"
              y2="539.417"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#41ADFD" />
              <stop offset={1} stopColor="#41ADFD" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-25 blur-3xl sm:pt-40 xl:justify-end">
        <svg
          viewBox="0 0 1313 771"
          aria-hidden="true"
          className="ml-[-22rem] w-[82.0625rem] flex-none origin-top-right rotate-[30deg] xl:ml-0 xl:mr-[calc(50%-12rem)]"
        >
          <use href="#bc169a03-3518-42d4-ab1e-d3eadac65edc" />
        </svg>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="gradient-text text-5xl font-semibold leading-relaxed tracking-tight sm:text-7xl">{t('home.testimonials')}</h2>
        </div>
        <div className="mx-auto mt-16 grid max-w-sm grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-gray-900 sm:mt-20  xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-3">
          {testimonials.map((columnGroup, columnGroupIdx) => (
            <div key={columnGroupIdx} className="space-y-8 xl:contents xl:space-y-0">
              {columnGroup.map((column, columnIdx) => (
                <div
                  key={columnIdx}
                  className={classNames(
                    (columnGroupIdx === 0 && columnIdx === 0) ||
                      (columnGroupIdx === testimonials.length - 1 && columnIdx === columnGroup.length - 1)
                      ? 'xl:row-span-2'
                      : 'xl:row-start-1',
                    'space-y-8',
                  )}
                >
                  {column.map(testimonial => (
                    <figure key={testimonial.author.handle} className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5">
                      <blockquote className="text-gray-900">
                        <p>{testimonial.body}</p>
                      </blockquote>
                      <div className="mt-4 flex items-center justify-between border-t">
                        <figcaption className="mt-6 flex items-center gap-x-4 ">
                          <img className="h-10 w-10 rounded-full bg-gray-50" src={testimonial.author.imageUrl} alt="" />
                          <div>
                            <div className="font-semibold">{testimonial.author.name}</div>
                            <div className="text-gray-600">{testimonial.author.handle}</div>
                          </div>
                        </figcaption>
                        <QuoteSvg className="relative top-2 block" />
                      </div>
                    </figure>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
