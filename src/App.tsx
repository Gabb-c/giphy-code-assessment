import { Grid } from '@giphy/react-components'
import { GiphyFetch } from '@giphy/js-fetch-api';
import { useState } from 'react';
import { useDebounce } from './hooks/use-debounce-value';

const gf = new GiphyFetch('pLURtkhVrUXr3KG25Gy5IvzziV5OrZGa')

export const App: React.FC = (): JSX.Element => {
  const [query, setQuery] = useState<string>('');
  const [limit, setLimit] = useState<number>(20)

  const searchQuery = useDebounce(query, 1000);
  const searchLimit = useDebounce(limit, 1000);

  const fetchGifs = () => {
    console.log(searchLimit)
    return gf.search(searchQuery, { limit: searchLimit });
  }

  const clearResults = () => setQuery('');

  return (
    <div className='mx-auto flex justify-center items-center flex-col space-y-4 py-4'>
      <div className="w-auto flex row-auto space-x-4">
        <input
          value={query}
          onChange={({ target }) => setQuery(target.value)}
          className="w-full p-2 bg-slate-800 text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
        />
        <button className='w-auto' onClick={clearResults}>Clear</button>
      </div>
      <div className='w-auto flex row-auto space-x-8'>
        <button onClick={() => setLimit(10)} className='text-center p-3 bg-teal-900 rounded-md'>10</button>
        <button className='text-center p-3 bg-teal-900 rounded-md'>20</button>
        <button className='text-center p-3 bg-teal-900 rounded-md'>30</button>
        <button className='text-center p-3 bg-teal-900 rounded-md'>40</button>
      </div>

      {searchQuery ? <Grid width={800} columns={3} fetchGifs={fetchGifs} /> : <></>}
    </div>
  )
}
