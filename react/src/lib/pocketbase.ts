import PocketBase, { LocalAuthStore } from "pocketbase";
import type { TypedPocketBase } from "@/types/pocketbase.gen";

export const pb = new PocketBase() as TypedPocketBase;

export const pbAdmin = new PocketBase(
  undefined,
  new LocalAuthStore("__pb_superuser_auth__")
) as TypedPocketBase;
