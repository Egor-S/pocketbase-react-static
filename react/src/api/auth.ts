import { pb } from "@/lib/pocketbase";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

export const CurrentUserKey = ["currentUser"];

export function useCurrentUser() {
  return useQuery({
    queryKey: CurrentUserKey,
    queryFn: () => pb.collection("users").authRefresh(),
    refetchInterval: 30 * 60 * 1000, // 30 minutes
  });
}

export function useLoginMutation(queryClient: QueryClient) {
  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      pb.collection("users").authWithPassword(data.email, data.password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CurrentUserKey });
    },
  });
}

export function useLogoutMutation(queryClient: QueryClient) {
  return useMutation({
    mutationFn: async () => pb.authStore.clear(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CurrentUserKey });
    },
  });
}
