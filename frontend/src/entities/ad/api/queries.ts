import type {FetchAdsParams, ItemUpdateIn} from "../model/types.ts";
import {useQuery, useMutation, keepPreviousData, useQueryClient} from "@tanstack/react-query";
import {fetchAds, fetchAdById, updateAd} from "./ad-api.ts";

export const adsKeys = {
  all: ['ads'] as const,
  lists: () => [...adsKeys.all, 'lists'] as const,
  list: (params: FetchAdsParams) => [...adsKeys.lists(), params] as const,
  details: () => [...adsKeys.all, 'detail'] as const,
  detail: (id: string) => [...adsKeys.details(), id] as const,
}

export const useAds = (params: FetchAdsParams) => {
  return useQuery({
    queryKey: adsKeys.list(params),
    queryFn: () => fetchAds(params),
    placeholderData: keepPreviousData
  })
}

export const useAdById = (id: string) => {
  return useQuery({
    queryKey: adsKeys.detail(id),
    queryFn: () => fetchAdById(id),
    enabled: !!id
  })
}

export const useUpdateAd = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: ItemUpdateIn }) => updateAd(id, payload),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: adsKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: adsKeys.lists() });
    }
  });
}