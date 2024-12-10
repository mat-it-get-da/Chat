import { atom } from "recoil";

export const $username = atom({
    key: "username",
    default: undefined,
});

export const $userId = atom({
    key: "user-id",
    default: undefined,
});
