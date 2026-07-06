import { useState, useEffect, useCallback } from 'react'
import { locationService } from '../services/locationService'
import type { PaginatedResult, Equipment } from '../types/equipment' // Assumindo que reaproveita tipos de equipamento
import { getRequestErrorMessage } from '../../../shared/http/getRequestErrorMessage'

interface GetLocationEquipmentParams {
  page?: number
  pageSize?: number
  // Adicione outros filtros se necessário
}

interface LocationEquipmentState {
  data: PaginatedResult<Equipment> | undefined
  isLoading: boolean
  errorMessage: string
  reload: () => Promise<void>
}

export function useLocationEquipment(
  locationId: string, 
  params: GetLocationEquipmentParams = {}
): LocationEquipmentState {
  const [data, setData] = useState<PaginatedResult<Equipment>>()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const loadData = useCallback(async () => {
    if (!locationId) return

    setIsLoading(true)
    setErrorMessage('')

    try {
      const result = await locationService.getLocationEquipment(locationId, params)
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