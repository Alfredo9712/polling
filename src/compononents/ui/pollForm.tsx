"use client";
import { Field, FieldArray, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import * as toxicity from "@tensorflow-models/toxicity";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { cn } from "@/utils";
import { Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPoll } from "@/utils/apis";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { Checkbox } from "./checkbox";

const PollSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  isPublic: Yup.boolean(),
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
  const queryClient = useQueryClient();

  const pollMutation = useMutation({
    mutationFn: createPoll,
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast(error.response?.data);
      }
      toast("Something went wrong, please try again later");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["polls"] });
      toast("Poll created successfully");
    },
  });

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        pollOptions: [],
        isPublic: false,
      }}
      validateOnMount
      validationSchema={PollSchema}
      onSubmit={async (values, { resetForm }) => {
        const { pollOptions, title, description, isPublic } = values;
        const titleAndDescription = [title, description];
        console.log(titleAndDescription);
        const threshold = 0.9;

        const model = await toxicity.load(threshold, ["insult", "toxicity"]);

        const predictions = await model.classify(titleAndDescription);
        const isInnappropriate = !!predictions.find((label) =>
          label.results.find((result) => result.match === true)
        );
        if (isInnappropriate) {
          toast("Cannot create poll with innappropriate content");
          return;
        }
        pollMutation.mutate({ title, description, pollOptions, isPublic });
        resetForm();
      }}
    >
      {({ values, handleChange, handleBlur, errors, touched, isValid }) => {
        return (
          <Form className="flex flex-col gap-5 max-w-lg">
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
              {touched.title && errors.title ? (
                <div className="text-sm text-slate-500 pt-1">
                  {errors.title}
                </div>
              ) : null}
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
                <div className="text-sm text-slate-500 pt-1">
                  {errors.description}
                </div>
              ) : null}
            </div>
            <FieldArray
              name="pollOptions"
              render={(arrayHelpers) => (
                <div className="flex flex-col gap-3 items-start s">
                  <div className="flex flex-col gap-2">
                    {values.pollOptions.map((poll, index) => (
                      <div key={index} className="flex gap-2">
                        <Field name={`pollOptions.${index}.text`} as={Input} />
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          <Trash />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    className=""
                    onClick={() => arrayHelpers.push({ text: "" })}
                  >
                    Add Poll Option
                  </button>
                </div>
              )}
            />
            <div className="flex items-center space-x-2">
              <label>
                <Field type="checkbox" name="isPublic" id="isPublic" />
                <span className="ml-2">Make Poll Public</span>
              </label>
            </div>
            <div>
              <Button type="submit" disabled={!isValid}>
                Submit
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
