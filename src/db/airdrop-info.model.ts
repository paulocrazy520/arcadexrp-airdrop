import { Schema, model } from "mongoose";

interface IUser {
  accountId: string;
  balance: number;
  bettedChips: string;
  remainCards: string;
  dealerCards: string;
  preDealerCards: string;
  playerCards: string;
  prePlayerCards: string;
  playStatus: number;
  oneDayGainBalance: number;
  wholeGainBalance: number;
  airdropAmount: number;
}

const userSchema = new Schema<IUser>(
  {
    accountId: { type: String, default: "" },
    balance: { type: Number, default: 0 },
    bettedChips: { type: String, default: "" },
    remainCards: { type: String, default: "" },
    dealerCards: { type: String, default: "" },
    preDealerCards: { type: String, default: "" },
    playerCards: { type: String, default: "" },
    prePlayerCards: { type: String, default: "" },
    playStatus: { type: Number, default: 0 },
    oneDayGainBalance: { type: Number, default: 0 },
    wholeGainBalance: { type: Number, default: 0 },
    airdropAmount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const User = model<IUser>("playInfo", userSchema);
