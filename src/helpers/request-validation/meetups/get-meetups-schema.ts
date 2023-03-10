import Joi, { CustomHelpers } from 'joi';

import {
  requestValidationMessages,
  JoiValidationsPatterns,
} from 'data/messages/request-validation';
import {
  themeLimits,
  descriptionLimits,
  venueLimits,
  filtersLimits,
  orderLimits,
  sortLimits,
  pageLimits,
  limitLimits,
} from 'data/request-validation/meetups-limits';
import { ISODateRegex } from 'data/constants/regex';
import type { IQueryGetMeetups } from 'types/meetups';

export const getMeetupsSchema = Joi.object<IQueryGetMeetups>({
  theme: Joi.string()
    .trim()
    .min(themeLimits.minLength)
    .max(themeLimits.maxLength),
  description: Joi.string()
    .trim()
    .min(descriptionLimits.minLength)
    .max(descriptionLimits.maxLength),
  time: Joi.string()
    .pattern(ISODateRegex)
    .messages({
      [JoiValidationsPatterns.stringPatternBase]:
        requestValidationMessages.invalidTime,
    }),
  venue: Joi.string()
    .trim()
    .min(venueLimits.minLength)
    .max(venueLimits.maxLength),
  filters: Joi.string()
    .trim()
    .min(filtersLimits.minLength)
    .max(filtersLimits.maxLength),
  order: Joi.string()
    .trim()
    .valid(...orderLimits.values),
  sort: Joi.string()
    .trim()
    .valid(...sortLimits.values),
  page: Joi.number()
    .integer()
    .greater(pageLimits.greater)
    .custom((value: number, helpers: CustomHelpers) => {
      if (!helpers.state.ancestors[0].limit) {
        return helpers.message({
          custom: requestValidationMessages.requiredLimitQuery,
        });
      }

      return value.toString();
    })
    .required(),
  limit: Joi.number()
    .integer()
    .greater(limitLimits.greater)
    .custom((value: number, helpers: CustomHelpers) => {
      if (!helpers.state.ancestors[0].page) {
        return helpers.message({
          custom: requestValidationMessages.requiredPageQuery,
        });
      }

      return value.toString();
    })
    .required(),
});
