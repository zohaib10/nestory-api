"use client";

import { setPerson, setTree } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { NewTree } from "../Tree";
import { AddPerson } from "./AddPerson";

const steps = [
  { title: "Create a Tree" },
  { title: "Add a Person" },
  { title: "You're Ready!" },
];

type SampleTreeState = {
  tree?: {
    title: string;
  };
  person?: {
    firstName: string;
    lastName: string;
    gender: "male" | "female";
    birth_date?: string;
  };
};

export const SampleTreeStepper = () => {
  const router = useRouter();
  const [state, setState] = useState<SampleTreeState>({});

  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handleSaveSampleTree = () => {
    setTree(state.tree);
    setPerson(state.person);
    router.push("/sample/tree");
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 md:p-4">
      <ul className="steps steps-horizontal w-full mb-8">
        {steps.map((step, index) => (
          <li
            key={index}
            className={`step ${index < currentStep ? "step-primary" : ""} ${
              index === currentStep ? "step-primary" : ""
            }`}
          >
            {step.title}
          </li>
        ))}
      </ul>
      <div className="bg-base-100 border border-base-300 rounded p-6 shadow-md">
        <button
          className="btn btn-circle"
          onClick={prevStep}
          disabled={currentStep === 0}
        >
          <Image src={"/back.png"} alt="back" width={30} height={30} />
        </button>
        {currentStep === 0 && (
          <NewTree
            tree={state.tree}
            onSubmit={(d) => {
              setState({
                ...state,
                tree: d,
              });
              nextStep();
            }}
          />
        )}
        {currentStep === 1 && (
          <AddPerson
            person={state.person}
            onSubmit={(d) => {
              setState({
                ...state,
                person: d,
              });
              nextStep();
            }}
          />
        )}
        {currentStep === 2 && (
          <div className="flex flex-col items-center md:p-6 w-full max-w-md mx-auto text-center">
            <Image
              src={"/celebrate.png"}
              alt="celebrate"
              width={200}
              height={200}
              className="ml-12"
            />
            <h2 className="text-2xl font-semibold">All set!</h2>
            <p className="text-lg text-gray-600">
              {`You're ready to start building your tree.`}
            </p>
            <button
              onClick={handleSaveSampleTree}
              className="btn btn-primary w-full mt-6"
            >
              Finish
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
