import app from "./setup";
import { getFirestore, doc, collection, addDoc, serverTimestamp, getDoc, getDocs, orderBy, query, deleteDoc, updateDoc } from "firebase/firestore";

const db = getFirestore(app);

export async function addQuiz() {
    const docRef = await addDoc(collection(db, "quizzes"), { name: "" });
    const { id } = docRef;
    await addQuizCard(id)
    return id;
}

export async function addQuizCard(quizId) {
    const card = await addDoc(collection(db, `quizzes/${quizId}/data`), { term: "", definition: "", starred: false, created: serverTimestamp() });
    return card.id;
}

export async function getQuiz(quizId) {
    const docSnap = await getDoc(doc(db, "quizzes", quizId));

    if (!docSnap.exists()) return null;

    const cards = await getDocs(query(collection(db, `quizzes/${quizId}/data`), orderBy("created")));
    const res = { name: docSnap.data().name, data: [] };
    cards.forEach((card) => {
        const {term, definition, starred} = card.data();
        res.data.push({term: term, definition: definition, starred: starred, id: card.id})
    });
    return res;
}

export async function getAllQuizNames() {
    const data = await getDocs(collection(db, "quizzes"));
    const res = [];
    data.forEach((card) => res.push({name: card.data().name, id: card.id}));
    return res;
}

export async function deleteQuiz(quizId) {
    const cards = await getDocs(collection(db, `quizzes/${quizId}/data`));
    cards.forEach(async (card) => await deleteDoc(card.ref));
    await deleteDoc(doc(db, "quizzes", quizId));
}

export async function deleteQuizCard(quizId, cardId) {
    await deleteDoc(doc(db, `quizzes/${quizId}/data`, cardId));
}

export async function updateQuizName(quizId, name) {
    await updateDoc(doc(db, "quizzes", quizId), { name: name });
}

export async function updateQuizCard(quizId, cardId, card) {
    await updateDoc(doc(db, `quizzes/${quizId}/data`, cardId.toString()), card);
}