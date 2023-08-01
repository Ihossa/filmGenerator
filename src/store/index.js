import { parseForFilter } from '../helpers/parseForFilter'
import { defineStore } from 'pinia'
import {reactive, ref} from 'vue'

export const FILTER_GENRE = 'genre_type';
export const FILTER_YEAR = 'year';
export const FILTER_RATING = 'rating_score';
export const defaultFilter = {
  [FILTER_GENRE]: '',
  [FILTER_YEAR]: '',
  [FILTER_RATING]: ''
}

export const filmStore = defineStore('filmStore', () =>{

  const films = ref([])
  const filters = reactive({
    [FILTER_GENRE]: ref(''),
    [FILTER_YEAR]: ref(''),
    [FILTER_RATING]: ref('')
  })
  const appliedFilter = reactive({...filters})
  const optionsForGenre = reactive([])
  const optionsForYear = reactive([])
  const isLoading = ref(false)

  const setFilter = (filter) => {
    filters[filter.type] = filter.value
  }

  const setOptionsForGenre = (optionsForGenreProps) => {
    optionsForGenre.value = optionsForGenreProps
  }

  const setOptionsForYear = (optionsForYearProps) => {
    optionsForYear.value = optionsForYearProps
  }

  const setFilms = (filmList) => {
    films.value = filmList
  }

  const setAppliedFilter = () => {
    Object.keys(appliedFilter).forEach(keyFilter => {
      appliedFilter[keyFilter] = filters[keyFilter]
    })
  }

  const setLoading = (isLoadingProps) => {
    isLoading.value = Boolean(isLoadingProps)
  }

  const fetchFilms = () => {
      setLoading(true)
      fetch('/movies_list.json')
        .then((data) =>
          data.json().then((data) => {
            setFilms(data)
            let { listGenre, listYear } = parseForFilter(data)
            setOptionsForGenre(listGenre)
            setOptionsForYear( Array.from(listYear.values()).sort((a, b) => b - a))
          })
        )
        .catch((err) => {
          console.error(err)
        })
        .finally(() => {
          setLoading(false)
        })
    }

  const applyFilter = async() => {
    setLoading(true)

    try {
      let data = await fetch('/movies_list.json').then((data) => {
        return data.json()
      })

      Object.keys(filters).forEach((filterItemKey) => {
        if (filters[filterItemKey]) {
            data = data.filter((filterItem) => {
              return String(filterItem[filterItemKey]) === String(filters[filterItemKey])
            })
          }
        })

        setFilms(data)
        setAppliedFilter()
      } catch (err){
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

  return {films, filters, appliedFilter, optionsForGenre, optionsForYear, isLoading, setFilter, fetchFilms, applyFilter }
})
