import { useState } from 'react'
import { locationService } from '../services/locationService'
import type { UpdateLocationStatusPayload, LocationDetail } from '../types/location'
import { getRequestErrorMessage } from '../../../shared/http/getRequestErrorMessage'

interface UpdateLocationStatusState {
  isLoading: boolean
  errorMessage: string
  updateStatus: (params: { locationId: string; payload: UpdateLocationStatusPayload }) => Promise<LocationDetail>
}

export function useUpdateLocationStatus(): UpdateLocationStatusState {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  async function updateStatus({ locationId, payload }: { locationId: string; payload: UpdateLocationStatusPayload }) {
    setIsLoading(true)
    setErrorMessage('')

    try {
      return await locationService.updateLocationStatus(locationId, payload)
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
    updateStatus,
  }
}