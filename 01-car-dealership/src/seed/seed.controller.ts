import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private seedService: SeedService) {}

  /* This controller offer mock data to populate DB */

  @Get()
  populateDB() {
    return this.seedService.populateDB();
  }
}

