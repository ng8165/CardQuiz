import app from "./setup";
import { getFirestore, doc, collection, addDoc, serverTimestamp, getDoc, getDocs, orderBy, query, deleteDoc, updateDoc } from "firebase/firestore";

const db = getFirestore(app);

export async function addQuiz() {
    // GET new
    const { id } = await addDoc(collection(db, "quizzes"), { name: "" });
    await addQuizCard(id);
    return id;
}

export async function addQuizCard(quizId) {
    // GET [quiz]/new
    const card = await addDoc(collection(db, `quizzes/${quizId}/data`),
        { term: "", definition: "", starred: false, created: serverTimestamp() });
    return card.id;
}

export async function getQuiz(quizId) {
    // GET [quiz]
    const quiz = await getDoc(doc(db, "quizzes", quizId));
    if (!quiz.exists()) return null;

    const cards = await getDocs(query(collection(db, `quizzes/${quizId}/data`), orderBy("created")));
    return {
        ...quiz.data(),
        data: cards.docs.map((card) => {
            const data = card.data();
            delete data.created;
            return {...data, id: card.id}
        }),
    };
}

export async function getAllQuizzes() {
    // GET all
    const quizzes = await getDocs(collection(db, "quizzes"));
    return quizzes.docs.map((quiz) => (
        {...quiz.data(), id: quiz.id}
    ));
}

export async function deleteQuiz(quizId) {
    // DELETE [quiz]
    const cards = await getDocs(collection(db, `quizzes/${quizId}/data`));
    cards.forEach(async (card) => await deleteDoc(card.ref));
    await deleteDoc(doc(db, "quizzes", quizId));
}

export async function deleteQuizCard(quizId, cardId) {
    // DELETE [quiz]/[card]
    await deleteDoc(doc(db, `quizzes/${quizId}/data`, cardId));
}

export async function updateQuizName(quizId, name) {
    // PATCH [quiz]
    await updateDoc(doc(db, "quizzes", quizId), { name: name });
}

export async function updateQuizCard(quizId, cardId, card) {
    // PATCH [quiz]/[card]
    await updateDoc(doc(db, `quizzes/${quizId}/data`, cardId.toString()), card);
}