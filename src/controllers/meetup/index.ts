import type { Response } from 'express';

import {
  createMeetup,
  getMeetups,
  getMeetup,
  updateMeetup,
  deleteMeetup,
} from 'services/meetup-service';
import responseMessages from 'data/messages/response';
import type {
  IRequestBody,
  IRequestParams,
  IRequestQuery,
  IControllerResponse,
} from 'types/controllers';
import type {
  IMeetup,
  IMeetupForUpdate,
  IParamsId,
  IQueryGetMeetups,
} from 'types/meetups';

import type { IMeetupResponseBody, IMeetupsResponseBody } from './types';

const meetupController = {
  async createMeetup(
    req: IRequestBody<IMeetup>,
    res: Response<IMeetupResponseBody>
  ) {
    try {
      const meetup = await createMeetup(req.body);

      return res.status(201).json({ meetup });
    } catch (error) {
      return res.status(500).json({ message: responseMessages.unexpected });
    }
  },

  async getMeetups(
    req: IRequestQuery<IQueryGetMeetups>,
    res: Response<IMeetupsResponseBody>
  ) {
    try {
      const result = await getMeetups(req.query);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: responseMessages.unexpected });
    }
  },

  async getMeetup(
    req: IRequestParams<IParamsId>,
    res: Response<IMeetupResponseBody>
  ) {
    try {
      const meetup = await getMeetup(req.params.id);

      if (!meetup) {
        return res
          .status(404)
          .json({ message: responseMessages.meetupNotExist });
      }

      return res.status(200).json({ meetup });
    } catch (error) {
      return res.status(500).json({ message: responseMessages.unexpected });
    }
  },

  async updateMeetup(
    req: IRequestBody<IMeetupForUpdate>,
    res: Response<IMeetupResponseBody>
  ) {
    try {
      const meetup = await updateMeetup(req.body);

      if (!meetup) {
        return res
          .status(404)
          .json({ message: responseMessages.meetupNotExist });
      }

      return res.status(200).json({ meetup });
    } catch (error) {
      return res.status(500).json({ message: responseMessages.unexpected });
    }
  },

  async deleteMeetup(
    req: IRequestParams<IParamsId>,
    res: Response<IControllerResponse>
  ) {
    try {
      const meetup = deleteMeetup(req.params.id);

      if (!meetup) {
        return res
          .status(404)
          .json({ message: responseMessages.meetupNotExist });
      }

      return res.status(200).json({ message: responseMessages.meetupDeleted });
    } catch (error) {
      return res.status(500).json({ message: responseMessages.unexpected });
    }
  },
};

export default meetupController;