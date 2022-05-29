import { Controller, Get } from '@nestjs/common'

@Controller()
export class BaseController {
  @Get('health-check')
  healthCheck(): string {
    return 'Healthy!'
  }
}
