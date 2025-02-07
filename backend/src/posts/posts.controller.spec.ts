import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostDto } from './dto/post.dto';
import { Post as PostEntity } from './post.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ExecutionContext } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostsService;

  const mockPost: PostEntity = { id: 1, title: 'Test Title', content: 'Test Content',author:'Akshay' };

  const mockPostsService = {
    findAll: jest.fn().mockResolvedValue([mockPost]),
    findOne: jest.fn().mockResolvedValue(mockPost),
    create: jest.fn().mockImplementation((postDto) => Promise.resolve({ id: 1, ...postDto })),
    update: jest.fn().mockImplementation((id, postDto) => Promise.resolve({ id, ...postDto })),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  const mockJwtAuthGuard = {
    canActivate: jest.fn().mockImplementation((context: ExecutionContext) => {
      return true; // Simulates authentication success
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        {
          provide: PostsService,
          useValue: mockPostsService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtAuthGuard)
      .compile();

    controller = module.get<PostsController>(PostsController);
    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all posts', async () => {
    const posts = await controller.findAll();
    expect(posts).toEqual([mockPost]);
    expect(service.findAll).toHaveBeenCalledTimes(1);
  });

  it('should return a single post by id', async () => {
    const post = await controller.findOne(1);
    expect(post).toEqual(mockPost);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should create a post', async () => {
    const postDto: PostDto = { title: 'New Post', content: 'New Content',author:'Akshay' };
    const newPost = await controller.create(postDto);

    expect(newPost).toHaveProperty('id', 1);
    expect(newPost.title).toBe('New Post');
    expect(newPost.content).toBe('New Content');
    expect(service.create).toHaveBeenCalledWith(postDto);
  });

  it('should update a post', async () => {
    const postDto: PostDto = { title: 'Updated Post', content: 'Updated Content', author:'Akshay' };
    const updatedPost = await controller.update(1, postDto);

    expect(updatedPost).toEqual({ id: 1, ...postDto });
    expect(service.update).toHaveBeenCalledWith(1, postDto);
  });

  it('should remove a post', async () => {
    await controller.remove(1);
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
