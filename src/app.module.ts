import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './conf/configuration.module';
import { ConfigMainDBService } from './conf/configuration.service';
import { SchoolModule } from './modules/school/school.module';

@Module({
  imports: [
    /** Main Database */
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [ConfigMainDBService],
      useFactory: (configService: ConfigMainDBService) => {
        return configService.getMainDBConfig();
      },
    }),
    AppConfigModule,
    SchoolModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
