import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    async generateJwt(user: any): Promise<string> {
        const payload = { googleId: user.googleId, email: user.email, name: user.name };
        return this.jwtService.sign(payload);
    }
}
