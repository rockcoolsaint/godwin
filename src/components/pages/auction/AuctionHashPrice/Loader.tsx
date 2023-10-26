export default function HashPriceLoader() {
  return (
    <>
      <div className="mx-auto w-11/12 px-6 py-3">
        <div className="flex animate-pulse space-x-4">
          <div className="grid w-full grid-cols-1 items-center justify-around gap-6 overflow-hidden rounded-lg bg-white p-8 md:grid-cols-3 ">
            <div className="space-y-3">
              <div className="grid grid-cols-2 grid-rows-2 gap-1">
                <div className="col-span-1 h-2 rounded bg-slate-300"></div>
              </div>
              <div className="h-2 rounded bg-slate-300"></div>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 grid-rows-2 gap-1">
                <div className="col-span-1 h-2 rounded bg-slate-300"></div>
              </div>
              <div className="h-2 rounded bg-slate-300"></div>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 grid-rows-2 gap-1">
                <div className="col-span-1 h-2 rounded bg-slate-300"></div>
              </div>
              <div className="h-2 rounded bg-slate-300"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-4 w-11/12 px-6 py-3">
        <div className="flex animate-pulse space-x-4">
          <div className="grid w-full grid-cols-1 items-center justify-around gap-32 overflow-hidden rounded-lg bg-white p-8 md:grid-cols-2 ">
            <div className="space-y-3">
              <div className="grid grid-rows-1 gap-1">
                <div className=" h-2 rounded bg-slate-300"></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="grid grid-rows-1 gap-1">
                <div className="col-span-1 h-2 rounded bg-slate-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
