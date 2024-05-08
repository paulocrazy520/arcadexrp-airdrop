import { Schema, model } from "mongoose";

interface IUser {
  accountId: string;
  userName: string;
  balance: number;
  volumeInfo: string;
  lastDayVolume: number;
  lastWeekVolume: number;
  description: string;
  airdropAmount: number;
}

const userSchema = new Schema<IUser>(
  {
    accountId: { type: String, default: "" },
    userName: { type: String, default: "" },
    balance: { type: Number, default: 0 },
    volumeInfo: { type: String, default: "" }, //   balance,type,date
    lastDayVolume: { type: Number, default: 0 },
    lastWeekVolume: { type: Number, default: 0 },
    description: { type: String, default: "" },
    airdropAmount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const User = model<IUser>("BalanceInfo", userSchema);
