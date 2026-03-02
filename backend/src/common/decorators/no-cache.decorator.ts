import { SetMetadata } from '@nestjs/common';
import { NO_CACHE_METADATA } from '@shared/constants';

export const NoCache = () => {
  return SetMetadata(NO_CACHE_METADATA, true);
};
