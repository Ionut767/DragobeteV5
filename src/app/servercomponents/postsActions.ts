"use server";

import dbConnect from "@/libs/dbs/connectToDB";
import { getServerSession } from "next-auth";
import PostsSchema from "@/libs/schemas/posts/posts";
import { ObjectId } from "mongodb";
import Posts_Likes_Schema from "@/libs/schemas/posts/posts_likes";
import Posts_Comments_Schema from "@/libs/schemas/posts/posts_comments";
import Posts_Saves_Schema from "@/libs/schemas/posts/posts_saves";
import Posts_Shares_Schema from "@/libs/schemas/posts/posts_shares";
import UsersSchema from "@/libs/schemas/users/users";
import { google } from "googleapis";
import { Readable } from "stream";
import Filter from "bad-words";
const filter = new Filter();

export async function addPost(prevState: any, formData: FormData) {
  try {
    await dbConnect();
    const session = await getServerSession();
    if (!session?.user.email) {
      return {
        ...prevState,
        code: 401, //unauthorized
        error: "Unauthorized! Please log in first.",
      };
    }
    const userId: { _id: ObjectId } | null = await UsersSchema.findOne({
      email: session.user.email,
    });
    if (!userId?._id) {
      return {
        ...prevState,
        code: 401, //unauthorized
        error: "Unauthorized! Please log in first.",
      };
    }
    if (!formData.get("source"))
      return {
        ...prevState,
        code: 400, //bad request
        error: "Oops! No image or file selected!",
      };
    if (
      ![
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/jpg",
      ].includes((formData.get("source") as File).type)
    ) {
      return {
        ...prevState,
        code: 401, //unauthorized
        error: `Invalid file type! Your file type is ${
          (formData.get("source") as File).type
        }.`,
      };
    }
    if (
      (formData.get("source") as File).size > 5 * 1024 * 1024 ||
      (formData.get("source") as File).size < 0
    ) {
      return {
        ...prevState,
        code: 401, //unauthorized
        error:
          "Oops! The selected image doesn't meet our size requirements. Please choose another one.",
      };
    }
    if (formData.get("description") === "") {
      return {
        ...prevState,
        code: 400, //bad request
        error: "Oops! The description cannot be empty!",
      };
    }
    if (filter.isProfane(formData.get("description") as string)) {
      return {
        ...prevState,
        code: 400, //bad request
        error:
          "Oops! The description contains profanity. Please respect our community rules!",
      };
    }
    const auth = new google.auth.GoogleAuth({
      keyFile: ("./src/app/servercomponents/secrets/" +
        process.env.DRIVE_JSON_NAME) as string,
      scopes: ["https://www.googleapis.com/auth/drive"],
    });
    const drive = google.drive({ version: "v3", auth });
    const fileMetadata = {
      name: (formData.get("source") as File).name,
    };
    let source = formData.get("source");
    let fileBuffer;
    let mimeType;

    if (source instanceof File) {
      fileBuffer = source.stream();
      mimeType = source.type;
    } else {
      return {
        ...prevState,
        code: 500,
        error: "Oops! Post could not be uploaded. Please try again... (FUF1)",
      };
    }

    const media = {
      mimeType: mimeType,
      body: Readable.from(fileBuffer as any),
    };
    //
    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: "id",
    });

    const fileId = response.data.id;
    await drive.permissions.create({
      fileId: fileId as string,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });
    //If something fails...GOD HELP US!
    const newPost = new PostsSchema({
      _id: new ObjectId(),
      userId: userId._id,
      source: fileId,
      data: {
        description: formData.get("description") as string,
        sound: {
          _id: new ObjectId(),
          name: formData.get("sound") as string,
        },
      },
    });
    const postLikes = new Posts_Likes_Schema({
      _id: new ObjectId(),
      postId: newPost._id,
      likes: [],
    });
    const postComments = new Posts_Comments_Schema({
      _id: new ObjectId(),
      postId: newPost._id,
      comments: [],
    });
    const postSaves = new Posts_Saves_Schema({
      _id: new ObjectId(),
      postId: newPost._id,
      saves: [],
    });
    const postShares = new Posts_Shares_Schema({
      _id: new ObjectId(),
      postId: newPost._id,
      shares: [],
    });
    if (!newPost || !postLikes || !postComments || !postSaves || !postShares) {
      return {
        ...prevState,
        code: 500,
        error: "Oops! Post could not be uploaded. Please try again... (FSV1)",
      };
    }
    await newPost.save();
    await postLikes.save();
    await postComments.save();
    await postSaves.save();
    await postShares.save();
    return {
      ...prevState,
      code: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      ...prevState,
      code: 500,
      error: "Oops! Post could not be uploaded. Please try again...(FSU1)",
    };
  }
}
