import { PUBLIC_CLOUDINARY_CLOUD_NAME } from "astro:env/client";

const cloudName = PUBLIC_CLOUDINARY_CLOUD_NAME;

const isExternalOrLocalPath = (value: string) =>
  value.startsWith("/") ||
  value.startsWith("http://") ||
  value.startsWith("https://");

const encodeCloudinaryPublicId = (publicId: string) =>
  publicId
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

export const getCloudinaryImageUrl = (
  value: string,
  transformations = "f_auto,q_auto",
) => {
  if (!value) return "";
  if (isExternalOrLocalPath(value)) return value;
  if (!cloudName) return value;
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${encodeCloudinaryPublicId(value)}`;
};

export const getCloudinaryVideoUrl = (
  value: string | undefined,
  transformations = "f_auto,q_auto",
) => {
  if (!value) return "";
  if (isExternalOrLocalPath(value)) return value;
  if (!cloudName) return value;
  return `https://res.cloudinary.com/${cloudName}/video/upload/${transformations}/${encodeCloudinaryPublicId(value)}`;
};
