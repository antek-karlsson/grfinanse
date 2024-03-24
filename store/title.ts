import { collection, getDocs, query } from 'firebase/firestore';
import type { Title } from '~/types';

export const useTitleStore = defineStore('title', () => {
  const { db } = useFirebase();
  const titleArray = ref<Title[]>();
  const activeTitle = ref<Title>();

  watch(titleArray, () => {
    activeTitle.value = titleArray.value.find((item) => item.active);
  });

  async function fetchTitleArray() {
    const items = [];
    const colRef = collection(db, 'title');
    const q = query(colRef);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      items.push({ ...doc.data(), id: doc.id });
    });
    titleArray.value = items;
  }

  return {
    titleArray,
    activeTitle,
    fetchTitleArray,
  };
});
