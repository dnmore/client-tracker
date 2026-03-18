import prisma from "@/lib/prisma";
import { Role, Plan } from "@prisma/client";


async function main(){
    await prisma.user.upsert({
        where: { email: "YOUR_DEMO_USER_EMAIL"},
        update: {},
        create:{
            email: "YOUR_DEMO_USER_EMAIL",
            name: "Demo User",
            role: Role.VIEWER,
            plan: Plan.FREE

        }
    })
}

main()