import { useState, useEffect, useCallback } from 'react'
import { locationService } from '../services/locationService'
import type { PaginatedResult, LocationHistory } from '../types/location' 
import { getRequestErrorMessage } from '../../../shared/http/getRequestErrorMessage'

interface GetLocationHistoryParams {
  page?: number
  pageSize?: number
}

interface LocationHistoryState {
  data: PaginatedResult<LocationHistory> | undefined
  isLoading: boolean
  errorMessage: string
  reload: () => Promise<void>
}

export function useLocationHistory(
  locationId: string, 
  params: GetLocationHistoryParams = {}
): LocationHistoryState {
  const [data, setData] = useState<PaginatedResult<LocationHistory>>()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const loadData = useCallback(async () => {
    if (!locationId) return

    setIsLoading(true)
    setErrorMessage('')

    try {
      const result = await locationService.getLocationHistory(locationId, params)
      setData(result)
    } catch (error) {
      setErrorMessage(getRequestErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }, [locationId, JSON.stringify(params)])

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