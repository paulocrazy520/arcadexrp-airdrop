import { Config } from "./config";
import { readJsonFile } from "./file-api";
import mongoose from "mongoose";
import { User } from "./db/airdrop-info.model";

const MONGO_URI = Config.dbUrl;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB", error));

const airdrop = async (account: string, amount: number, index: number) => {
  const userInfo = await User.findOne({ accountId: account });
  console.log("Airdrop No :", index + 1);
  console.log("    Owner :", account);
  if (userInfo) {
    await User.updateOne(
      { accountId: account },
      {
        balance: Number(userInfo.balance) + amount,
        airdropAmount: amount,
      }
    );
  } else {
    const newUser = new User({
      accountId: account,
      userName: account.slice(-6),
      balance: amount,
      airdropAmount: amount,
    });
    await newUser.save();
  }
  console.log("    Success!");
};

let owners: string[] = [];

const main = async () => {
  console.log("Airdrop start.");

  const holderInfo = await readJsonFile(Config.filePath);
  console.log("NFTs :", holderInfo.length);

  for (let i = 0; i < holderInfo.length; i++) {
    const isExist =
      owners.find((item) => {
        if (item === holderInfo[i].Owner) {
          return true;
        }
        return false;
      }) !== undefined;
    if (!isExist) {
      owners.push(holderInfo[i].Owner);
    }
  }
  console.log("Holders :", owners.length);

  for (let i = 0; i < owners.length; i++) {
    await airdrop(owners[i], Config.airdropAmount, i);
  }

  console.log("Airdrop done.");
};

main();
