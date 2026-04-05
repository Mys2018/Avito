import type {FetchAdsParams, ItemsGetOut, ItemUpdateIn, Ad} from "../model/types.ts";
import {apiClient} from "../../../shared/api/base.ts";

export const fetchAds = async (params: FetchAdsParams): Promise<ItemsGetOut> => {
  const { data } = await apiClient.get<ItemsGetOut>('/items', {params});
  return data;
}

export const fetchAdById = async (id: string): Promise<Ad & { needsRevision: boolean }> => {
  const { data } = await apiClient.get<Ad & { needsRevision: boolean }>(`/items/${id}`);
  return data;
}

export const updateAd = async (id: string, payload: ItemUpdateIn): Promise<void> => {
  await apiClient.put(`/items/${id}`, payload);
}