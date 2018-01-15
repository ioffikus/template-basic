const normalizePictures = (pictures: Alicanto.Models.Picture[]) => {
  const result: Alicanto.Models.Picture[] = [];
  if (pictures) {
    pictures.forEach(picture => {
      if (picture.is_main) {
        result.unshift(picture);
      } else {
        result.push(picture);
      }
    });
  }
  return result;
};

export default normalizePictures;
