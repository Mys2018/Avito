import type {FetchAdsParams, ItemsGetOut} from "../model/types.ts";
import {apiClient} from "../../../shared/api/base.ts";

// Может не работать
export const fetchAds = async (params: FetchAdsParams): Promise<ItemsGetOut> => {
  const { data } = await apiClient.get<ItemsGetOut>('/items', {params});
  return data;
}