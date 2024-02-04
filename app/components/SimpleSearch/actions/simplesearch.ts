"use server";

import { XenoCantoRecording } from "@/util/models/Pocketbase";
import pb from "@/util/pocketbase/initPocketbase";
import { capitalizeAll } from "@/util/stringManipulation";
import _, { capitalize } from "lodash";
import { cache } from "react";

export const simpleSearch = cache(
  async (text: string, searchBy: string): Promise<XenoCantoRecording[]> => {
    try {
      const res = await getPbCollection(searchBy)
        .getList(1, 20, {
          filter: getFilterString(text, searchBy),
          requestKey: null,
        })
        .then((res) => res.items as unknown as XenoCantoRecording[]);

      return res.map((rec) => ({
        ...rec,
        [searchBy]: capitalizeAll(rec[searchBy]),
      }));
    } catch (error) {
      console.log("Error in simpleSearch: ", error);

      throw error;
    }
  }
);

function getPbCollection(field: string) {
  return pb.collection(field === "loc" ? "recordings" : `distinct_${field}`);
}

function getFilterString(text: string, field: string) {
  return `${field} ${field === "loc" ? "~" : ">="} "${text.toLowerCase()}"`;
}
