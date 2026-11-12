import {createUserWithEmailAndPassword,updateProfile,} from 'firebase/auth';

import {doc,setDoc,serverTimestamp,} from 'firebase/firestore';

import { auth, db } from '../../lib/firebase';

export async function cadastrarUsuario(nome, email, senha) {
  if (!nome.trim() || !email.trim() || !senha) {
    throw new Error('Preencha todos os campos.');
  }

  if (senha.length < 6) {
    throw new Error('A senha precisa ter pelo menos 6 caracteres.');
  }

  const credential = await createUserWithEmailAndPassword(
    auth,
    email.trim(),
    senha
  );

  await updateProfile(credential.user, {
    displayName: nome.trim(),
  });

  await setDoc(doc(db, 'usuarios', credential.user.uid), {
    nome: nome.trim(),
    email: email.trim(),
    tipo: 'admin',
    criadoEm: serverTimestamp(),
  });

  return credential.user;
}
