import csv from "csvtojson";

export default async function getEntries(path) {
  return await csv().fromFile(path);
}
