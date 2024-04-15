import { collection, getDocs, query } from 'firebase/firestore';
import type { Footer } from '~/types';

export const useFooterStore = defineStore('footer', () => {
  const { db } = useFirebase();
  const footerArray = ref<Footer[]>();
  const activeFooter = ref<Footer>();

  watch(footerArray, () => {
    activeFooter.value = footerArray.value.find((item) => item.active);
  });

  async function fetchFooter() {
    const items = [];
    const colRef = collection(db, 'footer');
    const q = query(colRef);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      items.push({ ...doc.data(), id: doc.id });
    });
    footerArray.value = items;
  }

  return {
    activeFooter,
    fetchFooter,
  };
});
