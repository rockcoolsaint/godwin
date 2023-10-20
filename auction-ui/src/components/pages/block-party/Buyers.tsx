const people = [
  { name: 'Anonymous 101', speed: '21 TH/s', time: '2 days ago' },
  { name: 'Pieman', speed: '210 TH/s', time: '5 hours ago' },
  { name: 'Kevin', speed: '21 TH/s', time: '2 hours ago' },
  { name: 'Nico', speed: '100 TH/s', time: '30 mins ago' },
  { name: 'Evan', speed: '21 TH/s', time: '45 secs ago' },
]

function BlockPartyBuyers() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Speed
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {people.map(person => (
                  <tr key={person.time} className="even:bg-gray-200">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">{person.name}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.speed}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlockPartyBuyers
