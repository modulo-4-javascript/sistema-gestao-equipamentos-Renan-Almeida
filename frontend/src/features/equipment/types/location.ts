export type LocationStatus = 'active' | 'inactive'

export interface LocationDetail {
  id: string
  code: string
  name: string
  status: LocationStatus
  notes?: string
  createdAt?: string
  updatedAt?: string
}

export interface CreateLocationPayload {
  code: string
  name: string
  status?: LocationStatus
  notes?: string
}

export interface UpdateLocationPayload {
  code: string
  name: string
  notes?: string
}

export interface UpdateLocationStatusPayload {
  status: LocationStatus
  note?: string
}

export interface LocationHistory {
  id: string
  locationId: string
  action: string
  date: string
  user: string
  notes?: string
}