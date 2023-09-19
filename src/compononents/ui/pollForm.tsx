"use client";
import { Field, FieldArray, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import * as toxicity from "@tensorflow-models/toxicity";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { cn } from "@/utils";
import { DeleteIcon } from "lucide-react";

const PollSchema = Yup.object().shape({
  title: Yup.string().required("title is required"),
  description: Yup.string().required("description is required"),
  pollOptions: Yup.array()
    .of(
      Yup.object().shape({
        text: Yup.string().required(),
      })
    )
    .min(2, "Minimum of 2 poll options")
    .max(10, "Maximum of 6 poll options"),
});

export default function PollForm() {
  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        pollOptions: [],
      }}
      validateOnMount
      validationSchema={PollSchema}
      onSubmit={async (values) => {
        const { pollOptions, title, description } = values;
        const titleAndDescription = [title, description];
        console.log(titleAndDescription);
        const threshold = 0.9;

        const model = await toxicity.load(threshold, ["insult", "toxicity"]);

        const predictions = await model.classify(titleAndDescription);
        const isInnappropriate = !!predictions.find((label) =>
          label.results.find((result) => result.match === true)
        );
        console.log(isInnappropriate);
      }}
      render={({
        values,
        handleChange,
        handleBlur,
        errors,
        touched,
        isValid,
      }) => {
        return (
          <Form className="flex flex-col gap-5">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                className={cn(
                  "mt-1",
                  touched.title && errors.title && "border-red-500"
                )}
              />
              {touched.title && errors.title ? <div>{errors.title}</div> : null}
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                className={cn(
                  "mt-1",
                  touched.description && errors.description && "border-red-500"
                )}
              />
              {touched.description && errors.description ? (
                <div>{errors.description}</div>
              ) : null}
            </div>

            <FieldArray
              name="pollOptions"
              render={(arrayHelpers) => (
                <div>
                  <button
                    type="button"
                    onClick={() => arrayHelpers.push({ text: "" })}
                  >
                    Add Poll Option
                  </button>
                  {values.pollOptions.map((poll, index) => (
                    <div key={index} className="flex gap-2">
                      <Field name={`pollOptions.${index}.text`} as={Input} />
                      <button
                        type="button"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            />
            <div>
              <Button type="submit" disabled={!isValid}>
                Submit
              </Button>
            </div>
          </Form>
        );
      }}
    />
  );
}
