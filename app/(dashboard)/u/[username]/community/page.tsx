import { getBlockedUser } from "@/lib/block-service";
import { columns } from "./_components/columns"
import { DataTable } from "./_components/data-table";
import { format } from "date-fns";


export default async function CommunityPage() {
    const blockedUsers = await getBlockedUser();
    const formattedData = blockedUsers.map((block) => ({
        ...block,
        userId: block.blocked.id,
        username: block.blocked.username,
        imageUrl: block.blocked.imageUrl,
        createdAt: format(new Date(block.blocked.createdAt), "dd/MM/yyyy"),
    }))


    return (
        <div className="p-6">
            <div className="mb-4">
                <h1 className="text-2xl font-bold">Community Settings</h1>
            </div>
            <div className="container mx-auto py-10">
                <DataTable columns={columns} data={formattedData} />
            </div>
        </div>
    )
}