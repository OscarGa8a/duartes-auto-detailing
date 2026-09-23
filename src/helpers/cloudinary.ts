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

export interface PageHeroImages {
  mobile: string;
  desktop?: string;
}

export const getPageHeroImageUrls = (backgroundImage: PageHeroImages) => {
  const mobile = getCloudinaryImageUrl(
    backgroundImage.mobile,
    'f_auto,q_auto:good,w_560,c_fill,g_auto'
  );
  const tablet = getCloudinaryImageUrl(
    backgroundImage.mobile,
    'f_auto,q_auto,w_1024,c_fill,g_auto'
  );
  const desktop = getCloudinaryImageUrl(
    backgroundImage.desktop ?? backgroundImage.mobile,
    'f_auto,q_auto,w_1920,c_fill,g_auto'
  );

  return { mobile, tablet, desktop };
};
