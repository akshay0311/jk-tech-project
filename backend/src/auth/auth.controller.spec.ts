import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

describe('AuthController', () => {
  let controller: AuthController;

  const mockResponse = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.redirect = jest.fn();
    return res as Response;
  };

  const mockAuthGuard = {
    canActivate: jest.fn((context: ExecutionContext) => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    })
      .overrideGuard(AuthGuard('google'))
      .useValue(mockAuthGuard)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call googleAuth without errors', async () => {
    await expect(controller.googleAuth()).resolves.toBeUndefined();
  });

  it('should redirect to dashboard on successful authentication', () => {
    const mockReq = { user: { token: 'mockJwtToken' } } as Partial<Request> as Request;

    const mockRes = mockResponse();

    controller.googleAuthRedirect(mockReq, mockRes);

    expect(mockRes.redirect).toHaveBeenCalledWith('http://localhost:3001/dashboard?token=mockJwtToken');
  });

  it('should return 401 if user is not authenticated', () => {
    const mockReq = {} as Request;
    const mockRes = mockResponse();

    controller.googleAuthRedirect(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Authentication failed' });
  });

  it('should return 401 if token is missing', () => {
    const mockReq = { user: {} } as Request;
    const mockRes = mockResponse();

    controller.googleAuthRedirect(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Token not found' });
  });
});
