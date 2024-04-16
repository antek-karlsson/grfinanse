import { collection, getDocs, query } from 'firebase/firestore';

export const useRodoStore = defineStore('rodo', () => {
  const { db } = useFirebase();
  const rodoArray = ref();
  const activeRodo = ref();

  watch(rodoArray, () => {
    activeRodo.value = rodoArray.value.find((item) => item?.active);
  });

  async function fetchRodo() {
    const items = [];
    const colRef = collection(db, 'rodo');
    const q = query(colRef);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      items.push({ ...doc.data(), id: doc.id });
    });
    rodoArray.value = items;
  }

  return {
    activeRodo,
    fetchRodo,
  };
});
