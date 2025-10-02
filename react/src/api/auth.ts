import { ClientResponseError } from "pocketbase";
import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { pb, pbAdmin } from "@/lib/pocketbase";
import { queryClient } from "@/api/queryClient";

const authRefetchInterval = 30 * 60 * 1000; // 30 minutes

function authRetry(failureCount: number, error: Error) {
  if (failureCount >= 3) return false;
  if (error instanceof ClientResponseError && error.status === 401)
    return false;
  return true;
}

export const UserQueryOptions = queryOptions({
  queryKey: ["currentUser"],
  queryFn: () => pb.collection("users").authRefresh(),
  refetchInterval: authRefetchInterval,
  retry: authRetry,
});

export const AdminQueryOptions = queryOptions({
  queryKey: ["currentAdmin"],
  queryFn: () => pbAdmin.collection("_superusers").authRefresh(),
  refetchInterval: authRefetchInterval,
  retry: authRetry,
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
