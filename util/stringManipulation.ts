import { capitalize } from "lodash";

export function capitalizeAll(string: string): string {
  return string.split(" ").map(capitalize).join(" ");
}
