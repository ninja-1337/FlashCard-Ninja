import { router, publicProcedure, protectedProcedure } from "../trpc";
import { prisma } from "../../db/client";
import { connect } from "tls";
import { object, string } from "zod";
import { z } from "zod";
export type Message = {
  who: "bot" | "user" | undefined;
  message?: string;
};
function validateArray(input: any): any {
  console.log("validateArray called with iput", input);
  return false;
}
type Value = {
  value1: string;
  value2: string;
};

function validateSingleValue(input: Value): any {
  console.log("validateSingleValue called with iput", input);
  return false;
}

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "Content just for authenticated Users";
  }),


  getFlashCards: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.flashCards.findMany({

    });
  }),

  getFlashCardById: publicProcedure
  .input(z.object({ text: z.string().nullish() }).nullish())
  .query(({ ctx,input}) => {
    return ctx.prisma.flashCards.findUnique({
      where: {
        id:input?.text+""
      },
    });
  }),
  getUserMessages: protectedProcedure
  .input(z.object({ text: z.string().nullish() }).nullish())
  .query(({ ctx }) => {
    return ctx.prisma.message.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        sent_by: true, // Return all fields
      },
    });
  }),
  

  getUserDiscoverable: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
  }),

  add: protectedProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const post = await prisma.guestbook.create({
        data: {
          email: "" + ctx.session?.user?.email,
          body: input.text,
          userId: ctx.session?.user.id,
        },
      });
    }),

    NewFlashCard: publicProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
       return  await prisma.flashCards.create({
      data:{Name:"Name Here",
      Description:"Description Here",
      Answer:"Answer Here",
      frequency:"NaN",
      Group:"NaN",
      points:"NaN",
      Type:"NaN",
      }
      });
    }),
    DeleteFlashCard: publicProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
       return  await prisma.flashCards.delete({
        where: {
          id: input.text.toString(),
        },
      });
    }),
   
    updateFlashCard: publicProcedure
    .input(
      z.object({
        id: z.string(),
        Name: z.string(),
        Type: z.string(),
        Group: z.string(),
        Description: z.string(),
        Answer: z.string(),
        Frequency: z.string(),
      
    
      })
    )
    .mutation(async ({ ctx, input }) => {
      const recordId = input.id.toString();

      try {
        const existingRecord = await prisma.flashCards.findUnique({
          where: { id: recordId },
        });
      
        if (!existingRecord) {
          // Handle the case when the record is not found
          console.log(`Record with ID ${recordId} not found.`);
          return; // Or you can perform any other desired action
        }
      
        const updatedParalaves = await prisma.flashCards.update({
          where: { id: recordId },
          data: {
            Name: input.Name,
            Type: input.Type,
            Group: input.Group,
            Description: input.Description,
            Answer: input.Answer,
            frequency: input.Frequency,
           
          },
        });
      
        console.log(updatedParalaves);
      } catch (error) {
        // Handle the error silently
        console.error("An error occurred while updating the record:", error);
      }
      
    }),
  messageMe: protectedProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await prisma.message.create({
        data: {
          email: "" + ctx.session?.user?.email,
          body: input.text,
          userId: ctx.session?.user.id,
        },
      });
    }),

  updateDiscoverable: protectedProcedure
    .input(z.boolean())
    .mutation(async ({ ctx, input }) => {
      const post = await prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: { discoverable: input },
      });
    }),
});
