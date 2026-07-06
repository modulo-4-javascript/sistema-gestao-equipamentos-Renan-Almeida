import { useState } from 'react'
import { locationService } from '../services/locationService'
import type { CreateLocationPayload, LocationDetail } from '../types/location'
import { getRequestErrorMessage } from '../../../shared/http/getRequestErrorMessage'

interface CreateLocationState {
  isLoading: boolean
  errorMessage: string
  create: (payload: CreateLocationPayload) => Promise<LocationDetail>
}import { useState } from 'react'
import { locationService } from '../services/locationService'
import type { UpdateLocationPayload, LocationDetail } from '../types/location'
import { getRequestErrorMessage } from '../../../shared/http/getRequestErrorMessage'

interface UpdateLocationState {
  isLoading: boolean
  errorMessage: string
  update: (params: { locationId: string; payload: UpdateLocationPayload }) => Promise<LocationDetail>
}

export function useUpdateLocation(): UpdateLocationState {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  async function update({ locationId, payload }: { locationId: string; payload: UpdateLocationPayload }) {
    setIsLoading(true)
    setErrorMessage('')

    try {
      return await locationService.updateLocation(locationId, payload)
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
    update,
  }
}

export function useCreateLocation(): CreateLocationState {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  async function create(payload: CreateLocationPayload) {
    setIsLoading(true)
    setErrorMessage('')

    try {
      return await locationService.createLocation(payload)
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
    create,
  }
}