interface Link {
  text: string;
  url: string;
}

export interface Card {
  image: string;
  link: Link;
  text: string;
  title: string;
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
  cards?: Card[];
  order: number;
}
