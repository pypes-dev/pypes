// src/utils/fetchPosts.ts
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { Post } from "@/payload-types";

export async function getLatestPosts(limit = 3): Promise<Post[]> {
    try {
        const payload = await getPayload({ config: configPromise });

        const result = await payload.find({
            collection: "posts",
            limit,
            sort: "-publishedAt",
            where: {
                _status: {
                    equals: "published",
                },
            },
        });

        return result.docs as Post[];
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
}
