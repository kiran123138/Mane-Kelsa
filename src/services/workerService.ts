import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  query, 
  where, 
  addDoc, 
  updateDoc, 
  serverTimestamp,
  orderBy,
  limit
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { Worker, Category } from '../types';

const WORKERS_COLLECTION = 'workers';
const CATEGORIES_COLLECTION = 'categories';

export async function getCategories(): Promise<Category[]> {
  try {
    const querySnapshot = await getDocs(collection(db, CATEGORIES_COLLECTION));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Category));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, CATEGORIES_COLLECTION);
    return [];
  }
}

export async function getWorkers(cat?: string): Promise<Worker[]> {
  try {
    const workersRef = collection(db, WORKERS_COLLECTION);
    let q = query(workersRef, orderBy('rating', 'desc'), limit(20));
    
    if (cat) {
      q = query(workersRef, where('category', '==', cat), orderBy('rating', 'desc'));
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Worker));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, WORKERS_COLLECTION);
    return [];
  }
}

export async function getWorkerById(id: string): Promise<Worker | null> {
  try {
    const docRef = doc(db, WORKERS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Worker;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `${WORKERS_COLLECTION}/${id}`);
    return null;
  }
}

export async function createWorkerListing(workerData: Partial<Worker>) {
  try {
    const docRef = await addDoc(collection(db, WORKERS_COLLECTION), {
      ...workerData,
      rating: 0,
      isVerified: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, WORKERS_COLLECTION);
    return null;
  }
}
