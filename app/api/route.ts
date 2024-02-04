"use server";
import { SearchState } from "@/util/models/Pocketbase";
import pb from "@/util/pocketbase/initPocketbase";
import { NextApiRequest, NextApiResponse } from "next";
import { ListResult, RecordModel } from "pocketbase";

const COLLECTION_NAME = "recordings";

export async function searchWithState(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const list = await fetch(req.body.url);
  // Handle your API logic here
  res.status(200).json({ message: "Hello from the API route!" });
}

export async function oldSearchWithState(
  state: SearchState
): Promise<ListResult<RecordModel>[]> {
  if (state.gen) {
    return await getAllPages(getFilterFromState(state));
  }
  return [];
}

/**
 * Generates a filter string based on the provided SearchState object.
 * @param state - The SearchState object containing the search parameters.
 * @returns The filter string generated from the search parameters.
 */
function getFilterFromState(state: SearchState) {
  const { gen, sp } = state;
  let filter = "";

  function handleConcat(string: string) {
    if (!filter) return (filter = filter.concat(string));
    filter = filter.concat(` & ${string}`);
  }

  if (!!gen) handleConcat(`gen~"${gen.toLowerCase()}"`);
  if (!!sp) handleConcat(`sp~${sp}`);

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

  return [...(await Promise.all(funcs)), initial];
}

function getSpecies(pages: ListResult<RecordModel>[]): string[] {
  const allItems = pages.map((page) => page.items).flat();

  return Array.from(new Set(allItems.map((item) => item.sp)).values());
}
