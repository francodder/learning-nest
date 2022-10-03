import { Controller, Get, Param, Query, Response } from "@nestjs/common";

import * as express from "express";

import { UrlService } from "./url.service";

@Controller("")
export class UrlController {
  constructor(private urlService: UrlService) {}

  /* The order is important */

  @Get("url")
  createUrl(@Query("path") path: string) {
    console.log("entro");
    return this.urlService.createUrl(path);
  }

  @Get(":urlId")
  redirectTo(@Param("urlId") urlId: string, @Response() res: express.Response) {
    let path = "";
    const url = this.urlService.getUrl(urlId);
    if (typeof url === "string") path = url;
    else res.redirect("https://google.com.ar");
    res.redirect(path);
  }

  @Get("url/all")
  getAllUrls() {
    return this.urlService.getAll();
  }
}
