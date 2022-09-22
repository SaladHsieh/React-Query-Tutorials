import { useQuery } from 'react-query'
import axios from "axios";

// const fetchSuperHero = (heroId) => {
//   return axios.get(`http://localhost:4000/superheroes/${heroId}`)
// }

// export const useSuperHeroData = (heroId) => {
//   return useQuery(['super-heroes', heroId], () => fetchSuperHero(heroId))
// }

// ****************** ANOTHER METHOD ********************* //
const fetchSuperHero = ({ queryKey }) => {
  // queryKey is an array which mimics the array we have passed into useQuery, heroId is at index position 1
  const heroId = queryKey[1]
  console.log('****', queryKey)
  return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

export const useSuperHeroData = (heroId) => {
  // React-Query automatically passes the parameter into the fetche function, so we can replace the arrow function with just fetchSuperHero
  return useQuery(['super-heroes', heroId], fetchSuperHero)
}