import { Skeleton } from "@/components/ui/skeleton";
import { ResultCardSkeleton } from "../../(home)/_components/result-card";
import { getSearch } from "@/lib/search-service";
import { ResultCard } from "./result-card";

interface ResultProps {
    term?: string
}

export const Results = async ({ term }: ResultProps) => {
    const data = await getSearch(term)
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">
                Results for term &quot;{term}&quot;
            </h2>
            {
                data.length === 0 && (
                    <p className="text-muted-foreground text-sm">
                        No results found. Try something else.
                    </p>
                )
            }
            <div className="flex flex-col gap-y-4 ">
                {data.map((result) => (
                    <ResultCard key={result.id} data={result} />
                ))}
            </div>
        </div>
    )
}


export const ResultsSkeleton = () => {
    return (
        <div>
            <Skeleton className="h-8 w-[290px] mb-4" />
            <div className="flex flex-col gap-y-4">
                {[...Array(4)].map((_, i) => (
                    <ResultCardSkeleton key={i} />
                ))}
            </div>
        </div>
    );
};
