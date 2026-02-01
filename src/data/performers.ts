import type { ImageSourcePropType } from "react-native"

export type Performer = {
  id: string
  name: string
  title: string
  rating: number
  reviews: number
  price: string
  location: string
  experience: string
  availability: string
  badge: string
  about: string
  tags: string[]
  image: ImageSourcePropType
}

export const performers: Performer[] = [
  {
    id: "perf_1",
    name: "Алина Петрова",
    title: "Медсестра по паллиативному уходу",
    rating: 4.9,
    reviews: 128,
    price: "от 1 900 ₽/час",
    location: "ЮАО",
    experience: "8 лет опыта",
    availability: "доступна сегодня",
    badge: "Рекомендована",
    about: "Медицинский уход, контроль боли, поддержка семьи и пациента.",
    tags: ["Хосписный опыт", "Инъекции", "Ночные смены"],
    image: require("../../assets/performers/perf_1.png"),
  },
  {
    id: "perf_2",
    name: "Михаил Юдин",
    title: "Сиделка с мед. подготовкой",
    rating: 4.8,
    reviews: 92,
    price: "от 1 600 ₽/час",
    location: "САО",
    experience: "6 лет опыта",
    availability: "выезд 24/7",
    badge: "Надёжный",
    about: "Гигиенический уход, питание, помощь в передвижении, дневные смены.",
    tags: ["Лежачие пациенты", "Питание", "Патронаж"],
    image: require("../../assets/performers/perf_2.png"),
  },
  {
    id: "perf_3",
    name: "Екатерина Ли",
    title: "Психолог по поддержке семьи",
    rating: 5.0,
    reviews: 156,
    price: "от 3 200 ₽/сессия",
    location: "ЗАО",
    experience: "9 лет опыта",
    availability: "завтра",
    badge: "Премиум",
    about: "Поддержка семьи, работа с тревогой, выгорание и принятие.",
    tags: ["Семейная терапия", "Кризис", "Онко"],
    image: require("../../assets/performers/perf_3.png"),
  },
  {
    id: "perf_4",
    name: "Илья Громов",
    title: "Фельдшер выездной службы",
    rating: 4.7,
    reviews: 64,
    price: "от 2 400 ₽/выезд",
    location: "ЦАО",
    experience: "7 лет опыта",
    availability: "вечером",
    badge: "Быстрый отклик",
    about: "Оценка состояния, перевязки, связь с врачом, помощь семье.",
    tags: ["Срочный выезд", "Перевязки", "Контроль состояния"],
    image: require("../../assets/performers/perf_4.png"),
  },
]
