"use server";
import { SearchState } from "@/util/models/Pocketbase";
import { ListResult, RecordModel } from "pocketbase";
import pb from "../initPocketbase";

const COLLECTION_NAME = "recordings";

export const preload = () => {};

export async function searchWithState(
  state: SearchState
): Promise<ListResult<RecordModel>[]> {
  try {
    if (state?.gen) {
      const allPages = await getAllPages(getFilterFromState(state));
      return allPages;
    }
  } catch (error) {
    console.log("Error in searchWithState: ", error);

    throw error;
  } finally {
    return [];
  }
}

/**
 * Generates a filter string based on the provided SearchState object.
 * @param state - The SearchState object containing the search parameters.
 * @returns The filter string generated from the search parameters.
 */
function getFilterFromState(state: SearchState) {
  const { gen, sp, loc } = state;
  let filter = "";

  function handleConcat(string: string) {
    if (!filter) return (filter = filter.concat(string));
    filter = filter.concat(` & ${string}`);
  }

  if (!!gen) handleConcat(`gen~"${gen.toLowerCase()}"`);
  if (!!sp) handleConcat(`sp~${sp}`);
  if (!!loc) handleConcat(`loc~"${loc.toLowerCase()}"`);

  return filter;
}

export async function getAllPages(filter: string) {
  const initial = await pb.collection(COLLECTION_NAME).getList(1, 500, {
    filter,
  });

  if (initial.totalPages === 1) return [initial];

  let funcs = [];
  for (let i = 1; i < initial.totalPages; i++) {
    funcs.push(
      pb.collection(COLLECTION_NAME).getList(i + 1, 500, {
        filter,
        requestKey: null,
      })
    );
  }

  return [initial, ...(await Promise.all(funcs))];
}

// export function getSpecies(pages: ListResult<RecordModel>[]): string[] {
//   const allItems = pages.map((page) => page.items).flat();

//   return Array.from(new Set(allItems.map((item) => item.sp)).values());
// }
