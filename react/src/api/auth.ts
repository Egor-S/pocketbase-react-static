import { ClientResponseError } from "pocketbase";
import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { pb } from "@/lib/pocketbase";
import { queryClient } from "@/api/queryClient";

export const UserQueryOptions = queryOptions({
  queryKey: ["currentUser"],
  queryFn: () => pb.collection("users").authRefresh(),
  refetchInterval: 30 * 60 * 1000, // 30 minutes
  retry: (failureCount, error) => {
    if (failureCount >= 3) return false;
    if (error instanceof ClientResponseError && error.status === 401)
      return false;
    return true;
  },
});

export const LogoutMutationOptions = mutationOptions({
  mutationFn: async () => pb.authStore.clear(),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: UserQueryOptions.queryKey });
  },
});

export const LoginMutationOptions = mutationOptions({
  mutationFn: (data: { email: string; password: string }) =>
    pb.collection("users").authWithPassword(data.email, data.password),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: UserQueryOptions.queryKey });
  },
});
