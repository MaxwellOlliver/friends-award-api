import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { ListRequest } from '../types/pagination';
import { awardService } from '../services/award-service';
import { awardMemberService } from '../services/award-member-service';
import { AwardMemberRole } from '@prisma/client';
import { Unauthorized } from '../errors/http-error';

type GetAwardsRequest = {
  Querystring: ListRequest & {
    isOwner?: string;
    q?: string;
  };
};

type GetAwardRequest = {
  Params: {
    id: string;
  };
};

type CreateAwardRequest = {
  Body: {
    name: string;
    description: string;
  };
};

type UpdateAwardRequest = CreateAwardRequest & {
  Params: {
    id: string;
  };
};

type DeleteAwardRequest = {
  Params: {
    id: string;
  };
};

export function awardController(fastify: FastifyInstance) {
  return {
    getAwards: async (
      req: FastifyRequest<GetAwardsRequest>,
      res: FastifyReply,
    ) => {
      const { sub } = req.user;
      const { limit, page, isOwner = 'false', q } = req.query;

      const awards = await awardService.getAwards(sub, isOwner === 'true', {
        limit,
        page,
        q,
      });

      return res.status(200).send(awards);
    },
    getAward: async (
      req: FastifyRequest<GetAwardRequest>,
      res: FastifyReply,
    ) => {
      const { id } = req.params;

      const award = await awardService.getAward(
        { id },
        {
          members: true,
        },
      );

      return res.status(200).send(award);
    },
    createAward: async (
      req: FastifyRequest<CreateAwardRequest>,
      res: FastifyReply,
    ) => {
      const { sub } = req.user;
      const { name, description } = req.body;

      const traceId = req.headers['x-trace-id'];

      fastify.log.info({
        msg: 'Creating award',
        trace: {
          id: traceId,
        },
      });

      const award = await awardService.createAward({
        name,
        description,
        createdBy: sub,
      });

      fastify.log.info({
        msg: 'Award created - Attaching award member',
        trace: {
          id: traceId,
        },
      });

      await awardMemberService.createAwardMember({
        awardId: award.id,
        userId: sub,
        role: AwardMemberRole.OWNER,
      });

      return res.status(201).send(award);
    },
    updateAward: async (
      req: FastifyRequest<UpdateAwardRequest>,
      res: FastifyReply,
    ) => {
      const { sub } = req.user;
      const { id } = req.params;
      const { name, description } = req.body;

      const traceId = req.headers['x-trace-id'];

      fastify.log.info({
        msg: `Updating award ${id}`,
        trace: {
          id: traceId,
        },
      });

      const award = await awardService.updateAward(id, sub, {
        name,
        description,
      });

      fastify.log.info({
        msg: `Award ${id} updated`,
        trace: {
          id: traceId,
        },
      });

      return res.status(200).send(award);
    },
    deleteAward: async (
      req: FastifyRequest<DeleteAwardRequest>,
      res: FastifyReply,
    ) => {
      const { sub } = req.user;
      const { id } = req.params;

      const traceId = req.headers['x-trace-id'];

      fastify.log.info({
        msg: `Deleting award ${id}`,
        trace: {
          id: traceId,
        },
      });

      const award = await awardService.getAward({ ownerId: sub, id });

      if (!award) {
        throw new Unauthorized(
          'You are not allowed to delete this award',
          'UNAUTHORIZED',
          {
            id,
          },
        );
      }

      await awardService.deleteAward(id);

      fastify.log.info({
        msg: `Award ${id} deleted`,
        trace: {
          id: traceId,
        },
      });

      return res.status(204).send();
    },
  };
}
