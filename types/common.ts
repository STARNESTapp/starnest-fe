import { UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export interface APIResponseNoData {
  message?: string;
  status?: string;
}

export type MutationOptions<
  TData = unknown,
  TVariables = void,
  TError = AxiosError<unknown>,
  TContext = unknown
> = Omit<UseMutationOptions<TData, TError, TVariables, TContext>, "mutationFn">;
