import { useState } from 'react'
import { locationService } from '../services/locationService'
import { getRequestErrorMessage } from '../../../shared/http/getRequestErrorMessage'

interface DeleteLocationState {
  isLoading: boolean
  errorMessage: string
  remove: (locationId: string) => Promise<void>
}

export function useDeleteLocation(): DeleteLocationState {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  async function remove(locationId: string) {
    setIsLoading(true)
    setErrorMessage('')

    try {
      await locationService.deleteLocation(locationId)
    } catch (error) {
      setErrorMessage(getRequestErrorMessage(error))
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    errorMessage,
    remove,
  }
}