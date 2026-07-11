import fs from "fs";
import csv from "csv-parser";

export const parseCSV = <T>(filePath: string): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    const rows: T[] = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row: T) => {
        rows.push(row);
      })
      .on("end", () => {
        resolve(rows);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};