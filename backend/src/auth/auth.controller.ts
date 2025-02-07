import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(): Promise<void> {}

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req: Request, @Res() res: Response): void {
        if (!req.user) {
            res.status(401).json({ message: 'Authentication failed' });
            return;
        }
        
        const user = req.user as { token?: string };
        if (!user.token) {
            res.status(401).json({ message: 'Token not found' });
            return;
        }

        res.redirect(`http://localhost:3001/dashboard?token=${user.token}`);
    }
}
