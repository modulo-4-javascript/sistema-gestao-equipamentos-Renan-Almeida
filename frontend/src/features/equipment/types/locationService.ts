import { axiosApi } from '../../../services/api' // Ajuste o caminho do axiosApi se necessário
import type { PaginatedResult, Equipment } from '../../equipment/types/equipment'
import type {
  CreateLocationPayload,
  LocationDetail,
  LocationHistory,
  UpdateLocationPayload,
  UpdateLocationStatusPayload,
} from '../types/location'

export const locationService = {
  async getLocationById(locationId: string) {
    const response = await axiosApi.get<LocationDetail>(`/locations/${locationId}`)
    return response.data
  },

  async createLocation(payload: CreateLocationPayload) {
    const response = await axiosApi.post<LocationDetail>('/locations', payload)
    return response.data
  },

  async updateLocation(locationId: string, payload: UpdateLocationPayload) {
    const response = await axiosApi.put<LocationDetail>(`/locations/${locationId}`, payload)
    return response.data
  },

  async updateLocationStatus(locationId: string, payload: UpdateLocationStatusPayload) {
    const response = await axiosApi.patch<LocationDetail>(`/locations/${locationId}/status`, payload)
    return response.data
  },

  async deleteLocation(locationId: string) {
    await axiosApi.delete(`/locations/${locationId}`)
  },

  async getLocationEquipment(locationId: string, params = {}) {
    const response = await axiosApi.get<PaginatedResult<Equipment>>(`/locations/${locationId}/equipments`, {
      params: {
        page: 1,
        pageSize: 10,
        ...params,
      },
    })
    return response.data
  },

  async getLocationHistory(locationId: string, params = {}) {
    const response = await axiosApi.get<PaginatedResult<LocationHistory>>(`/locations/${locationId}/history`, {
      params: {
        page: 1,
        pageSize: 10,
        ...params,
      },
    })
    return response.data
  },
}