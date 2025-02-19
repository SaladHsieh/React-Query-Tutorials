import { useQueries } from 'react-query'
import axios from "axios";

const fetchSuperHero = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

// heroIds is an array of hero ids
export const DynamicParallelPage = ({ heroIds }) => {
  // useQueries returns an array of query results
  const queryResults = useQueries(
    heroIds.map( id => {
      return {
        queryKey: ['super-hero', id],
        queryFn: () => fetchSuperHero(id),
      }
    })
  )
  console.log({queryResults})

  return (
    <div>DynamicParallelPage</div>
  )
}
