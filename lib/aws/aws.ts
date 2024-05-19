import {
  ListObjectsCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { Blob } from "buffer";

export const client = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_SECRET_KEY as string,
  },
});

export const saveImageIfNeed = async (file: any): Promise<string> => {
  const fileName = file.name.replaceAll(" ", "_");
  if (!(await isImageExist(fileName))) {
    const blob = (await getImageAsBinary(file.file.url)) as Blob;
    uploadImage(fileName, blob);
  }
  return imageUrlAtS3(fileName);
};

const getImageAsBinary = async (temporaryUrl: string) => {
  try {
    const blob = await fetch(temporaryUrl).then((r) => r.blob());
    return blob;
  } catch (error) {
    console.error(error);
  }
};

export const uploadImage = async (fileName: string, blob: Blob) => {
  try {
    const buffer = (await blob.arrayBuffer()) as Uint8Array;
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME as string,
      Key: fileName,
      Body: buffer,
      ContentType: blob.type,
    };
    await client.send(new PutObjectCommand(params));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const isImageExist = async (fileName: string) => {
  const result = await client.send(
    new ListObjectsCommand({
      Bucket: process.env.AWS_BUCKET_NAME as string,
      Prefix: fileName,
    })
  );
  return result.Contents?.length ? true : false;
};

const imageUrlAtS3 = (keyName: string) => {
  const hostName = "s3.ap-southeast-2.amazonaws.com";
  return (
    "https://" + process.env.AWS_BUCKET_NAME + "." + hostName + "/" + keyName
  );
};
