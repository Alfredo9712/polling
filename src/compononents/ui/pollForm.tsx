"use client";
import { Field, FieldArray, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import * as toxicity from "@tensorflow-models/toxicity";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { cn } from "@/utils";

const PollSchema = Yup.object().shape({
  title: Yup.string().required("title is required"),
  description: Yup.string().required("description is required"),
  pollOptions: Yup.array().of(
    Yup.object().shape({
      text: Yup.number().required(),
    })
  ),
});

export default function PollForm() {
  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        pollOptions: [],
      }}
      validationSchema={PollSchema}
      onSubmit={async (values) => {
        console.log(values);
      }}
      render={({ values, handleChange, handleBlur, errors, touched }) => {
        console.log(values);
        return (
          <Form>
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
                    {/* show this when user has removed all friends from the list */}
                    Add Poll Option
                  </button>
                  {values.pollOptions.map((poll, index) => (
                    <div key={index}>
                      <Field name={`pollOptions.${index}.text`} />
                      <button
                        type="button"
                        onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => arrayHelpers.insert(index, { text: "" })} // insert an empty string at a position
                      >
                        +
                      </button>
                    </div>
                  ))}

                  <div>
                    <button type="submit">Submit</button>
                  </div>
                </div>
              )}
            />
          </Form>
        );
      }}
    />
  );
}
