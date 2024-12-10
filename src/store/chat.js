import { atom } from "recoil";

export const chatHistory = atom({
    key: "chat-history",
    default: [],
});
