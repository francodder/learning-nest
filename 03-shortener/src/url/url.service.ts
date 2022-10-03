import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { URL } from "./interfaces/url.interface";
import ShortUniqueId from "short-unique-id";
import { urlsMock as urlsMockRaw } from "./constants/urls.mock";

@Injectable()
export class UrlService {
  private urls: URL[] = [];
  private createId = new ShortUniqueId({ length: 6 });
  private domain = process.env.DOMAIN;

  constructor() {
    const urlsMock = this.initData(urlsMockRaw);
    this.urls = this.urls.concat(urlsMock);
  }

  initData(urls: URL[]): URL[] {
    return urls.map(url => {
      if (!url.shortPath) {
        url.shortPath = `${process.env.DOMAIN}/${url.id}`;
      }
      return url;
    });
  }

  createUrl(path: string) {
    if (typeof path !== "string" || !path.length) return new BadRequestException("The url provided is invalid");

    this.urls.push({
      id: this.createId(),
      path,
    });

    return `${this.domain}/${this.urls.at(-1).id}`;
  }

  getUrl(urlId: string) {
    // if (typeof urlId !== "string" || !urlId.length) return new BadRequestException("The url provided is invalid");
    console.log(urlId);
    const url = this.urls.find(url => url.id === urlId);

    // if (!url) return new NotFoundException("Url not founded");

    return url.path;
  }

  getAll() {
    return this.urls;
  }
}
