"use server";

import pb from "../initPocketbase";

export async function getGenusAutoComplete(genSearchText: string) {
  const list = await pb.collection(`count_gen`).getList(1, 100, {
    filter: `gen >= "${genSearchText.toLowerCase().trim()}"`,
  });

  return list.items.map((itm) => ({
    label: itm.gen,
    count: itm.COUNT,
  }));
}
