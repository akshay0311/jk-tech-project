import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PostDto } from './dto/post.dto';

describe('PostsService', () => {
  let service: PostsService;
  let repository: Repository<Post>;

  const mockPost: Post = { id: 1, title: 'Test Title', content: 'Test Content', author: 'Akshay' };

  const mockRepository = {
    find: jest.fn().mockResolvedValue([mockPost]),
    findOne: jest.fn().mockResolvedValue(mockPost),
    create: jest.fn().mockImplementation((dto) => ({ id: Date.now(), ...dto })),
    save: jest.fn().mockImplementation((post) => Promise.resolve({ ...post, id: 1 })),
    update: jest.fn().mockResolvedValue({ affected: 1 }),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(Post),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    repository = module.get<Repository<Post>>(getRepositoryToken(Post));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all posts', async () => {
    const posts = await service.findAll();
    expect(posts).toEqual([mockPost]);
    expect(repository.find).toHaveBeenCalledTimes(1);
  });

  it('should return a single post by id', async () => {
    const post = await service.findOne(1);
    expect(post).toEqual(mockPost);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should create a post', async () => {
    const postDto: PostDto = { title: 'New Post', content: 'New Content', author:'Akshay'};
    const newPost = await service.create(postDto);

    expect(newPost).toHaveProperty('id');
    expect(newPost.title).toBe('New Post');
    expect(newPost.content).toBe('New Content');
    expect(repository.create).toHaveBeenCalledWith(expect.objectContaining(postDto));
    expect(repository.save).toHaveBeenCalledWith(expect.objectContaining(postDto));
  });

  it('should update a post', async () => {
    const postDto: PostDto = { title: 'Updated Post', content: 'Updated Content', author:'Akshay' };
    jest.spyOn(service, 'findOne').mockResolvedValue({ id: 1, ...postDto });

    const updatedPost = await service.update(1, postDto);

    expect(updatedPost).toEqual({ id: 1, ...postDto });
    expect(repository.update).toHaveBeenCalledWith(1, postDto);
  });

  it('should remove a post', async () => {
    await service.remove(1);
    expect(repository.delete).toHaveBeenCalledWith(1);
  });
});
