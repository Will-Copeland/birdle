import PocketBase, { ListResult, RecordModel } from "pocketbase";
import { SearchState } from "../models/Pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

export default pb;
