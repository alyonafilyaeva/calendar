

export let baseUrl = "http://185.84.163.185/api";

let months = {
  1: "января",
  2: "февраля",
  3: "марта",
  4: "апреля",
  5: "мая",
  6: "июня",
  7: "июля",
  8: "августа",
  9: "сентября",
  10: "октября",
  11: "ноября",
  12: "декабря",
};

export function toDate(date = "2024-01-01") {
  let [year, month, day] = date.split("-");
  let today = new Date().toISOString().slice(0, 10);
  let newDate;
  date == today
    ? (newDate = "Сегодня")
    : (newDate = `${day} ${months[month.replace(/^0+/, "")]}`);
  return newDate;
}

let days = {
  1: "Понедельник",
  2: "Вторник",
  3: "Среда",
  4: "Четверг",
  5: "Пятница",
  6: "Суббота",
  7: "Воскресенье",
};

export function toDay(day) {
  return days[day];
}

export function getMonth(month) {
  let months = {
    1: "Январь",
    2: "Февраль",
    3: "Март",
    4: "Апрель",
    5: "Май",
    6: "Июнь",
    7: "Июль",
    8: "Август",
    9: "Сентябрь",
    10: "Октябрь",
    11: "Ноябрь",
    12: "Декабрь",
  };

  return months[month]
}
export const Swimming = { key: "Swimming", color: "#A12FAA", selectedDotColor: "blue" };
export const Drowing = { key: "Drowing", color: "#FD9800", selectedDotColor: "blue" };

export let family = [
  {
    id: 3,
    name: "Папа",
    type: "Родитель",
    avatar: "../assets/images/Dad.png",
  },
  {
    id: 4,
    name: "Бабушка",
    type: "Родитель",
    avatar: "../assets/images/Grandma.png",
  },
  {
    id: 5,
    name: "Дедушка",
    type: "Родитель",
    avatar: "../assets/images/Grandpa.png",
  },
];

export let addresses = [
  {
    title: "Плавание Петя",
    address: "Ленина, 8а",
  },
  {
    title: "Программирование",
    address: "Малышева, 18",
  },
];

export let categories = [
  { id: 1, title: "Спорт" },
  { id: 2, title: "Моё" },
  { id: 3, title: "Программирование" },
];

export let times = [
  { id: 1, title: "Нет" },
  { id: 2, title: "1 час" },
  { id: 3, title: "20 мин" },
];

export let timing = [
  { id: 1, title: "Вторник", start: "15:00", end: "16:00" },
  { id: 2, title: "Среда", start: "15:00", end: "16:00" },
  { id: 3, title: "Четверг", start: "15:00", end: "16:00" },
];

export let colors = [
  { id: 1, img: `../../assets/images/Boy.png` },
  /* { id: 2, color: "#20F936" },
  { id: 3, color: "#976A31" },
  { id: 4, color: "#D90606" },
  { id: 5, color: "#FFE641" },
  { id: 6, color: "#FD9800" },
  { id: 7, color: "#00C0FD" },
  { id: 8, color: "#A12FAA" },
  { id: 9, color: "#319766" },
  { id: 10, color: "#222" }, */
];

export let members = [
  { id: 1, member: "Ребёнок" },
  { id: 2, member: "Родитель" },
];

export let events = [
  {
    id: 1,
    child: { id: 1, name: "Аня" },
    location: "Малышева, 83",
    owner: "Я",
    main_name: "Событие 1",
    event_date: "2023-12-17",
    event_time_start: "18:00",
    event_time_finish: "20:00",
    event_description: "Какой-то текст",
    schedule: {
      id: 1,
      days: [
        {
          day_of_week: 1,
          time_start: "10:00:00",
          time_finish: "12:00:00",
        },
        {
          day_of_week: 3,
          time_start: "12:00:00",
          time_finish: "14:00:00",
        },
      ],
    },
  },
  {
    id: 2,
    child: { id: 1, name: "Аня" },
    location: "Малышева, 83",
    owner: "Я",
    main_name: "Событие 2",
    event_date: "2023-12-18",
    event_time_start: "18:00",
    event_time_finish: "20:00",
    event_description: "Какой-то текст",
    schedule: {
      id: 1,
      days: [
        {
          day_of_week: 1,
          time_start: "10:00:00",
          time_finish: "12:00:00",
        },
        {
          day_of_week: 3,
          time_start: "12:00:00",
          time_finish: "14:00:00",
        },
      ],
    },
  },
  {
    id: 3,
    child: { id: 1, name: "Аня" },
    location: "Малышева, 83",
    owner: "Я",
    main_name: "Событие 3",
    event_date: "2023-12-18",
    event_time_start: "18:00",
    event_time_finish: "20:00",
    event_description: "Какой-то текст",
    schedule: {
      id: 1,
      days: [
        {
          day_of_week: 1,
          time_start: "10:00:00",
          time_finish: "12:00:00",
        },
        {
          day_of_week: 3,
          time_start: "12:00:00",
          time_finish: "14:00:00",
        },
      ],
    },
  },
];

export const initialProfile = {
  username: "admin",
  email: "admin@admin.admin",
  children: [
    {
      id: 1,
      name: "Аня",
    },
    {
      id: 2,
      name: "Петя",
    },
  ],
  locations: [
    {
      id: 1,
      address: "Ленина 58а",
      latitude: 56.84146517265165,
      longitude: 60.630629898824786,
    },
  ],
};
