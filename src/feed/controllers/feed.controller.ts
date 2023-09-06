import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FeedService } from '../services/feed.service';
import { FeedPost } from '../model/post.interface';

@Controller('feed')
export class FeedController {
    constructor(private feedService: FeedService) { }
    @Post()
    create(@Body() feedPost: FeedPost) {
        return this.feedService.createPost(feedPost);
    }

    @Get()
    getAllFeed() {
        return this.feedService.getAllFeed();
    }

    @Put(':id')
    updatePost(
        @Param('id') id: number,
        @Body() feedPost: FeedPost
    ) {
        return this.feedService.updatePost(id, feedPost)
    }

    @Delete(':id')
    deletePost(@Param('id') id : number){
        return this.feedService.deletePost(id);
    }
}
