import api from '@/app/api'
import {
  inventoryItemSchema,
  inventoryPaginatedDataSchema,
  type InventoryItem,
  type InventoryPaginatedData,
} from '../models/InventoryItem'
import type { CreateInventoryItem } from '../models/CreateInventoryItem'
import type { InventoryParams } from '../models/InventoryParams'

export const getInventory = async (
  params?: InventoryParams,
): Promise<InventoryPaginatedData> => {
  const res = await api.get('/inventory', { params })
  return inventoryPaginatedDataSchema.parse(res.data)
}

export const getSingleInventoryItem = async (
  id: InventoryItem['id'],
): Promise<InventoryItem> => {
  const res = await api.get(`/inventory/${id}`)
  return inventoryItemSchema.parse(res.data)
}

export const createInventoryItem = async (
  data: CreateInventoryItem,
): Promise<InventoryItem> => {
  const res = await api.post('/inventory', data)
  return inventoryItemSchema.parse(res.data)
}

export const updateInventoryItem = async (
  id: InventoryItem['id'],
  data: Partial<CreateInventoryItem>,
): Promise<InventoryItem> => {
  const res = await api.put(`/inventory/${id}`, data)
  return inventoryItemSchema.parse(res.data)
}

export const deleteInventoryItem = async (
  id: InventoryItem['id'],
): Promise<void> => {
  await api.delete(`/inventory/${id}`)
}
