"use server";

import { connectToDB } from "../mongoose";

export async function upadateUser(): Promise<void> {
    connectToDB()
}
