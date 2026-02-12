'use client';

import { useEffect, useState, FormEvent } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { getProjects, addProject, updateProject, deleteProject, uploadProjectImage, updateProjectsOrder } from '@/lib/projects';
import { Project, ProjectInput } from '@/types/project';
import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes, FaGripVertical } from 'react-icons/fa';
import { Reorder } from 'framer-motion';

interface Message {
  id: string;
  name: string;
  email: string;
  projectDetails: string;
  createdAt: any;
}

export default function AdminDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Project Form State
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<ProjectInput>({
    title: '',
    description: '',
    technologies: [],
    githubUrl: '',
    liveUrl: '',
    imageUrl: '',
    featured: false,
    order: 0,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [techInput, setTechInput] = useState('');
  const [hasUnsavedOrder, setHasUnsavedOrder] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const messagesSnapshot = await getDocs(collection(db, 'messages'));
      const projectsData = await getProjects();

      setMessages(
        messagesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Message[]
      );

      setProjects(projectsData.sort((a, b) => (a.order || 0) - (b.order || 0)));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('DELETE_MESSAGE_CONFIRMATION: Are you sure?')) return;
    try {
      await deleteDoc(doc(db, 'messages', id));
      setMessages(messages.filter((m) => m.id !== id));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  // --- PROJECT MANAGEMENT FUNCTIONS ---

  async function refreshProjects() {
    const data = await getProjects();
    setProjects(data.sort((a, b) => (a.order || 0) - (b.order || 0)));
  }

  function handleEditProject(project: Project) {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies,
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl,
      imageUrl: project.imageUrl,
      featured: project.featured,
      order: project.order,
    });
    setShowForm(true);
  }

  async function handleDeleteProject(id: string) {
    if (confirm('DELETE_PROJECT_CONFIRMATION: Are you sure? This action is irreversible.')) {
      await deleteProject(id);
      refreshProjects();
    }
  }

  async function handleProjectSubmit(e: FormEvent) {
    e.preventDefault();
    
    let imageUrl = formData.imageUrl;
    
    if (imageFile) {
      const tempId = editingProject?.id || `temp_${Date.now()}`;
      const uploadedUrl = await uploadProjectImage(imageFile, tempId);
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      }
    }

    const projectData = { ...formData, imageUrl };

    if (editingProject) {
      await updateProject(editingProject.id, projectData);
    } else {
      projectData.order = projects.length;
      await addProject(projectData);
    }

    resetProjectForm();
    refreshProjects();
  }

  function resetProjectForm() {
    setShowForm(false);
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      technologies: [],
      githubUrl: '',
      liveUrl: '',
      imageUrl: '',
      featured: false,
      order: 0,
    });
    setImageFile(null);
    setTechInput('');
  }

  function addTechnology() {
    if (techInput.trim()) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techInput.trim()]
      });
      setTechInput('');
    }
  }

  function removeTechnology(index: number) {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((_, i) => i !== index)
    });
  }

  function handleReorder(newOrder: Project[]) {
    setProjects(newOrder);
    setHasUnsavedOrder(true);
  }

  async function saveOrder() {
    const success = await updateProjectsOrder(projects);
    if (success) {
      setHasUnsavedOrder(false);
      alert('ORDER_SYNC_COMPLETE: Project order updated successfully.');
    } else {
      alert('ORDER_SYNC_FAILED: Please try again.');
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#E0E0E0]">
        <div className="inline-block animate-spin w-16 h-16 border-8 border-black border-t-brutalist-yellow rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-12 bg-[#E0E0E0] min-h-screen p-8 font-mono">
      
      {/* OVERVIEW SECTION */}
      <section>
        <h2 className="text-3xl font-black mb-6 uppercase">SYSTEM_OVERVIEW</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_#000]">
            <div className="text-5xl font-black text-brutalist-yellow mb-2">
              {messages.length}
            </div>
            <div className="text-sm font-bold">TOTAL_MESSAGES</div>
          </div>
          <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_#000]">
            <div className="text-5xl font-black text-brutalist-green mb-2">
              {projects.length}
            </div>
            <div className="text-sm font-bold">TOTAL_PROJECTS</div>
          </div>
          <div className="bg-brutalist-black text-white border-4 border-white p-6 shadow-[8px_8px_0px_#000]">
            <div className="text-5xl font-black mb-2">ADMIN</div>
            <div className="text-sm font-bold text-green-400">SESSION_ACTIVE</div>
          </div>
        </div>
      </section>

      {/* MESSAGES SECTION */}
      <section>
        <h2 className="text-3xl font-black mb-6 uppercase">INCOMING_TRANSMISSIONS</h2>
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_#000] overflow-hidden">
          {messages.length === 0 ? (
            <div className="p-8 text-center text-gray-500 font-bold">NO_NEW_MESSAGES</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-black text-white border-b-4 border-black">
                  <tr>
                    <th className="text-left p-4 font-bold">SENDER</th>
                    <th className="text-left p-4 font-bold">CONTACT</th>
                    <th className="text-left p-4 font-bold">PAYLOAD</th>
                    <th className="text-left p-4 font-bold">TIMESTAMP</th>
                    <th className="text-left p-4 font-bold">CMD</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((message) => (
                    <tr key={message.id} className="border-b-2 border-black hover:bg-yellow-50 transition-colors">
                      <td className="p-4 font-bold">{message.name}</td>
                      <td className="p-4 font-mono text-sm">{message.email}</td>
                      <td className="p-4 max-w-xs truncate font-mono text-sm">{message.projectDetails}</td>
                      <td className="p-4 text-sm font-mono">
                        {message.createdAt?.toDate?.()?.toLocaleDateString() || 'N/A'}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => deleteMessage(message.id)}
                          className="bg-red-500 text-white px-3 py-1 border-2 border-black font-bold text-xs hover:bg-black hover:text-red-500 transition-all shadow-[2px_2px_0px_#000]"
                        >
                          DELETE
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* PROJECT MANAGEMENT SECTION */}
      <section>
        <div className="bg-black text-white p-6 border-4 border-black mb-8 shadow-[8px_8px_0px_#000]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-3xl font-black text-brutalist-yellow mb-2">PROJECT_MANAGER</h2>
              <p className="text-sm text-gray-400">// MANAGE & REORDER PORTFOLIO ITEMS</p>
            </div>
            <div className="flex gap-4">
              {hasUnsavedOrder && (
                <button
                  onClick={saveOrder}
                  className="bg-blue-500 text-white px-6 py-3 border-4 border-white font-bold text-lg hover:bg-blue-600 transition-all flex items-center gap-2 animate-pulse shadow-[4px_4px_0px_#FFF]"
                >
                  <FaSave /> SAVE_ORDER
                </button>
              )}
              <button
                onClick={() => setShowForm(true)}
                className="bg-brutalist-green text-black px-6 py-3 border-4 border-white font-bold text-lg hover:translate-y-[-4px] hover:shadow-[6px_6px_0px_#FFF] active:translate-y-[0px] active:shadow-none transition-all flex items-center gap-2"
              >
                <FaPlus /> NEW_PROJECT
              </button>
            </div>
          </div>
        </div>

        {/* Project Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white border-4 border-black w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-[12px_12px_0px_#FFFF00]">
              <div className="bg-black text-white p-4 border-b-4 border-black flex justify-between items-center sticky top-0 z-10">
                <h2 className="text-xl font-bold text-brutalist-green">
                  {editingProject ? '>> MODIFYING_DATA' : '>> INJECTING_DATA'}
                </h2>
                <button onClick={resetProjectForm} className="bg-red-500 text-white p-2 border-2 border-white hover:bg-red-600">
                  <FaTimes size={20} />
                </button>
              </div>

              <form onSubmit={handleProjectSubmit} className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block font-bold mb-2 bg-black text-white w-fit px-2">TITLE</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full border-4 border-black p-3 focus:outline-none focus:bg-yellow-100 font-bold"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-2 bg-black text-white w-fit px-2">DESCRIPTION</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full border-4 border-black p-3 h-32 focus:outline-none focus:bg-yellow-100"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-2 bg-black text-white w-fit px-2">IMAGE</label>
                      <div className="border-4 border-black p-4 bg-gray-100">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                          className="w-full mb-2"
                        />
                        {formData.imageUrl && !imageFile && (
                          <img src={formData.imageUrl} alt="Preview" className="h-20 w-auto border-2 border-black mt-2" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block font-bold mb-2 bg-black text-white w-fit px-2">TECH_STACK</label>
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={techInput}
                          onChange={(e) => setTechInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                          className="flex-1 border-4 border-black p-3 focus:outline-none focus:bg-yellow-100"
                        />
                        <button type="button" onClick={addTechnology} className="bg-black text-white px-4 border-4 border-black font-bold">PUSH()</button>
                      </div>
                      <div className="flex flex-wrap gap-2 border-4 border-black p-4 min-h-[100px] bg-gray-50">
                        {formData.technologies.map((tech, index) => (
                          <span key={index} className="bg-brutalist-yellow text-black border-2 border-black px-3 py-1 font-bold flex items-center gap-2 shadow-[2px_2px_0px_#000]">
                            {tech}
                            <button type="button" onClick={() => removeTechnology(index)} className="text-red-600 font-black">×</button>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold mb-2 bg-black text-white w-fit px-2">GITHUB</label>
                        <input type="url" value={formData.githubUrl} onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })} className="w-full border-4 border-black p-3 focus:outline-none focus:bg-yellow-100" required />
                      </div>
                      <div>
                        <label className="block font-bold mb-2 bg-black text-white w-fit px-2">LIVE</label>
                        <input type="url" value={formData.liveUrl} onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })} className="w-full border-4 border-black p-3 focus:outline-none focus:bg-yellow-100" required />
                      </div>
                    </div>

                    <div className="flex gap-4 items-center border-4 border-black p-4 bg-purple-100">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} className="w-6 h-6 border-2 border-black accent-black cursor-pointer" />
                        <label className="font-bold cursor-pointer">IS_FEATURED</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t-4 border-black mt-4">
                  <button type="submit" className="flex-1 bg-brutalist-green text-black border-4 border-black py-4 text-xl font-black hover:shadow-[4px_4px_0px_#000] transition-all">
                    {editingProject ? 'SAVE_CHANGES();' : 'COMMIT_NEW_PROJECT();'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Project List */}
        <Reorder.Group axis="y" values={projects} onReorder={handleReorder} className="space-y-4">
          {projects.map((project) => (
            <Reorder.Item 
              key={project.id} 
              value={project}
              className="bg-white border-4 border-black shadow-[8px_8px_0px_#000] flex flex-col md:flex-row gap-4 overflow-hidden relative group"
              whileDrag={{ scale: 1.02, boxShadow: "12px 12px 0px #000", zIndex: 10 }}
            >
              <div className="bg-gray-200 border-r-4 border-black w-12 flex items-center justify-center cursor-grab active:cursor-grabbing hover:bg-gray-300 transition-colors">
                <FaGripVertical size={24} className="text-gray-500" />
              </div>

              <div className="h-32 w-full md:w-48 bg-gray-200 border-b-4 md:border-b-0 md:border-r-4 border-black relative flex-shrink-0">
                {project.imageUrl ? (
                  <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl text-gray-400 font-black">NO_IMG</div>
                )}
                {project.featured && <div className="absolute top-2 right-2 bg-yellow-400 text-black border-2 border-black px-1 py-0.5 font-bold text-[10px]">★</div>}
              </div>

              <div className="p-4 flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-black mb-1 uppercase">{project.title}</h3>
                    <p className="text-xs text-gray-600 mb-2 font-semibold line-clamp-1">{project.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEditProject(project)} className="bg-blue-400 text-black border-2 border-black p-2 font-bold hover:bg-blue-500 shadow-[2px_2px_0px_#000]">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDeleteProject(project.id)} className="bg-red-400 text-black border-2 border-black p-2 font-bold hover:bg-red-500 shadow-[2px_2px_0px_#000]">
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.technologies.slice(0, 5).map((tech, i) => (
                    <span key={i} className="text-[10px] bg-black text-white px-2 py-1 font-bold">{tech}</span>
                  ))}
                </div>
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>

        {projects.length === 0 && (
          <div className="border-4 border-black bg-white p-12 text-center shadow-[8px_8px_0px_#000]">
            <h3 className="text-2xl font-black mb-4">404: NO_PROJECTS_FOUND</h3>
            <button onClick={() => setShowForm(true)} className="bg-brutalist-yellow text-black border-4 border-black px-8 py-4 font-black shadow-[4px_4px_0px_#000]">
              CREATE_FIRST_PROJECT
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
