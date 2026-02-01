import type { ImageSourcePropType } from "react-native";

export type Performer = {
  id: string;
  name: string;
  title: string;
  rating: number;
  reviews: number;
  price: string;
  location: string;
  experience: string;
  availability: string;
  badge: string;
  about: string;
  tags: string[];
  image: ImageSourcePropType;
};

export const performers: Performer[] = [
  {
    id: "perf_1",
    name: "Алина Петрова",
    title: "Няня и бебиситтер",
    rating: 4.9,
    reviews: 128,
    price: "от 1 200 ₽/час",
    location: "Хамовники",
    experience: "6 лет опыта",
    availability: "сегодня свободна",
    badge: "Топ-исполнитель",
    about: "Тёплая няня для малышей, спокойные игры и аккуратный режим.",
    tags: ["Младенцы", "Английский", "Вечерние смены"],
    image: require("../../assets/performers/perf_1.png")
  },
  {
    id: "perf_2",
    name: "Михаил Юдин",
    title: "Домашний мастер",
    rating: 4.8,
    reviews: 92,
    price: "от 900 ₽/час",
    location: "Сокол",
    experience: "10 лет опыта",
    availability: "на неделе",
    badge: "Надёжный",
    about: "Сборка, мелкий ремонт, аккуратный подход и свой инструмент.",
    tags: ["Сантехника", "Электрика", "Мебель"],
    image: require("../../assets/performers/perf_2.png")
  },
  {
    id: "perf_3",
    name: "Екатерина Ли",
    title: "Клинер",
    rating: 5.0,
    reviews: 156,
    price: "от 1 500 ₽/заказ",
    location: "Раменки",
    experience: "5 лет опыта",
    availability: "завтра",
    badge: "Премиум",
    about: "Тщательная уборка, гипоаллергенные средства, чек-лист.",
    tags: ["Глубокая уборка", "Эко", "Окна"],
    image: require("../../assets/performers/perf_3.png")
  },
  {
    id: "perf_4",
    name: "Илья Громов",
    title: "Выгуливание собак",
    rating: 4.7,
    reviews: 64,
    price: "от 600 ₽/прогулка",
    location: "ЦАО",
    experience: "4 года опыта",
    availability: "вечером",
    badge: "Быстрый отклик",
    about: "Долгие прогулки, фотоотчёт, бережное отношение.",
    tags: ["Крупные породы", "Фотоотчёт", "Выходные"],
    image: require("../../assets/performers/perf_4.png")
  }
];
