import PocketBase from "pocketbase";
import type { TypedPocketBase } from "@/types/pocketbase.gen";

export const pb = new PocketBase() as TypedPocketBase;
