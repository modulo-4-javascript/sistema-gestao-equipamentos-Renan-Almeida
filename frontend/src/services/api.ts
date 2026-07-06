// AULA 07: Instância do Axios usada pelos services.
import axios from 'axios'

export const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api/v1',
})
