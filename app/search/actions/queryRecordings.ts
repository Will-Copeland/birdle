import pb from "@/util/pocketbase/initPocketbase";

export async function queryRecordings(key: string, value: string) {
  return await pb.collection("recordings").getList(1, 20, {
    filter: `${key} = "${value}"`,
    requestKey: null,
  });
}
