/* Express esta inyectado globalmente en Nest */

/* TODO: Personalizar la excepcion con el error especifico */
export const fileFilter = (req: Express.Request, file: Express.Multer.File, callback: Function) => {
  if (!file) return callback(new Error("File is empty"), false);

  const acceptedExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
  const fileExtension = file?.mimetype?.split("/")[1];

  if (!acceptedExtensions.includes(fileExtension)) {
    return callback("File type is not accepted");
  }

  return callback(null, true);
};
