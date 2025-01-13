import { PrismaClient } from "@prisma/client";

declare global{
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}


//* In development, we don't want a client to be created every time we change the code.
//* That's why for development, we declare PrismaClient as global as the global does not undergo hot reload.

export const db = globalThis.prisma || new PrismaClient();

if(process.env.NODE_ENV!='production') globalThis.prisma = db;