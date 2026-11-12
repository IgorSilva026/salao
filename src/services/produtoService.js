import {collection,addDoc,updateDoc,deleteDoc,doc,getDoc,onSnapshot,serverTimestamp,} from 'firebase/firestore';

import { db } from '../../lib/firebase';

export async function verificarAdministrador(uid) {
  const usuarioRef = doc(db, 'usuarios', uid);
  const usuarioSnap = await getDoc(usuarioRef);

  return usuarioSnap.exists() &&
    usuarioSnap.data().tipo === 'admin';
}

export function observarProdutos(callback, onError) {
  return onSnapshot(
    collection(db, 'produtos'),
    (snapshot) => {
      const lista = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));

      callback(lista);
    },
    onError
  );
}

export async function salvarProduto(dados, editingId) {
  if (editingId) {
    return updateDoc(
      doc(db, 'produtos', editingId),
      dados
    );
  }

  return addDoc(collection(db, 'produtos'), {
    ...dados,
    ativo: true,
    criadoEm: serverTimestamp(),
  });
}

export async function excluirProduto(id) {
  return deleteDoc(doc(db, 'produtos', id));
}
