/** Returns the thumbnail image key if exist or defaults to normal image */
export const getThumbnail = (obj) => {
    return obj.img_thumb_url ? obj.img_thumb_url : obj.img_url;
}
