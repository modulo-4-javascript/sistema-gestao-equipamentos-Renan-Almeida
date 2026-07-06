import { useState, useEffect, useCallback } from 'react'
import { locationService } from '../services/locationService'
import type { LocationDetail } from '../types/location'
import { getRequestErrorMessage } from '../../../shared/http/getRequestErrorMessage'

interface LocationDetailsState {
  data: LocationDetail | undefined
  isLoading: boolean
  errorMessage: string
  reload: () => Promise<void>
}

export function useLocationDetails(locationId: string | undefined): LocationDetailsState {
  const [data, setData] = useState<LocationDetail>()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const loadData = useCallback(async () => {
    if (!locationId) return

    setIsLoading(true)
    setErrorMessage('')

    try {
      const result = await locationService.getLocationById(locationId)
      setData(result)
    } catch (error) {
      setErrorMessage(getRequestErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }, [locationId])

  useEffect(() => {
    loadData()
  }, [loadData])

  return {
    data,
    isLoading,
    errorMessage,
    reload: loadData,
  }
}