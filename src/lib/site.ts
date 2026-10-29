export const site = {
  name: "El Prado Senior Club",
  legalName: "El Prado Senior Club Corp.",
  url: "https://el-prado-senior-club.vercel.app",
  phone: "(305) 967-8776",
  phoneHref: "tel:+13059678776",
  alternatePhone: "(786) 246-6519",
  alternatePhoneHref: "tel:+17862466519",
  email: "contacto@elpradoseniorclub.example",
  emailVerified: false,
  address: "1800 W 68th St, Suite 101",
  city: "Hialeah, FL 33014",
  maps: "https://maps.google.com/?cid=5093181173537353298",
  smsHref: "sms:+13059678776",
  /**
   * Enlace a un calendario de reservas externo (Calendly, Cal.com, Google Calendar
   * appointment schedule…). Mientras sea `null`, el botón "Agendar" usa el
   * calendario integrado, que prepara la solicitud para enviarla por SMS o teléfono.
   */
  bookingUrl: null as string | null,
  /** Datos públicos verificados en octubre de 2026 (ver docs/INFORMACION-VERIFICADA.md). */
  rating: { value: "4.6", count: 18 },
};

export type Locale = "es" | "en";

export const photos = [
  { src: "/images/centro-sala.webp", es: "Un espacio para sentirse en casa", en: "A place to feel at home", altEs: "Sala de El Prado Senior Club con mesas y sillones de descanso", altEn: "El Prado Senior Club lounge with tables and comfortable recliners" },
  { src: "/images/centro-juegos.webp", es: "Aquí hay lugar para compartir", en: "Room to spend time together", altEs: "Mesas de juegos y espacios de convivencia del centro", altEn: "Game tables and gathering spaces at the center" },
  { src: "/images/centro-bienvenida.webp", es: "Siempre una cálida bienvenida", en: "Always a warm welcome", altEs: "Área de bienvenida de El Prado Senior Club en Hialeah", altEn: "Welcome area at El Prado Senior Club in Hialeah" },
  { src: "/images/centro-exterior.webp", es: "Tu club, en el corazón de Hialeah", en: "Your club, in the heart of Hialeah", altEs: "Fachada del edificio de El Prado Senior Club en W 68th Street", altEn: "El Prado Senior Club building on W 68th Street" },
];
