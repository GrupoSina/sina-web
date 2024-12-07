import { differenceInYears, isFuture } from "date-fns";
import * as yup from "yup";

export const schemaNewProject = yup
  .object({
    name: yup.string().required("Campo Email é obrigatório."),
    deadline: yup
      .date()
      .transform((value, originalValue) => {
        return originalValue === "" ? null : value;
      })
      .optional()
      .test("is-future", "Data deve ser futura.", (value) => {
        if (value) return isFuture(value);
      }),
    budget: yup
      .number()
      .transform((value, originalValue) =>
        originalValue.trim() === "" ? null : value,
      )
      .typeError("Campo Orçamento deve ser um número.")
      .min(1, "O valor deve ser maior que 0.")
      .required("Campo Orçamento obrigatório."),

    customer: yup.string().required("Campo Cliente é obrigatório."),
  })
  .required();

export const schemaNewProjectUpdate = yup
  .object({
    description: yup.string().required("Campo Descrição é obrigatório."),
  })
  .required();
