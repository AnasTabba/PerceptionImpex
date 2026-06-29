"use client";

import { useState } from "react";
import { ProgramCards } from "./ProgramCards";
import { CareersForm } from "./CareersForm";

export function CareersApply() {
  const [selectedProgram, setSelectedProgram] = useState("");

  function handleApply(programName: string) {
    setSelectedProgram(programName);
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <ProgramCards onApply={handleApply} />
      <CareersForm selectedProgram={selectedProgram} onProgramChange={setSelectedProgram} />
    </>
  );
}
