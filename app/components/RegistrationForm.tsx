"use client";

import { useState } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  studentId: string;
  email: string;
  phone: string;
  fieldOfStudy: string;
  faculty: string;
  academicLevel: string;
  selectedTeam: string;
  experienceLevel: string;
  motivation: string;
  expectation: string;
  portfolio: string;
  github: string;
}

const RegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    studentId: "",
    email: "",
    phone: "",
    fieldOfStudy: "",
    faculty: "",
    academicLevel: "",
    selectedTeam: "",
    experienceLevel: "",
    motivation: "",
    expectation: "",
    portfolio: "",
    github: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTeamSelect = (team: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedTeam: team,
    }));
  };

  const handleExperienceSelect = (level: string) => {
    setFormData((prev) => ({
      ...prev,
      experienceLevel: level,
    }));
  };

  const handleNext = () => {
    if (currentStep === 1) {
      // Validate step 1 fields
      if (
        formData.firstName &&
        formData.lastName &&
        formData.studentId &&
        formData.email &&
        formData.phone &&
        formData.fieldOfStudy &&
        formData.academicLevel
      ) {
        setCurrentStep(2);
      } else {
        alert("Please fill in all required fields");
      }
    } else if (currentStep === 2) {
      // Validate step 2 fields
      if (
        formData.selectedTeam &&
        formData.experienceLevel &&
        formData.motivation
      ) {
        setCurrentStep(3);
      } else {
        alert("Please fill in all required fields");
      }
    }
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    if (
      formData.selectedTeam &&
      formData.experienceLevel &&
      formData.motivation
    ) {
      console.log("Form submitted:", formData);
      // Handle form submission here
    } else {
      alert("Please complete all fields in step 2");
    }
  };

  return (
    <div className="relative w-full">
      <div className="w-full flex justify-center form-overlay">
        <div className="relative p-10 form-container w-[98%] md:w-[800px]">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-8 p-10"
            id="registration-form"
          >
            {/* Header with glasses icon */}
            <div className="flex flex-col items-center mb-8">
              <img
                src="/glasses.svg"
                alt="Glasses Icon"
                className="w-24 h-24"
              />
              <div className="text-4xl md:text-5xl lg:text-6xl magic-school text-[#2F3729] text-center">
                <h2 className="text-5xl magic-school text-[#2F3729] text-center">
                  {currentStep === 1
                    ? "1. Personal Information"
                    : currentStep === 2
                      ? "2. Team Selection"
                      : "3. Last One"}
                </h2>
              </div>
            </div>

            {currentStep === 1 && (
              <>
                {/* First Name */}
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="firstName"
                    className="text-2xl md:text-3xl magic-school text-[#2F3729] flex-shrink-0"
                  >
                    First Name* :
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="........................"
                    className="flex-1 bg-transparent border-none min-w-0 max-w-full overflow-hidden text-ellipsis whitespace-nowrap outline-none text-2xl magic-school text-[#2F3729] placeholder-[#8B7355]"
                    style={{
                      caretColor: "#2F3729",
                    }}
                  />
                </div>

                {/* Last Name */}
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="lastName"
                    className="text-2xl md:text-3xl magic-school text-[#2F3729] flex-shrink-0"
                  >
                    Last Name* :
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    placeholder="........................"
                    className="flex-1 bg-transparent border-none min-w-0 max-w-full overflow-hidden text-ellipsis whitespace-nowrap outline-none text-2xl magic-school text-[#2F3729] placeholder-[#8B7355]"
                    style={{
                      caretColor: "#2F3729",
                    }}
                  />
                </div>

                {/* Student ID Number */}
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="studentId"
                    className="text-2xl md:text-3xl magic-school text-[#2F3729] flex-shrink-0"
                  >
                    Student ID Number* :
                  </label>
                  <input
                    type="text"
                    id="studentId"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    required
                    placeholder="........................"
                    className="flex-1 bg-transparent border-none min-w-0 max-w-full overflow-hidden text-ellipsis whitespace-nowrap outline-none text-2xl magic-school text-[#2F3729] placeholder-[#8B7355]"
                    style={{
                      caretColor: "#2F3729",
                    }}
                  />
                </div>

                {/* Email */}
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="email"
                    className="text-2xl md:text-3xl magic-school text-[#2F3729] flex-shrink-0"
                  >
                    Email* :
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="........................"
                    className="flex-1 bg-transparent border-none min-w-0 max-w-full overflow-hidden text-ellipsis whitespace-nowrap outline-none text-2xl magic-school text-[#2F3729] placeholder-[#8B7355]"
                    style={{
                      caretColor: "#2F3729",
                    }}
                  />
                </div>

                {/* Phone Number */}
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="phone"
                    className="text-2xl md:text-3xl magic-school text-[#2F3729] flex-shrink-0"
                  >
                    Phone Number* :
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="........................"
                    className="flex-1 bg-transparent border-none min-w-0 max-w-full overflow-hidden text-ellipsis whitespace-nowrap outline-none text-2xl magic-school text-[#2F3729] placeholder-[#8B7355]"
                    style={{
                      caretColor: "#2F3729",
                    }}
                  />
                </div>

                {/* Field of Study */}
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="fieldOfStudy"
                    className="text-2xl md:text-3xl magic-school text-[#2F3729] flex-shrink-0"
                  >
                    Field Of Study* :
                  </label>
                  <input
                    type="text"
                    id="fieldOfStudy"
                    name="fieldOfStudy"
                    value={formData.fieldOfStudy}
                    onChange={handleChange}
                    required
                    placeholder="........................"
                    className="flex-1 bg-transparent border-none min-w-0 max-w-full overflow-hidden text-ellipsis whitespace-nowrap outline-none text-2xl magic-school text-[#2F3729] placeholder-[#8B7355]"
                    style={{
                      caretColor: "#2F3729",
                    }}
                  />
                </div>

                {/* Faculty / House */}
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="faculty"
                    className="text-2xl md:text-3xl magic-school text-[#2F3729] flex-shrink-0"
                  >
                    Faculty :
                  </label>
                  <input
                    type="text"
                    id="faculty"
                    name="faculty"
                    value={formData.faculty}
                    onChange={handleChange}
                    placeholder="........................"
                    className="flex-1 bg-transparent border-none min-w-0 max-w-full overflow-hidden text-ellipsis whitespace-nowrap outline-none text-2xl magic-school text-[#2F3729] placeholder-[#8B7355]"
                    style={{
                      caretColor: "#2F3729",
                    }}
                  />
                </div>

                {/* Academic Level */}
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="academicLevel"
                    className="text-2xl md:text-3xl magic-school text-[#2F3729] flex-shrink-0"
                  >
                    Academic Level* :
                  </label>
                  <input
                    type="text"
                    id="academicLevel"
                    name="academicLevel"
                    value={formData.academicLevel}
                    onChange={handleChange}
                    required
                    placeholder="L1, L2, L3, M1, M2)............."
                    className="flex-1 bg-transparent border-none min-w-0 max-w-full overflow-hidden text-ellipsis whitespace-nowrap outline-none text-2xl magic-school text-[#2F3729] placeholder-[#8B7355]"
                    style={{
                      caretColor: "#2F3729",
                    }}
                  />
                </div>

                {/* Next Button */}
                <div className="flex justify-center mt-8">
                  <button
                    type="button"
                    className="cursor-pointer"
                    onClick={handleNext}
                  >
                    <img src="/btn-next.svg" alt="Submit" />
                  </button>
                </div>
              </>
            )}

            {/* Step 2: Team Selection */}
            {currentStep === 2 && (
              <>
                {/* Team Selection */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl md:text-3xl magic-school text-[#2F3729] mb-4">
                    Which House Or Team(s) Would You Like To Join?*
                  </h3>

                  <div className="flex flex-col gap-3 ml-4">
                    {[
                      {
                        value: "design",
                        label: "Design House (Highly Recommending)",
                      },
                      { value: "it", label: "IT House" },
                      { value: "marketing", label: "Marketing House" },
                      { value: "hr", label: "HR House" },
                      { value: "b2b", label: "B2B House" },
                    ].map((team) => (
                      <label
                        key={team.value}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <span className="text-2xl md:text-3xl">
                          <img
                            src="/arrow-right.svg"
                            alt=">"
                            className={`${
                              formData.selectedTeam === team.value
                                ? "w-9 h-9"
                                : "w-6 h-6"
                            }`}
                          />
                        </span>
                        <input
                          type="radio"
                          name="selectedTeam"
                          value={team.value}
                          checked={formData.selectedTeam === team.value}
                          onChange={() => handleTeamSelect(team.value)}
                          className="hidden"
                        />
                        <span
                          className={`text-2xl magic-school transition-colors ${
                            formData.selectedTeam === team.value
                              ? "text-[#2F3729] font-bold"
                              : "text-[#4a4132]"
                          }`}
                        >
                          {team.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Experience Level */}
                <div className="flex flex-col gap-4 mt-8">
                  <h3 className="text-2xl md:text-3xl magic-school text-[#2F3729] mb-2">
                    Describe Your Experience With The Skills Required By The
                    Chosen Teams*
                  </h3>

                  <div className="flex flex-col gap-3 ml-4">
                    {[
                      { value: "beginner", label: "Beginner" },
                      { value: "intermediate", label: "Intermediate" },
                      { value: "expert", label: "Expert" },
                    ].map((level) => (
                      <label
                        key={level.value}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <span className="text-2xl md:text-3xl">
                          <img
                            src="/arrow-right.svg"
                            alt=">"
                            className={`${
                              formData.experienceLevel === level.value
                                ? "w-9 h-9"
                                : "w-6 h-6"
                            }`}
                          />
                        </span>
                        <input
                          type="radio"
                          name="experienceLevel"
                          value={level.value}
                          checked={formData.experienceLevel === level.value}
                          onChange={() => handleExperienceSelect(level.value)}
                          className="hidden"
                        />
                        <span
                          className={`text-2xl magic-school transition-colors ${
                            formData.experienceLevel === level.value
                              ? "text-[#2F3729] font-bold"
                              : "text-[#4a4132]"
                          }`}
                        >
                          {level.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Motivation */}
                <div className="flex flex-col gap-4 mt-8">
                  <label
                    htmlFor="motivation"
                    className="text-2xl md:text-3xl magic-school text-[#2F3729]"
                  >
                    What Motivates You To Join OpenMindsClub?* :
                  </label>
                  <textarea
                    id="motivation"
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleChange}
                    required
                    placeholder=".........................................................."
                    rows={4}
                    className="w-full bg-transparent border-none outline-none text-2xl magic-school text-[#2F3729] placeholder-[#8B7355] resize-none"
                    style={{
                      caretColor: "#2F3729",
                    }}
                  />
                </div>

                {/* Next Button */}
                <div className="flex justify-center mt-1">
                  <button
                    type="button"
                    className="cursor-pointer"
                    onClick={handleNext}
                  >
                    <img src="/btn-next.svg" alt="Next" />
                  </button>
                </div>
              </>
            )}

            {currentStep === 3 && (
              <>
                {/* Final Step */}
                {/* Expectation */}
                <div className="flex flex-col mt-8">
                  <label
                    htmlFor="expectation"
                    className="text-2xl md:text-3xl magic-school text-[#2F3729]"
                  >
                    Do you have any specific expectations or goals in joining
                    OpenMindsClub?:
                  </label>
                  <textarea
                    id="expectation"
                    name="expectation"
                    value={formData.expectation}
                    onChange={handleChange}
                    required
                    placeholder=".........................................................."
                    rows={4}
                    className="w-full bg-transparent border-none outline-none text-2xl magic-school text-[#2F3729] placeholder-[#8B7355] resize-none"
                    style={{
                      caretColor: "#2F3729",
                    }}
                  />
                </div>

                {/* Portfolio */}
                <div className="flex flex-col gap-4 mt-8">
                  <label
                    htmlFor="portfolio"
                    className="text-2xl md:text-3xl magic-school text-[#2F3729]"
                  >
                    Link to your portfolio or previous works/projects :
                  </label>
                  <textarea
                    id="portfolio"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    required
                    placeholder=".........................................................."
                    rows={4}
                    className="w-full bg-transparent border-none outline-none text-2xl magic-school text-[#2F3729] placeholder-[#8B7355] resize-none"
                    style={{
                      caretColor: "#2F3729",
                    }}
                  />
                </div>

                {/* Github */}
                <div className="flex flex-col gap-4 mt-8">
                  <label
                    htmlFor="github"
                    className="text-2xl md:text-3xl magic-school text-[#2F3729]"
                  >
                    Link to your GitHub / GitLab* :
                  </label>
                  <textarea
                    id="github"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    required
                    placeholder=".........................................................."
                    rows={4}
                    className="w-full bg-transparent border-none outline-none text-2xl magic-school text-[#2F3729] placeholder-[#8B7355] resize-none"
                    style={{
                      caretColor: "#2F3729",
                    }}
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mt-1">
                  <button type="submit" className="cursor-pointer">
                    <img src="/btn-send.svg" alt="Submit" />
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
