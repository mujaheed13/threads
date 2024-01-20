import * as z from "zod";

export const ThreadValidation = z.object({
  thread: z
    .string()
    .nonempty()
    .min(3, { message: "Minimum 3 characters" }),
  name: z.string(),
});

export const CommentValidation = z.object({
  profile_photo: z
    .string()
    .nonempty()
    .min(3, { message: "Minimum 3 characters" }),
});
