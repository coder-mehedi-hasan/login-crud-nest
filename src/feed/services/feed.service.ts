import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedPostEntity } from '../model/post.entity';
import { Repository } from 'typeorm';
import { FeedPost } from '../model/post.interface';

@Injectable()
export class FeedService {
    constructor(
        @InjectRepository(FeedPostEntity)
        private readonly feedPostRepository: Repository<FeedPostEntity>
    ) { }

    createPost(feedPost: FeedPost) {
        return this.feedPostRepository.save(feedPost);
    }

    getAllFeed() {
        return this.feedPostRepository.find();
    }

    updatePost(id : number, feedPost:FeedPost){
        return this.feedPostRepository.update(id, feedPost)
    }

    deletePost(id : number){
        return this.feedPostRepository.delete(id);
    }
}
