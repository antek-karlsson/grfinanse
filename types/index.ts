interface Link {
  text: string;
  url: string;
}

export interface Card {
  type: 'card';
  value: {
    card: {
      image?: string;
      link?: Link;
      text: string;
      title: string;
    };
  };
}
export interface Title {
  id: string;
  active: boolean;
  title: string;
  background: string;
  text_color: string;
  subtitle: string;
}

export interface Section {
  image_left?: string;
  image_right?: string;
  background?: string;
  title?: string;
  subtitle?: string;
  text?: string;
  link?: Link;
  is_dark: boolean;
  card?: Card[];
  cards?: Card[];
  order: number;
}

interface Contact {
  city: string;
  email: string;
  street: string;
  telephone: string;
  title: string;
  zip_code: string;
}

interface Logo {
  type: 'logo';
  value: {
    image: string;
    name: string;
    link: string;
  };
}

export interface Footer {
  contact: Contact;
  logos: Logo[];
  active: boolean;
}
