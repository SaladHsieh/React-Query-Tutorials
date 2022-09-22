// import hook from react-query
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

// *** const an arrow function for 2nd parameter of useQuery ***
const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes')
}

// mutation function
const addSuperHero = hero => {
  // 2nd parameter is  the data for this request
  return axios.post('http://localhost:4000/superheroes', hero)
  // return request({ url: '/superheroes', method: 'post', data: hero })
}

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery(
    'super-heroes', 
    fetchSuperHeroes, 
    {
			// cacheTime: 5000, // 緩存 5 秒
			// staleTime: 30000, // 每 30 秒重新 fetch data
			// refetchOnMount: true,
			refetchOnWindowFocus: false,
			// refetchInterval: 2000, // 每 2 秒更新一次
			// refetchIntervalInBackground: true, // 背景更新
			// enabled: false, // not to get request when the component mounts
      onSuccess, // Success Callback (it's ES6 shorthand same as => onSuccess: onSuccess)
      onError, // Error Callback
      // select: (data) => {
      //   const superHeroNames = data.data.map((hero) => hero.name)
      //   return superHeroNames
      // }
		}
  )
}

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient()

  // useMutation doesn't need a unique key, the 1st parameter is the mutation function which will post data to the backend
  return useMutation(addSuperHero, {
    // onSuccess: data => {
      /************* Query Invalidation Start *************/
      // by invalidating the query, React-Query will refetch the superheroes query
      // queryClient.invalidateQueries('super-heroes')
      /************* Query Invalidation End *************/

      // use addSuperHero mutation response to update the superheroes query data to save an additional network request
      /************* Handling Mutation Response Start *************/
      // the 2nd parameter is a function which is used to update the queryCache. oldQueryData refers to what is present in the query cache
      // queryClient.setQueryData('super-heroes', oldQueryData => {
      //   return {
      //     ...oldQueryData,
      //     data: [...oldQueryData.data, data.data]
      //   }
      // })
      /************* Handling Mutation Response Start *************/
    // },

    /************* OPTIMISTIC UPDATES START *************/
    onMutate: async newHero => {
      // A mutation is about to happen!
      await queryClient.cancelQueries('super-heroes')

      // Optionally return a context containing data to use when for example rolling back
      const previousHeroData = queryClient.getQueryData('super-heroes')
      queryClient.setQueryData('super-heroes', oldQueryData => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newHero }
          ]
        }
      })
      return { previousHeroData }
    },
    // _err means we don't need this parameter. the 3rd parameter context contains additional info pertaining to the mutation
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData('super-heroes', context.previousHeroData)
    },
    onSettled: () => {
      queryClient.invalidateQueries('super-heroes')
    }
    /************* OPTIMISTIC UPDATES END *************/
  })
}