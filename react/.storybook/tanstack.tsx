import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { QueryKey, SetDataOptions } from "@tanstack/react-query";
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import type { PartialStoryFn, StoryContext } from "storybook/internal/types";

// from https://github.com/TanStack/router/discussions/952#discussioncomment-8717966
export function TanstackRouterDecorator(
  Story: PartialStoryFn,
  { parameters }: StoryContext
) {
  const {
    initialEntries = ["/"],
    initialIndex,
    routes = ["/"],
  } = parameters?.router || {};

  const rootRoute = createRootRoute();

  const children = routes.map((path) =>
    createRoute({
      path,
      getParentRoute: () => rootRoute,
      component: Story,
    })
  );

  rootRoute.addChildren(children);

  const router = createRouter({
    history: createMemoryHistory({ initialEntries, initialIndex }),
    routeTree: rootRoute,
  });

  return <RouterProvider router={router} />;
}

export function TanstackQueryDecorator(
  Story: PartialStoryFn,
  { parameters }: StoryContext
) {
  const { queryData = [], queryDefaults = [] } = parameters || {};

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
      },
    },
  });

  queryData.forEach(({ key, updater, options }) => {
    queryClient.setQueryData(key, updater, options);
  });

  queryDefaults.forEach(({ key, options }) => {
    queryClient.setQueryDefaults(key, options);
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Story />
    </QueryClientProvider>
  );
}

declare module "storybook/internal/types" {
  interface Parameters {
    router?: {
      initialEntries?: string[];
      initialIndex?: number;
      routes?: string[];
    };

    queryData?: {
      key: QueryKey;
      updater: object; // TODO: type this
      options?: SetDataOptions;
    }[];

    queryDefaults?: {
      key: QueryKey;
      options: object; // TODO: type this
    }[];
  }
}
