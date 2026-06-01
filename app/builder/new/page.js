const handleSave = () => {
  // Save to localStorage
  const savedResumes = localStorage.getItem("savedResumes");
  let resumes = savedResumes ? JSON.parse(savedResumes) : [];
  
  const newResume = {
    id: Date.now(),
    name: formData.jobTitle + " Resume",
    date: new Date().toISOString().split('T')[0],
    template: selectedTemplate,
    data: formData
  };
  
  resumes.push(newResume);
  localStorage.setItem("savedResumes", JSON.stringify(resumes));
  localStorage.setItem("currentResume", JSON.stringify({ template: selectedTemplate, data: formData }));
  
  alert("Resume saved successfully!");
  router.push("/dashboard");
};
