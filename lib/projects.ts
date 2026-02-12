import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  serverTimestamp,
  Timestamp,
  writeBatch
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './firebase';
import { Project, ProjectInput } from '@/types/project';

const PROJECTS_COLLECTION = 'projects';

// Get all projects
export async function getProjects(): Promise<Project[]> {
  try {
    const q = query(collection(db, PROJECTS_COLLECTION), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt ? (data.createdAt as Timestamp).toDate() : new Date(),
        updatedAt: data.updatedAt ? (data.updatedAt as Timestamp).toDate() : new Date(),
      } as Project;
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

// Get single project by ID
export async function getProject(id: string): Promise<Project | null> {
  try {
    const docRef = doc(db, PROJECTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt ? (data.createdAt as Timestamp).toDate() : new Date(),
        updatedAt: data.updatedAt ? (data.updatedAt as Timestamp).toDate() : new Date(),
      } as Project;
    }
    return null;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

// Add new project
export async function addProject(projectData: ProjectInput): Promise<string | null> {
  try {
    const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), {
      ...projectData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding project:', error);
    return null;
  }
}

// Update existing project
export async function updateProject(id: string, projectData: Partial<ProjectInput>): Promise<boolean> {
  try {
    const docRef = doc(db, PROJECTS_COLLECTION, id);
    await updateDoc(docRef, {
      ...projectData,
      updatedAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error('Error updating project:', error);
    return false;
  }
}

// Delete project
export async function deleteProject(id: string): Promise<boolean> {
  try {
    const docRef = doc(db, PROJECTS_COLLECTION, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting project:', error);
    return false;
  }
}

// Upload project image to Firebase Storage
export async function uploadProjectImage(file: File, projectId: string): Promise<string | null> {
  try {
    const storageRef = ref(storage, `projects/${projectId}/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
}

// Delete project image from Firebase Storage
export async function deleteProjectImage(imageUrl: string): Promise<boolean> {
  try {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
}

// Update project order (batch update)
export async function updateProjectsOrder(projects: Project[]): Promise<boolean> {
  try {
    const batch = writeBatch(db);
    
    projects.forEach((project, index) => {
      // Create a reference to the project document
      const projectRef = doc(db, 'projects', project.id);
      
      // Batch update the 'order' field
      batch.update(projectRef, { 
        order: index,
        updatedAt: serverTimestamp() 
      });
    });

    await batch.commit();
    return true;
  } catch (error) {
    console.error('Error batch updating project order:', error);
    return false;
  }
}
