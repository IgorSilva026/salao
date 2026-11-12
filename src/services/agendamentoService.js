import {collection,addDoc,getDocs,query,where,serverTimestamp,doc,getDoc,updateDoc,onSnapshot,} from 'firebase/firestore';

import { db } from '../../lib/firebase';

export async function verificarAdministrador(uid) {
  const usuarioRef = doc(db, 'usuarios', uid);
  const usuarioSnap = await getDoc(usuarioRef);

  return (
    usuarioSnap.exists() &&
    usuarioSnap.data().tipo === 'admin'
  );
}

export async function buscarServicosAtivos() {
  const resultado = await getDocs(
    query(
      collection(db, 'servicos'),
      where('ativo', '==', true)
    )
  );

  return resultado.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));
}

export function observarAgendamentos(callback, onError) {
  return onSnapshot(
    collection(db, 'agendamentos'),
    (resultado) => {
      const lista = resultado.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));

      lista.sort((a, b) => {
        const dataA = a.dataHora?.toDate?.() || new Date(a.dataHora);
        const dataB = b.dataHora?.toDate?.() || new Date(b.dataHora);

        return dataA - dataB;
      });

      callback(lista);
    },
    onError
  );
}

export function observarMeusAgendamentos(uid, callback, onError) {
  return onSnapshot(
    query(
      collection(db, 'agendamentos'),
      where('usuarioId', '==', uid)
    ),
    (resultado) => {
      const lista = resultado.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));

      lista.sort((a, b) => {
        const dataA = a.dataHora?.toDate?.() || new Date(a.dataHora);
        const dataB = b.dataHora?.toDate?.() || new Date(b.dataHora);

        return dataA - dataB;
      });

      callback(lista);
    },
    onError
  );
}

export async function solicitarAgendamento(dados) {
  return addDoc(collection(db, 'agendamentos'), {
    ...dados,
    criadoEm: serverTimestamp(),
  });
}

export async function atualizarStatusAgendamento(id, novoStatus) {
  return updateDoc(
    doc(db, 'agendamentos', id),
    {
      status: novoStatus,
    }
  );
}
