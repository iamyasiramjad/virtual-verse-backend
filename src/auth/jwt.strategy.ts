// src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      // Tell passport how to find the JWT: from the Authorization header as a Bearer token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // We must not ignore expiration, for security
      ignoreExpiration: false,
      // The secret used to sign the tokens
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  /**
   * This `validate` method runs AFTER the JWT has been successfully verified.
   * The payload that we created in the auth.service is passed as the argument.
   * Whatever is returned from this method will be attached to the Request object as `req.user`.
   */
  async validate(payload: { sub: number; email: string }) {
    // We can use the user ID from the token to ensure the user still exists
    const user = await this.prisma.admin.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
      // This will never happen if the user cannot be deleted, but it's good practice
      throw new UnauthorizedException('User no longer exists.');
    }

    // We don't need to return the password hash
    delete user.passwordHash;
    return user;
  }
}
