import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, BadRequestException } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import { FilesService } from "./files.service";
import { fileFilter } from "./helpers/fileFilter";

@Controller("files")
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  /* Idealmente no queremos que los archivos esten almacenados en el mismo servidor de la aplicacion
     por cuestiones de seguridad, ya que podrian estar inyectando malware a traves de estos archivos */

  @Post("product")
  @UseInterceptors(FileInterceptor("image", { fileFilter })) // 'image' es el nombre del campo que envio en mi peticion
  uploadProductImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) return new BadRequestException("File is empty or file type is incorrect");
    return file;
  }
}
