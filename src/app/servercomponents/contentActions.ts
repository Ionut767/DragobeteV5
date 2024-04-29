"use server";
import dbConnect from "@/libs/dbs/connectToDB";
import PostsSchema from "@/libs/schemas/posts/posts";
import UsersSchema from "@/libs/schemas/users/users";

export async function showContent(pageCount: number) {
  try {
    await dbConnect();
    const totalPosts = await PostsSchema.countDocuments();
    if (totalPosts === 0) {
      return {
        code: 404,
      };
    }
    if (pageCount * 10 >= totalPosts) {
      return {
        code: 204,
      };
    }

    const content = await PostsSchema.find(
      {},
      { _id: 1, source: 1, "data.description": 1, userId: 1 }
    )
      .skip(pageCount * 10)
      .limit(10)
      .lean();

    const userQueries = content.map((post) =>
      UsersSchema.findOne({ _id: post.userId }, { image: 1, name: 1 }).lean()
    );
    type User = {
      image: string;
      name: string;
    };
    const users: (User | null)[] = (await Promise.all(
      userQueries
    )) as (User | null)[];

    const validUsers: User[] = users.filter(
      (user): user is User => user !== null
    ) as User[];

    const defcontent = content.map((post, index: number) => {
      const user: User = validUsers[index];
      return {
        _id: post._id?.toString(),
        image: post.source as string,
        description: post.data.description as string,
        authorId: post.userId.toString() as string,
        authorImage: user.image,
        authorName: user.name,
      };
    });
    return {
      content: defcontent,
      code: 200,
    };
  } catch (error) {
    console.error(error);
    return { code: 500 };
  }
}
