import { Injectable } from '@nestjs/common';
import { PostDto } from './dto/post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async findOne(id: number): Promise<Post> {
    return this.postRepository.findOne({ where: { id } });
  }

  async create(postDto: PostDto): Promise<Post> {
    const newPost = this.postRepository.create({ id: Date.now(), ...postDto });
    return await this.postRepository.save(newPost);
  }

  async update(id: number, postDto : PostDto): Promise<Post> {
    await this.postRepository.update(id, {...postDto });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }
}