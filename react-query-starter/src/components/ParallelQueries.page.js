import { useQuery } from 'react-query'
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes')
}
const fetchFriends = () => {
  return axios.get('http://localhost:4000/friends')
}

export const ParallelQueriesPage = () => {
  // Parallel Query is invoke useQuery multiple times, to resolve the conflict when we use the value (data), we use alias => {data: superHeroes}
  const { data: superHeroes } = useQuery('super-heroes', fetchSuperHeroes)
  const { data: friends } = useQuery('friends', fetchFriends)

  return (
    <>
      <h2>ParallelQueriesPage</h2>
      <h3>Super Heroes</h3>
      {superHeroes?.data.map(superHero => {
        return <div key={superHero.id}>
        <div key={superHero.id}>
          {superHero.name}
        </div>
      </div>
      })}

      <br />
      
      <h3>Friends</h3>
      {friends?.data.map(friend => {
        return <div key={friend.id}>
        <div key={friend.id}>
          {friend.name}
        </div>
      </div>
      })}
    </>
  )
}
