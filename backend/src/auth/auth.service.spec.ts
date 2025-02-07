import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mockJwtToken'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate a JWT token', async () => {
    const user = { googleId: '12345', email: 'test@example.com', name: 'Test User' };
    const token = await service.generateJwt(user);

    expect(token).toBe('mockJwtToken');
    expect(jwtService.sign).toHaveBeenCalledWith({
      googleId: user.googleId,
      email: user.email,
      name: user.name,
    });
  });
});
