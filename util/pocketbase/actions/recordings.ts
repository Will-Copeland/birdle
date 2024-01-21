"use server";
import { SearchState } from "@/util/models/Pocketbase";
import { ListResult, RecordModel } from "pocketbase";
import pb from "../initPocketbase";

const COLLECTION_NAME = "recordings";
export async function searchWithState(
  state: SearchState
): Promise<ListResult<RecordModel>[]> {
  if (state.gen) {
    return await getAllPages(getFilterFromState(state));
  }
  return [];
}

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

export async function getSpeciesFromGen(gen: string): Promise<string[]> {
  try {
    const allPages = await getAllPages(`gen~"${gen.toLowerCase().trim()}"`);
    const items = allPages.map((page) => page.items).flat();
    const spArray = items.map((item) => item.sp);
    const speciesSet = new Set<string[]>(spArray);

    return Array.from(speciesSet).flat();
  } catch (error) {
    return [];
  }
}
