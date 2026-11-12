import {collection,addDoc,updateDoc,deleteDoc,doc,getDoc,onSnapshot,serverTimestamp,} from 'firebase/firestore';

import { db } from '../../lib/firebase';

export async function verificarAdministrador(uid) {
  const usuarioRef = doc(db, 'usuarios', uid);
  const usuarioSnap = await getDoc(usuarioRef);

  return (
    usuarioSnap.exists() &&
    usuarioSnap.data().tipo === 'admin'
  );
}

export function observarServicos(callback, onError) {
  return onSnapshot(
    collection(db, 'servicos'),
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

export async function salvarServico(dados, editingId) {
  if (editingId) {
    return updateDoc(
      doc(db, 'servicos', editingId),
      dados
    );
  }

  return addDoc(collection(db, 'servicos'), {
    ...dados,
    ativo: true,
    criadoEm: serverTimestamp(),
  });
}

export async function excluirServico(id) {
  return deleteDoc(doc(db, 'servicos', id));
}
