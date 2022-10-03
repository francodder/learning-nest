import { Module } from "@nestjs/common";
import { UrlModule } from "./url/url.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    UrlModule,
    ConfigModule.forRoot({
      /* Options. More info: https://docs.nestjs.com/techniques/configuration */
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
