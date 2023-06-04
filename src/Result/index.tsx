import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { citiesListComplete } from '../utils'
import { getDistances } from '../services'

function SearchResult() {
  const [listState, setListState] = useState<any>([])
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {

    const list = []
    for (const entry of searchParams.entries()) {
      list.push(...citiesListComplete.filter((x) => x[0].toLowerCase().includes(entry[1].toLowerCase())))
    }
    console.log(list, citiesListComplete);
    getDistances(list)
    .then((res) => {
      console.log(res)
      setListState(res)
    })
    .catch((err) => console.log(err))
    // console.log(searchParams.entries(), window.location.search)
  }, [])

  return (
    <>
      <h1>Search Result</h1>
    </>
  )
}

export default SearchResult
