import { collection, getDocs, query } from 'firebase/firestore';

export const useOwuStore = defineStore('owu', () => {
  const { db } = useFirebase();
  const owuArray = ref();
  const activeOwu = ref();

  watch(owuArray, () => {
    activeOwu.value = owuArray.value.find((item) => item?.active);
  });

  async function fetchOwu() {
    const items = [];
    const colRef = collection(db, 'owu');
    const q = query(colRef);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      items.push({ ...doc.data(), id: doc.id });
    });
    owuArray.value = items;
  }

  return {
    activeOwu,
    fetchOwu,
  };
});
