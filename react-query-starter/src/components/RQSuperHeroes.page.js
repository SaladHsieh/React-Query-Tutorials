import { useState } from "react";
import { Link } from "react-router-dom";
import { useAddSuperHeroData, useSuperHeroesData } from "../hooks/useSuperHeroesData";

export const RQSuperHeroesPage = () => {
  const [name, setName] = useState('')
  const [alterEgo, setAlterEgo] = useState('')

  const onSuccess = (data) => {
    console.log('Perform side effect after data fetching', data)
  }

  const onError = (error) => {
    console.log('Perform side effect after encountering error', error)
  }

  // call the hook in our component, requires at least 2 arguments
  // const { isLoading, data } = useQuery('super-heros', () => {
  //   return axios.get('http://localhost:4000/superheroes')
  // })

  // *** const an arrow function outside and replace useQuery function with it ***
  const { isLoading, data, isError, error, isFetching, refetch } = useSuperHeroesData(onSuccess, onError)
  // console.log({isLoading, isFetching})

  const { mutate: addHero } = useAddSuperHeroData()

  const handleAddHeroClick = () => {
    console.log({ name, alterEgo })
    const hero = { name, alterEgo }
    addHero(hero)
  }

  if(isLoading) {
    return <h2>Loading...</h2>
  }

  if(isError) {
    return <h2>{error.message}</h2>
  }

  // success
  return (
    <>
      <h2>React Query Super Heroes Page</h2>

      <div>
        <input
          type='text'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type='text'
          value={alterEgo}
          onChange={e => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>

      <button onClick={refetch}>Fetch heroes</button>
      {
        // optional chainin (the question mark) so that jsx doesn't throw an error if data doesn't exist
        data?.data.map((hero) => {
          return <div key={hero.id}>
              <Link to={`rq-super-heroes/${hero.id}`}>
                {hero.name}
              </Link>
            </div>
        })

        // Data Transfromation
        // data.map((heroName) => {
        //   return <div key={heroName}>{heroName}</div>
        // })
      }
    </>
  )
}
