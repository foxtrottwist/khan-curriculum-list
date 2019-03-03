import axios from 'axios'

const BASE_URL = 'https://www.khanacademy.org/api/v1/topic/'

export const get = endPoint => axios.get(BASE_URL + endPoint)
