import type {FetchAdsParams} from "../model/types.ts";
import {useQuery} from "@tanstack/react-query";
import {fetchAds} from "./ad-api.ts";

export const adsKeys = {
  all: ['ads'] as const,
  lists: () => [...adsKeys.all, 'lists'] as const,
  list: (params: FetchAdsParams) => [...adsKeys.lists(), params] as const
}

export const useAds = (params: FetchAdsParams) => {
  return useQuery({
    queryKey: adsKeys.list(params),
    queryFn: () => fetchAds(params)
  })
}