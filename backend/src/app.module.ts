import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LeadersModule } from './leaders/leaders.module';
import { FeedbackModule } from './feedback/feedback.module';
import { PageContentModule } from './page-content/page-content.module';
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './news/news.module';
import { BusinessesModule } from './businesses/businesses.module';
import { JobsModule } from './jobs/jobs.module';
import { EventsModule } from './events/events.module';
import { AnnouncementsModule } from './announcements/announcements.module';
import { GalleryModule } from './gallery/gallery.module';

@Module({
  imports: [
    LeadersModule,
    FeedbackModule,
    PageContentModule,
    AuthModule,
    NewsModule,
    BusinessesModule,
    JobsModule,
    EventsModule,
    AnnouncementsModule,
    GalleryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
