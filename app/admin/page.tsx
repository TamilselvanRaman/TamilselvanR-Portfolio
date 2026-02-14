'use client';

import { useEffect, useState, FormEvent } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { getProjects, addProject, updateProject, deleteProject, uploadProjectImage, updateProjectsOrder } from '@/lib/projects';
import { Project, ProjectInput } from '@/types/project';
import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes, FaGripVertical, FaEnvelope, FaProjectDiagram, FaUserShield, FaImage } from 'react-icons/fa';
import { Reorder } from 'framer-motion';
import ImageUpload from '@/components/admin/ImageUpload';

interface Message {
  id: string;
  name: string;
  email: string;
  projectDetails: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    if (!confirm('Are you sure you want to delete this message?')) return;
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
    if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
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
      alert('Project order updated successfully.');
    } else {
      alert('Failed to update project order. Please try again.');
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* OVERVIEW SECTION */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Messages</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{messages.length}</p>
          </div>
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
            <FaEnvelope size={20} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Active Projects</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{projects.length}</p>
          </div>
          <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
            <FaProjectDiagram size={20} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Admin Status</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <p className="text-lg font-bold text-gray-900">Active</p>
            </div>
          </div>
          <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
            <FaUserShield size={20} />
          </div>
        </div>
      </section>

      {/* MESSAGES SECTION */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Recent Messages</h2>
        </div>
        
        {messages.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No new messages</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-medium">
                <tr>
                  <th className="px-6 py-3">Sender</th>
                  <th className="px-6 py-3">Contact</th>
                  <th className="px-6 py-3">Message</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {messages.map((message) => (
                  <tr key={message.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{message.name}</td>
                    <td className="px-6 py-4 text-gray-600">{message.email}</td>
                    <td className="px-6 py-4 text-gray-600 max-w-xs truncate" title={message.projectDetails}>
                      {message.projectDetails}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {message.createdAt?.toDate?.()?.toLocaleDateString() || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => deleteMessage(message.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-md transition-colors font-medium text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* PROJECT MANAGEMENT SECTION */}
      <section>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
            <p className="text-sm text-gray-500 mt-1">Manage and reorder your portfolio items</p>
          </div>
          <div className="flex gap-3">
            {hasUnsavedOrder && (
              <button
                onClick={saveOrder}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2"
              >
                <FaSave /> Save Order
              </button>
            )}
            <button
              onClick={() => setShowForm(true)}
              className="bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-black transition-colors shadow-sm flex items-center gap-2"
            >
              <FaPlus /> New Project
            </button>
          </div>
        </div>

        {/* Project Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-200">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                <h2 className="text-lg font-bold text-gray-900">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h2>
                <button 
                  onClick={resetProjectForm}
                  className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <FaTimes size={18} />
                </button>
              </div>

              <form onSubmit={handleProjectSubmit} className="p-6 md:p-8 space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="e.g. E-commerce Dashboard"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 h-32 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="Brief description of the project..."
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Project Image</label>
                      <ImageUpload 
                        currentImage={formData.imageUrl} 
                        onImageSelected={setImageFile}
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Technologies</label>
                      <div className="flex gap-2 mb-3">
                        <input
                          type="text"
                          value={techInput}
                          onChange={(e) => setTechInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                          className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                          placeholder="Add tech (e.g. React)"
                        />
                        <button 
                          type="button" 
                          onClick={addTechnology}
                          className="bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-black transition-colors"
                        >
                          Add
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2 min-h-[40px]">
                        {formData.technologies.map((tech, index) => (
                          <span key={index} className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium border border-gray-200">
                            {tech}
                            <button 
                              type="button" 
                              onClick={() => removeTechnology(index)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              &times;
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">GitHub URL</label>
                        <input 
                          type="url" 
                          value={formData.githubUrl} 
                          onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })} 
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                          placeholder="https://github.com/..."
                          required 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Live URL</label>
                        <input 
                          type="url" 
                          value={formData.liveUrl} 
                          onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })} 
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                          placeholder="https://..."
                          required 
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                      <input 
                        type="checkbox" 
                        id="featured"
                        checked={formData.featured} 
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} 
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300" 
                      />
                      <label htmlFor="featured" className="text-sm font-medium text-gray-900 cursor-pointer">
                        Feature this project (show on homepage)
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 flex gap-4 justify-end">
                  <button 
                    type="button" 
                    onClick={resetProjectForm}
                    className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    {editingProject ? 'Save Changes' : 'Create Project'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Project List */}
        <Reorder.Group axis="y" values={projects} onReorder={handleReorder} className="space-y-4">
          {projects.map((project, index) => (
            <Reorder.Item 
              key={project.id} 
              value={project}
              className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-0 overflow-hidden group cursor-default"
              whileDrag={{ scale: 1.01, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
            >
              {/* Drag Handle & Index */}
              <div className="bg-gray-50 border-r border-gray-100 w-12 flex flex-col items-center justify-center cursor-move hover:bg-gray-100 transition-colors gap-2">
                <span className="text-xs font-bold text-gray-400">#{index + 1}</span>
                <FaGripVertical size={16} className="text-gray-400 group-hover:text-gray-600" />
              </div>

              {/* Image */}
              <div className="h-48 md:h-auto md:w-48 bg-gray-100 relative flex-shrink-0 border-b md:border-b-0 md:border-r border-gray-100">
                {project.imageUrl ? (
                  <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <FaImage size={32} />
                  </div>
                )}
                {project.featured && (
                  <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                    FEATURED
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{project.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-1">{project.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEditProject(project)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => handleDeleteProject(project.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.technologies.slice(0, 5).map((tech, i) => (
                    <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="text-xs text-gray-400 py-1">+{project.technologies.length - 5} more</span>
                  )}
                </div>
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>

        {projects.length === 0 && (
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <FaProjectDiagram size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">No Projects Found</h3>
            <p className="text-gray-500 mb-6">Get started by adding your first project to the portfolio.</p>
            <button 
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
            >
              Create Project
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
