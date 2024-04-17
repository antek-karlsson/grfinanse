import { collection, getDocs, query } from 'firebase/firestore';
import type { Section } from '~/types';

export const usePartnerSectionsStore = defineStore('partnerSections', () => {
  const { db } = useFirebase();
  const sections = ref<Section[]>();

  async function fetchSections() {
    const items = [];
    const colRef = collection(db, 'partner_sections');
    const q = query(colRef);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      items.push({ ...doc.data(), id: doc.id });
    });
    sections.value = items;
  }

  return {
    sections,
    fetchSections,
  };
});
