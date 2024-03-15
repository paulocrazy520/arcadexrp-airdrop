import * as fs from "fs";

interface HolderInfoType {
  NFTokenID: string;
  Issuer: string;
  Owner: string;
  Taxon: number;
  TransferFee: number;
  Flags: number;
  Sequence: number;
  URI: string;
}

// Function to read and parse the JSON file
export function readJsonFile(filePath: string): Promise<HolderInfoType[]> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: "utf-8" }, (err: any, data: any) => {
      if (err) {
        reject(err);
        return;
      }
      try {
        const jsonData: HolderInfoType[] = JSON.parse(data);
        resolve(jsonData);
      } catch (parseError) {
        reject(parseError);
      }
    });
  });
}
