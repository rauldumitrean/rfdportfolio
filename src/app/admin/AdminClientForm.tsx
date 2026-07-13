"use client";

import { useState, useRef } from "react";
import { savePortfolioSettings } from "@/app/actions/sanity";
import { Save, User, Mail, Link as LinkIcon, Briefcase, GraduationCap, FolderGit2, Plus, Trash2, TerminalSquare, AlertTriangle, CheckCircle2, X, UploadCloud, ImageIcon } from "lucide-react";

export default function AdminClientForm({ settings, fallbackData }: { settings: any, fallbackData: any }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [changesSummary, setChangesSummary] = useState<string[]>([]);

  const initialExperience = settings?.experience || fallbackData.experience;
  const initialEducation = settings?.education || fallbackData.education;
  const initialProjects = settings?.projects || fallbackData.projects;

  const [experience, setExperience] = useState(initialExperience);
  const [education, setEducation] = useState(initialEducation);
  
  const mapSkills = (skillsArray: any) => {
    return skillsArray.map((s: any) => ({
      category: s.category,
      items: s.items?.map((item: any) => typeof item === 'string' ? item : (item?.name || "")) || []
    }));
  };
  
  const initialSkills = settings?.skills?.length ? mapSkills(settings.skills) : mapSkills(fallbackData.skills);
  const [skills, setSkills] = useState(initialSkills);
  
  const [projects, setProjects] = useState(initialProjects);

  const handleAddExperience = () => {
    setExperience([...experience, { _key: Date.now().toString(), title: "", company: "", period: "", description: "" }]);
  };

  const handleRemoveExperience = (index: number) => {
    setExperience(experience.filter((_: any, i: number) => i !== index));
  };

  const handleExperienceChange = (index: number, field: string, value: string) => {
    const newExp = [...experience];
    newExp[index][field] = value;
    setExperience(newExp);
  };

  const handleAddEducation = () => {
    setEducation([...education, { _key: Date.now().toString(), degree: "", institution: "", period: "", details: "" }]);
  };

  const handleRemoveEducation = (index: number) => {
    setEducation(education.filter((_: any, i: number) => i !== index));
  };

  const handleEducationChange = (index: number, field: string, value: string) => {
    const newEdu = [...education];
    newEdu[index][field] = value;
    setEducation(newEdu);
  };

  const handleAddSkill = () => {
    setSkills([...skills, { _key: Date.now().toString(), category: "", items: [] }]);
  };

  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_: any, i: number) => i !== index));
  };

  const handleSkillChange = (index: number, field: string, value: any) => {
    const newSkills = [...skills];
    newSkills[index][field] = value;
    setSkills(newSkills);
  };

  const handleAddProject = () => {
    setProjects([...projects, { _key: Date.now().toString(), title: "", description: "", imageUrl: "", link: "", tags: [] }]);
  };

  const handleRemoveProject = (index: number) => {
    setProjects(projects.filter((_: any, i: number) => i !== index));
  };

  const handleProjectChange = (index: number, field: string, value: any) => {
    const newProj = [...projects];
    newProj[index][field] = value;
    setProjects(newProj);
  };

  const handleImageSelect = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      handleProjectChange(index, "localPreviewUrl", url);
    }
  };

  const calculateChanges = () => {
    if (!formRef.current) return [];
    const formData = new FormData(formRef.current);
    const changes: string[] = [];

    const checkText = (name: string, label: string, initial: string) => {
      const current = formData.get(name) as string;
      if (current !== (initial || "")) changes.push(`Modificado: ${label}`);
    };

    checkText("heroTitle", "Título Principal", settings?.heroTitle || "Hi, I'm");
    checkText("heroSubtitle", "Subtítulo", settings?.heroSubtitle || fallbackData.personalInfo.profile);
    checkText("contactEmail", "Email", settings?.contactEmail || fallbackData.personalInfo.email);
    checkText("contactPhone", "Teléfono", settings?.contactPhone || fallbackData.personalInfo.phone);
    checkText("githubUrl", "GitHub", settings?.githubUrl || fallbackData.personalInfo.github);
    checkText("linkedinUrl", "LinkedIn", settings?.linkedinUrl || fallbackData.personalInfo.linkedin);

    if (experience.length !== initialExperience.length) {
      changes.push(`Experiencia: ${experience.length} elementos (antes ${initialExperience.length})`);
    } else if (JSON.stringify(experience) !== JSON.stringify(initialExperience)) {
      changes.push("Experiencia: Contenido editado");
    }

    if (education.length !== initialEducation.length) {
      changes.push(`Educación: ${education.length} elementos (antes ${initialEducation.length})`);
    } else if (JSON.stringify(education) !== JSON.stringify(initialEducation)) {
      changes.push("Educación: Contenido editado");
    }

    if (projects.length !== initialProjects.length) {
      changes.push(`Proyectos: ${projects.length} elementos (antes ${initialProjects.length})`);
    } else if (JSON.stringify(projects) !== JSON.stringify(initialProjects)) {
      changes.push("Proyectos: Contenido editado");
    }

    if (JSON.stringify(skills) !== JSON.stringify(initialSkills)) {
      changes.push("Habilidades: Contenido editado");
    }

    return changes;
  };

  const handleReviewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!formRef.current?.reportValidity()) return; // check required fields like password
    const changes = calculateChanges();
    setChangesSummary(changes.length ? changes : ["No se han detectado cambios."]);
    setShowModal(true);
    setSuccessMsg("");
    setErrorMsg("");
  };

  const handleActualSubmit = async () => {
    if (!formRef.current) return;
    setIsSubmitting(true);
    setErrorMsg("");
    
    try {
      const formData = new FormData(formRef.current);
      await savePortfolioSettings(formData);
      setSuccessMsg("¡Tus cambios han sido guardados con éxito en Sanity!");
      setTimeout(() => {
        setShowModal(false);
        setSuccessMsg("");
      }, 3000);
    } catch (err: any) {
      setErrorMsg(err.message || "Error al guardar. Verifica la contraseña.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form ref={formRef} className="space-y-8">
        {/* Hidden inputs to pass JSON arrays to Server Action */}
      <input type="hidden" name="experience" value={JSON.stringify(experience.map((e: any) => ({...e, _key: e._key || Date.now().toString() + Math.random()})))} />
      <input type="hidden" name="education" value={JSON.stringify(education.map((e: any) => ({...e, _key: e._key || Date.now().toString() + Math.random()})))} />
      <input type="hidden" name="skills" value={JSON.stringify(skills.map((e: any) => ({...e, _key: e._key || Date.now().toString() + Math.random()})))} />
      <input type="hidden" name="projects" value={JSON.stringify(projects.map((e: any) => ({...e, _key: e._key || Date.now().toString() + Math.random()})))} />

      {/* Textos Principales */}
      <section className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
          <User className="text-blue-400" size={20} />
          Textos Principales (Hero)
        </h2>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Título Principal</label>
            <input 
              type="text" 
              name="heroTitle" 
              defaultValue={settings?.heroTitle || "Hi, I'm"}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Subtítulo / Breve descripción</label>
            <textarea 
              name="heroSubtitle" 
              defaultValue={settings?.heroSubtitle || fallbackData.personalInfo.profile}
              rows={4}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition resize-none"
            />
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
          <Mail className="text-blue-400" size={20} />
          Contacto y Redes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
            <input type="email" name="contactEmail" defaultValue={settings?.contactEmail || fallbackData.personalInfo.email} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Teléfono</label>
            <input type="text" name="contactPhone" defaultValue={settings?.contactPhone || fallbackData.personalInfo.phone} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">GitHub URL</label>
            <input type="url" name="githubUrl" defaultValue={settings?.githubUrl || fallbackData.personalInfo.github} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">LinkedIn URL</label>
            <input type="url" name="linkedinUrl" defaultValue={settings?.linkedinUrl || fallbackData.personalInfo.linkedin} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition" />
          </div>
        </div>
      </section>

      {/* Experiencia */}
      <section className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
        <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Briefcase className="text-blue-400" size={20} /> Experiencia Laboral
          </h2>
          <button type="button" onClick={handleAddExperience} className="flex items-center gap-2 text-sm bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 px-3 py-1.5 rounded-lg transition">
            <Plus size={16} /> Añadir
          </button>
        </div>
        <div className="space-y-6">
          {experience.map((exp: any, index: number) => (
            <div key={index} className="bg-black/30 p-4 rounded-xl border border-white/5 relative group">
              <button type="button" onClick={() => handleRemoveExperience(index)} className="absolute top-4 right-4 text-gray-500 hover:text-red-400 opacity-0 md:opacity-100 transition">
                <Trash2 size={18} />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pr-8">
                <input type="text" placeholder="Cargo (ej. Analista SOC)" value={exp.title || exp.role} onChange={(e) => handleExperienceChange(index, "title", e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500/50" />
                <input type="text" placeholder="Empresa" value={exp.company} onChange={(e) => handleExperienceChange(index, "company", e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500/50" />
                <input type="text" placeholder="Periodo (ej. Jun 2024 - Act)" value={exp.period || exp.date} onChange={(e) => handleExperienceChange(index, "period", e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500/50 md:col-span-2" />
              </div>
              <textarea placeholder="Descripción del puesto..." value={exp.description} onChange={(e) => handleExperienceChange(index, "description", e.target.value)} rows={3} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500/50 resize-none" />
            </div>
          ))}
        </div>
      </section>

      {/* Educación */}
      <section className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
        <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <GraduationCap className="text-blue-400" size={20} /> Educación
          </h2>
          <button type="button" onClick={handleAddEducation} className="flex items-center gap-2 text-sm bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 px-3 py-1.5 rounded-lg transition">
            <Plus size={16} /> Añadir
          </button>
        </div>
        <div className="space-y-6">
          {education.map((edu: any, index: number) => (
            <div key={index} className="bg-black/30 p-4 rounded-xl border border-white/5 relative group">
              <button type="button" onClick={() => handleRemoveEducation(index)} className="absolute top-4 right-4 text-gray-500 hover:text-red-400 opacity-0 md:opacity-100 transition">
                <Trash2 size={18} />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pr-8">
                <input type="text" placeholder="Título" value={edu.degree} onChange={(e) => handleEducationChange(index, "degree", e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500/50" />
                <input type="text" placeholder="Institución" value={edu.institution || edu.school} onChange={(e) => handleEducationChange(index, "institution", e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500/50" />
                <input type="text" placeholder="Periodo" value={edu.period || edu.date} onChange={(e) => handleEducationChange(index, "period", e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500/50 md:col-span-2" />
              </div>
              <textarea placeholder="Detalles (opcional)..." value={edu.details || ""} onChange={(e) => handleEducationChange(index, "details", e.target.value)} rows={2} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500/50 resize-none" />
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
        <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <TerminalSquare className="text-blue-400" size={20} /> Habilidades (Skills)
          </h2>
          <button type="button" onClick={handleAddSkill} className="flex items-center gap-2 text-sm bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 px-3 py-1.5 rounded-lg transition">
            <Plus size={16} /> Añadir Categoría
          </button>
        </div>
        <div className="space-y-6">
          {skills.map((skill: any, index: number) => (
            <div key={index} className="bg-black/30 p-4 rounded-xl border border-white/5 relative group">
              <button type="button" onClick={() => handleRemoveSkill(index)} className="absolute top-4 right-4 text-gray-500 hover:text-red-400 opacity-0 md:opacity-100 transition">
                <Trash2 size={18} />
              </button>
              <div className="pr-8 space-y-4">
                <input type="text" placeholder="Categoría (ej: Frontend, Herramientas...)" value={skill.category} onChange={(e) => handleSkillChange(index, "category", e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500/50" />
                <input type="text" placeholder="Tecnologías (separadas por comas)" value={skill.items ? skill.items.join(", ") : ""} onChange={(e) => handleSkillChange(index, "items", e.target.value.split(",").map((t: string) => t.trim()))} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500/50" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Proyectos */}
      <section className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
        <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FolderGit2 className="text-blue-400" size={20} /> Proyectos
          </h2>
          <button type="button" onClick={handleAddProject} className="flex items-center gap-2 text-sm bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 px-3 py-1.5 rounded-lg transition">
            <Plus size={16} /> Añadir
          </button>
        </div>
        <div className="space-y-6">
          {projects.map((proj: any, index: number) => (
            <div key={index} className="bg-black/30 p-4 rounded-xl border border-white/5 relative group">
              <button type="button" onClick={() => handleRemoveProject(index)} className="absolute top-4 right-4 text-gray-500 hover:text-red-400 opacity-0 md:opacity-100 transition">
                <Trash2 size={18} />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pr-8">
                <input type="text" placeholder="Nombre del Proyecto" value={proj.title} onChange={(e) => handleProjectChange(index, "title", e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500/50" />
                <input type="text" placeholder="URL (GitHub o Web)" value={proj.link || ""} onChange={(e) => handleProjectChange(index, "link", e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500/50" />
                <input type="text" placeholder="Tecnologías (separadas por comas)" value={proj.tags ? proj.tags.join(", ") : ""} onChange={(e) => handleProjectChange(index, "tags", e.target.value.split(",").map((t: string) => t.trim()))} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500/50 md:col-span-2" />
              </div>
              <textarea placeholder="Descripción del proyecto..." value={proj.description} onChange={(e) => handleProjectChange(index, "description", e.target.value)} rows={3} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500/50 resize-none mb-4" />
              
              {/* Image Upload Area */}
              <div className="mt-2 mb-4">
                <label className="block text-sm font-medium text-gray-400 mb-2">Imagen del Proyecto</label>
                <div className="relative w-full h-40 rounded-xl border-2 border-dashed border-white/20 hover:border-blue-500/50 bg-black/30 flex flex-col items-center justify-center overflow-hidden transition-colors group/upload cursor-pointer">
                  <input 
                    type="file" 
                    name={`projectImage_${index}`} 
                    accept="image/*"
                    onChange={(e) => handleImageSelect(index, e)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  {(proj.localPreviewUrl || proj.imageUrl) ? (
                    <>
                      <img src={proj.localPreviewUrl || proj.imageUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover/upload:opacity-30 transition-opacity" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover/upload:opacity-100 transition-opacity">
                        <UploadCloud size={32} className="text-white drop-shadow-md mb-2" />
                        <span className="text-sm font-medium text-white drop-shadow-md">Cambiar imagen</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <ImageIcon size={32} className="text-gray-500 group-hover/upload:text-blue-400 mb-2 transition-colors" />
                      <span className="text-sm text-gray-400 group-hover/upload:text-blue-300 transition-colors">Arrastra una imagen o haz clic</span>
                    </>
                  )}
                </div>
                {/* Preserve existing imageUrl if no new file is uploaded */}
                <input type="hidden" name={`existingImageUrl_${index}`} value={proj.imageUrl || ""} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Password & Submit */}
      <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-4 pb-20">
        <input 
          type="password" 
          name="adminPassword" 
          placeholder="Contraseña de Admin"
          required
          className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 transition"
        />
        <button type="button" onClick={handleReviewClick} className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl overflow-hidden transition-all shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)] hover:shadow-[0_0_60px_-15px_rgba(59,130,246,0.7)] hover:-translate-y-1 flex items-center gap-3 w-full sm:w-auto justify-center">
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
          <Save size={20} className="relative z-10" />
          <span className="relative z-10">Guardar Cambios Completos</span>
        </button>
      </div>
      </form>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 max-w-lg w-full shadow-2xl relative">
            <button 
              onClick={() => !isSubmitting && !successMsg && setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
              disabled={isSubmitting || !!successMsg}
            >
              <X size={24} />
            </button>

            {successMsg ? (
              <div className="text-center space-y-4 py-8">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={32} className="text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-white">¡Actualizado!</h3>
                <p className="text-gray-400">{successMsg}</p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <AlertTriangle className="text-yellow-500" size={28} />
                  <h3 className="text-2xl font-bold text-white">¿Estás seguro?</h3>
                </div>
                
                <p className="text-gray-400 mb-6">
                  Vas a sobrescribir la información de tu portafolio en vivo. Aquí tienes un resumen de lo que va a cambiar:
                </p>

                <div className="bg-black/50 border border-white/5 rounded-xl p-4 mb-8 max-h-48 overflow-y-auto">
                  <ul className="space-y-2 text-sm text-gray-300 font-mono">
                    {changesSummary.map((change, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-500">→</span> {change}
                      </li>
                    ))}
                  </ul>
                </div>

                {errorMsg && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm mb-6 flex items-center gap-2">
                    <AlertTriangle size={16} /> {errorMsg}
                  </div>
                )}

                <div className="flex gap-4">
                  <button 
                    onClick={() => setShowModal(false)}
                    disabled={isSubmitting}
                    className="flex-1 py-3 px-4 rounded-xl border border-white/10 text-white hover:bg-white/5 transition font-medium disabled:opacity-50"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={handleActualSubmit}
                    disabled={isSubmitting || changesSummary[0] === "No se han detectado cambios."}
                    className="flex-1 py-3 px-4 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Guardando...</span>
                    ) : (
                      <>
                        <Save size={18} /> Confirmar
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
