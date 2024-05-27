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
    accessKeyId: process.env.PORTFOLIO_AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.PORTFOLIO_AWS_SECRET_KEY as string,
  },
});

export const saveImageIfNeed = async (file: any): Promise<string> => {
  const fileName = file.name.replaceAll(" ", "_");
  if (!(await isImageExist(fileName))) {
    const blob = (await getImageAsBinary(file.file.url)) as Blob;
    uploadImage(fileName, blob);
  }
  console.log(imageUrlAtS3(fileName));
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

// src="https://prod-files-secure.s3.us-west-2.amazonaws.com/e3cb8d25-3251-4664-85b1-46c7b0943c35/76f18adf-d322-47a0-b7cb-5bfc5277bba0/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2024-05-24_232538.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240527%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240527T133341Z&X-Amz-Expires=3600&X-Amz-Signature=50e5a69adc9ab8f79bb9e361870853d790239cf34964ddbfdf3a988a5444dee1&X-Amz-SignedHeaders=host&x-id=GetObject"
