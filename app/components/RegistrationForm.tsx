"use client";

import { useState } from "react";
import { registrationSchema, step1Schema, step2Schema } from "@/lib/validation";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
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

    // Clear validation error for this field when user types
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    // Clear submit error when user makes changes
    if (submitError) {
      setSubmitError("");
    }
  };

  const handleTeamSelect = (team: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedTeam: team,
    }));

    // Clear validation error for selectedTeam when user selects
    if (validationErrors.selectedTeam) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.selectedTeam;
        return newErrors;
      });
    }

    // Clear submit error when user makes changes
    if (submitError) {
      setSubmitError("");
    }
  };

  const handleExperienceSelect = (level: string) => {
    setFormData((prev) => ({
      ...prev,
      experienceLevel: level,
    }));

    // Clear validation error for experienceLevel when user selects
    if (validationErrors.experienceLevel) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.experienceLevel;
        return newErrors;
      });
    }

    // Clear submit error when user makes changes
    if (submitError) {
      setSubmitError("");
    }
  };

  const handleNext = () => {
    setValidationErrors({});
    setSubmitError("");

    if (currentStep === 1) {
      // Validate step 1 fields using step1Schema
      const step1Data = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        studentId: formData.studentId,
        email: formData.email,
        phone: formData.phone,
        fieldOfStudy: formData.fieldOfStudy,
        faculty: formData.faculty,
        academicLevel: formData.academicLevel,
      };

      const result = step1Schema.safeParse(step1Data);
      if (!result.success) {
        const errors: Record<string, string> = {};
        result.error.issues.forEach((err) => {
          const field = err.path[0] as string;
          errors[field] = err.message;
        });
        setValidationErrors(errors);
        setSubmitError("Please fix the errors above before continuing");
        return;
      }

      // All validations passed, move to step 2
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // Validate step 2 fields using step2Schema
      const step2Data = {
        selectedTeam: formData.selectedTeam,
        experienceLevel: formData.experienceLevel,
        motivation: formData.motivation,
      };

      const result = step2Schema.safeParse(step2Data);
      if (!result.success) {
        const errors: Record<string, string> = {};
        result.error.issues.forEach((err) => {
          const field = err.path[0] as string;
          errors[field] = err.message;
        });
        setValidationErrors(errors);
        setSubmitError("Please fix the errors above before continuing");
        return;
      }

      // All validations passed, move to step 3
      setCurrentStep(3);
    }

    // scroll to id registration-form
    window.scrollTo({
      top: document.getElementById("registration-form")?.offsetTop || 0,
      behavior: "smooth",
    });
  };

  const handleBack = () => {
    setValidationErrors({});
    setSubmitError("");
    if (currentStep === 2) {
      setCurrentStep(1);
    } else if (currentStep === 3) {
      setCurrentStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});
    setSubmitError("");

    // Validate all form data before submission
    const result = registrationSchema.safeParse(formData);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as string;
        errors[field] = err.message;
      });
      console.log(errors);
      setValidationErrors(errors);
      setSubmitError("Please fix the validation errors before submitting");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          const errors: Record<string, string> = {};
          data.errors.forEach((err: { field: string; message: string }) => {
            errors[err.field] = err.message;
          });
          setValidationErrors(errors);
        }
        setSubmitError(data.error || "Failed to submit registration");
        setIsSubmitting(false);
        return;
      }

      // Success!
      setSubmitSuccess(true);
      console.log("Registration successful:", data);

      // Reset form after success
      setTimeout(() => {
        setFormData({
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
        setCurrentStep(1);
        setSubmitSuccess(false);
      }, 30000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(
        "Network error. Please check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full">
      <div className="w-full flex justify-center form-overlay">
        <div className="relative p-10 form-container w-[98%] md:w-[800px]">
          {/* Success Message */}
          {submitSuccess && (
            <div className="flex flex-col items-center justify-center p-10 gap-6">
              <div className="text-5xl"></div>
              <h2 className="text-4xl md:text-5xl magic-school text-[#2F3729] text-center">
                Registration Successful!
              </h2>
              <p className="text-2xl magic-school text-[#2F3729] text-center">
                Welcome to OpenMindsClub! We&apos;ll reach out to you soon.
              </p>
            </div>
          )}

          {/* Form */}
          {!submitSuccess && (
            <form
              onSubmit={handleSubmit}
              className="relative flex flex-col gap-8 py-10 md:px-10"
              id="registration-form"
            >
              {/*feather pen*/}
              <div>
                <img
                  src="/feather-pen.png"
                  alt="Feather Pen Icon"
                  className="absolute right-[-20%] bottom-[-2%] w-[80%]"
                />
              </div>

              {/* Header with glasses icon */}
              <div className="flex flex-col items-center mb-8">
                <img
                  src="/glasses.svg"
                  alt="Glasses Icon"
                  className="w-24 h-24"
                />
                <div className="text-4xl md:text-5xl lg:text-6xl magic-school text-[#2F3729] text-center">
                  <h2 className="md:text-5xl text-4xl magic-school text-[#2F3729] text-center">
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
                  <div className="flex flex-col gap-2">
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
                    {validationErrors.firstName && (
                      <p className="text-red-600 text-sm ml-4">
                        {validationErrors.firstName}
                      </p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div className="flex flex-col gap-2">
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
                    {validationErrors.lastName && (
                      <p className="text-red-600 text-sm ml-4">
                        {validationErrors.lastName}
                      </p>
                    )}
                  </div>

                  {/* Student ID Number */}
                  <div className="flex flex-col gap-2">
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
                    {validationErrors.studentId && (
                      <p className="text-red-600 text-sm ml-4">
                        {validationErrors.studentId}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
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
                    {validationErrors.email && (
                      <p className="text-red-600 text-sm ml-4">
                        {validationErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="flex flex-col gap-2">
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
                    {validationErrors.phone && (
                      <p className="text-red-600 text-sm ml-4">
                        {validationErrors.phone}
                      </p>
                    )}
                  </div>

                  {/* Field of Study */}
                  <div className="flex flex-col gap-2">
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
                    {validationErrors.fieldOfStudy && (
                      <p className="text-red-600 text-sm ml-4">
                        {validationErrors.fieldOfStudy}
                      </p>
                    )}
                  </div>

                  {/* Faculty / House */}
                  <div className="flex flex-col gap-2">
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
                    {validationErrors.faculty && (
                      <p className="text-red-600 text-sm ml-4">
                        {validationErrors.faculty}
                      </p>
                    )}
                  </div>

                  {/* Academic Level */}
                  <div className="flex flex-col gap-2">
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
                    {validationErrors.academicLevel && (
                      <p className="text-red-600 text-sm ml-4">
                        {validationErrors.academicLevel}
                      </p>
                    )}
                  </div>

                  {/* Next Button */}
                  <div className="flex justify-center mt-8 md:w-auto">
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
                      Which house or team(s) would you like to join?*
                    </h3>

                    <div className="flex flex-col gap-3 ml-4">
                      {[
                        {
                          value: "design",
                          label: "Design House (Highly Recommended)",
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
                    {validationErrors.selectedTeam && (
                      <p className="text-red-600 text-sm ml-4">
                        {validationErrors.selectedTeam}
                      </p>
                    )}
                  </div>

                  {/* Experience Level */}
                  <div className="flex flex-col gap-4 mt-8">
                    <h3 className="text-2xl md:text-3xl magic-school text-[#2F3729] mb-2">
                      Describe your experience with the skills required by the
                      chosen team*
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
                    {validationErrors.experienceLevel && (
                      <p className="text-red-600 text-sm ml-4">
                        {validationErrors.experienceLevel}
                      </p>
                    )}
                  </div>

                  {/* Motivation */}
                  <div className="flex flex-col gap-4 mt-8">
                    <label
                      htmlFor="motivation"
                      className="text-2xl md:text-3xl magic-school text-[#2F3729]"
                    >
                      What motivates you to join OpenMindsClub?* :
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
                    {validationErrors.motivation && (
                      <p className="text-red-600 text-sm">
                        {validationErrors.motivation}
                      </p>
                    )}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-center gap-4 mt-1">
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
                      placeholder=".........................................................."
                      rows={4}
                      className="w-full bg-transparent border-none outline-none text-2xl magic-school text-[#2F3729] placeholder-[#8B7355] resize-none"
                      style={{
                        caretColor: "#2F3729",
                      }}
                    />
                    {validationErrors.expectation && (
                      <p className="text-red-600 text-sm">
                        {validationErrors.expectation}
                      </p>
                    )}
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
                      placeholder=".........................................................."
                      rows={4}
                      className="w-full bg-transparent border-none outline-none text-2xl magic-school text-[#2F3729] placeholder-[#8B7355] resize-none"
                      style={{
                        caretColor: "#2F3729",
                      }}
                    />
                    {validationErrors.portfolio && (
                      <p className="text-red-600 text-sm">
                        {validationErrors.portfolio}
                      </p>
                    )}
                  </div>

                  {/* Github */}
                  <div className="flex flex-col gap-4 mt-8">
                    <label
                      htmlFor="github"
                      className="text-2xl md:text-3xl magic-school text-[#2F3729]"
                    >
                      Link to your GitHub / GitLab :
                    </label>
                    <textarea
                      id="github"
                      name="github"
                      value={formData.github}
                      onChange={handleChange}
                      placeholder=".........................................................."
                      rows={4}
                      className="w-full bg-transparent border-none outline-none text-2xl magic-school text-[#2F3729] placeholder-[#8B7355] resize-none"
                      style={{
                        caretColor: "#2F3729",
                      }}
                    />
                    {validationErrors.github && (
                      <p className="text-red-600 text-sm">
                        {validationErrors.github}
                      </p>
                    )}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-center gap-4 mt-1">
                    <button
                      type="submit"
                      className="cursor-pointer"
                      disabled={isSubmitting}
                    >
                      <img src="/btn-send.svg" alt="Submit" />
                    </button>
                  </div>
                </>
              )}

              {/* Error Message */}
              <div className="mb-4">
                {submitError && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{submitError}</span>
                  </div>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
