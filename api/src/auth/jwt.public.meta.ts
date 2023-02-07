import { SetMetadata } from '@nestjs/common';

export const IS_SKIPPING_JWT = 'isSkippingJwt';
export const SkipJwt = () => SetMetadata(IS_SKIPPING_JWT, true);
