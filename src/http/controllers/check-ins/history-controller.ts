import { FastifyReply, FastifyRequest } from "fastify";

import { z } from "zod";

import { makeFetchUserCheckInHistoryUseCase } from "@/use-cases/factories/make-fetch-user-check-in-history-use-case";

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = checkInHistoryQuerySchema.parse(request.query);

  const fetchUserCheckInsHistory = makeFetchUserCheckInHistoryUseCase();

  const { checkIns } = await fetchUserCheckInsHistory.execute({
    userId: request.user.sub,
    page,
  });

  return reply.status(200).send({
    checkIns,
  });
};