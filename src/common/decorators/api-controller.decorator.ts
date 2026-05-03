import {
  applyDecorators,
  Controller,
  ControllerOptions,
  // UseGuards,
} from '@nestjs/common';
import { ApiCookieAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { pascalCase } from 'change-case';
// import { CheckLoginGuard } from '../../modules/auth/guards/check-login.guard';
// import { CheckPasswordGuard } from '../../modules/auth/guards/check-password.guard';
// import { CheckActiveGuard } from '../../modules/auth/guards/check-active.guard';

export const ApiController = ({
  options,
  tags,
  auth,
}: {
  options?: ControllerOptions | string;
  tags?: string[] | string;
  auth?: boolean;
}) => {
  let ctags: string[] = [];
  if (tags) {
    ctags = typeof tags === 'string' ? [tags] : tags;
  } else if (options) {
    if (typeof options === 'string') {
      ctags = [pascalCase(options)];
    } else if (options.path && typeof options.path === 'string') {
      ctags = [pascalCase(options.path)];
    }
  }

  //   const version = process.env.APP_VERSION.split('.').shift();
  //   const enableVersion = process.env.APP_ENABLE_VERSION;
  let controller;
  if (options) {
    controller =
      typeof options === 'string'
        ? Controller({ path: options })
        : Controller(options);
  } else {
    controller = Controller();
  }

  const decorators: ClassDecorator[] = [ApiHeader({ name: 'Accept-Language' })];
  if (auth) {
    decorators.push(
      ApiCookieAuth(),
      //UseGuards(CheckLoginGuard, CheckPasswordGuard, CheckActiveGuard),
    );
  }
  decorators.push(ApiTags(...ctags), controller);
  return applyDecorators(...decorators);
};
