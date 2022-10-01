import app from "./setup";
import { getFirestore, doc, collection, addDoc, setDoc, getDoc, getDocs, deleteDoc, updateDoc } from "firebase/firestore";

const db = getFirestore(app);

export async function addQuiz() {
    const docRef = await addDoc(collection(db, "quizzes"), { name: "" });
    await setDoc(doc(db, `quizzes/${docRef.id}/data`, "0"), { term: "", definition: "", starred: false});
    return docRef.id;
}

export async function getQuiz(id) {
    const docSnap = await getDoc(doc(db, "quizzes", id));

    if (docSnap.exists()) {
        const data = await getDocs(collection(db, `quizzes/${id}/data`));
        const res = { name: docSnap.data().name, data: [] };
        data.forEach((card) => res.data.push({...card.data(), id: card.id}));
        return res;
    } else {
        return null;
    }
}

export async function getAllQuizNames() {
    const data = await getDocs(collection(db, "quizzes"));
    const res = [];
    data.forEach((card) => res.push({name: card.data().name, id: card.id}));
    return res;
}

export async function removeQuiz(id) {
    await deleteDoc(doc(db, "quizzes", id));
}

export async function updateQuizName(id, name) {
    await updateDoc(doc(db, "quizzes", id), { name: name });
}

export async function updateQuizCard(id, index, card) {
    await updateDoc(doc(db, `quizzes/${id}/data`, index.toString()), card);
}