"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as toxicity from "@tensorflow-models/toxicity";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { cn } from "@/utils";

export default function PollForm() {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: async (values) => {
      const text = "test";
      const testToxicitySentences = [text];

      const threshold = 0.9;

      const model = await toxicity.load(threshold, ["insult", "toxicity"]);

      const predictions = await model.classify(testToxicitySentences);
      const isInnappropriate = !!predictions.find((label) =>
        label.results.find((result) => result.match === true)
      );
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Label htmlFor="firstName">First Name</Label>
      <Input
        id="firstName"
        name="firstName"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.firstName}
        className={cn(
          "mt-1",
          formik.touched.firstName &&
            formik.errors.firstName &&
            "border-red-500"
        )}
      />
      {formik.touched.firstName && formik.errors.firstName ? (
        <div>{formik.errors.firstName}</div>
      ) : null}

      <Label htmlFor="lastName">Last Name</Label>
      <Input
        id="lastName"
        name="lastName"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.lastName}
        className={cn(
          "mt-1",
          formik.touched.lastName && formik.errors.lastName && "border-red-500"
        )}
      />
      {formik.touched.lastName && formik.errors.lastName ? (
        <div>{formik.errors.lastName}</div>
      ) : null}

      <Label htmlFor="email">Email Address</Label>
      <Input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        className={cn(
          "mt-1",
          formik.touched.email && formik.errors.email && "border-red-500"
        )}
      />
      {formik.touched.email && formik.errors.email ? (
        <div>{formik.errors.email}</div>
      ) : null}

      <Button type="submit">Submit</Button>
    </form>
  );
}
