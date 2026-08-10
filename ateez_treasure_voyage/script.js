const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuToggle?.addEventListener("click", () => {
  nav.classList.toggle("open");
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

// -------------------- PLAYLIST REAL CON YOUTUBE --------------------
const tracks = [...document.querySelectorAll(".track")];
const nowPlaying = document.querySelector("#nowPlaying");
const trackTime = document.querySelector("#trackTime");
const progressBar = document.querySelector("#progressBar");
const playButton = document.querySelector("#playButton");
const youtubeCurrent = document.querySelector("#youtubeCurrent");

let currentIndex = 0;
let ytPlayer = null;
let playerReady = false;
let repeat = false;
let shuffle = false;

// IDs de videos oficiales de YouTube para las canciones mostradas.
function currentTrack() {
  return tracks[currentIndex];
}

function updateTrackUI(index) {
  currentIndex = index;
  tracks.forEach((item, i) => {
    item.classList.toggle("active", i === index);
    item.querySelector("i").textContent = i === index ? "▶" : "○";
  });

  const track = currentTrack();
  nowPlaying.textContent = track.dataset.track;
  trackTime.textContent = track.dataset.time || "—";

  if (youtubeCurrent) {
    youtubeCurrent.href = `https://www.youtube.com/watch?v=${track.dataset.video}`;
  }
}

function loadTrack(index, autoplay = true) {
  if (!tracks.length) return;

  if (index < 0) index = tracks.length - 1;
  if (index >= tracks.length) index = 0;

  updateTrackUI(index);

  if (ytPlayer && playerReady) {
    ytPlayer.loadVideoById(tracks[index].dataset.video);
    if (!autoplay) ytPlayer.pauseVideo();
  }
}

tracks.forEach((track, index) => {
  track.addEventListener("click", () => loadTrack(index, true));
});

function onYouTubeIframeAPIReady() {
  ytPlayer = new YT.Player("youtubePlayer", {
    videoId: tracks[0]?.dataset.video || "",
    playerVars: {
      autoplay: 0,
      controls: 1,
      rel: 0,
      modestbranding: 1,
      playsinline: 1
    },
    events: {
      onReady: () => {
        playerReady = true;
        updateTrackUI(0);
      },
      onStateChange: event => {
        if (event.data === YT.PlayerState.PLAYING) {
          playButton.textContent = "Ⅱ";
        } else {
          playButton.textContent = "▶";
        }

        if (event.data === YT.PlayerState.ENDED) {
          if (repeat) {
            ytPlayer.playVideo();
          } else {
            nextTrack();
          }
        }
      }
    }
  });
}

playButton?.addEventListener("click", () => {
  if (!ytPlayer || !playerReady) return;

  const state = ytPlayer.getPlayerState();
  if (state === YT.PlayerState.PLAYING) {
    ytPlayer.pauseVideo();
  } else {
    ytPlayer.playVideo();
  }
});

function nextTrack() {
  let next;

  if (shuffle && tracks.length > 1) {
    do {
      next = Math.floor(Math.random() * tracks.length);
    } while (next === currentIndex);
  } else {
    next = (currentIndex + 1) % tracks.length;
  }

  loadTrack(next, true);
}

function previousTrack() {
  loadTrack((currentIndex - 1 + tracks.length) % tracks.length, true);
}

document.querySelector("#nextButton")?.addEventListener("click", nextTrack);
document.querySelector("#prevButton")?.addEventListener("click", previousTrack);

document.querySelector("#repeatButton")?.addEventListener("click", event => {
  repeat = !repeat;
  event.currentTarget.classList.toggle("enabled", repeat);
  showToast(repeat ? "Repetición activada" : "Repetición desactivada");
});

document.querySelector("#shuffleButton")?.addEventListener("click", event => {
  shuffle = !shuffle;
  event.currentTarget.classList.toggle("enabled", shuffle);
  showToast(shuffle ? "Modo aleatorio activado" : "Modo aleatorio desactivado");
});

// Actualiza la barra de progreso usando el reproductor real.
setInterval(() => {
  if (!ytPlayer || !playerReady) return;

  const duration = ytPlayer.getDuration();
  const current = ytPlayer.getCurrentTime();

  if (duration > 0) {
    progressBar.style.width = `${(current / duration) * 100}%`;

    const mins = Math.floor(current / 60);
    const secs = Math.floor(current % 60).toString().padStart(2, "0");
    const timeElement = document.querySelector(".player-time span:first-child");
    if (timeElement) timeElement.textContent = `${mins}:${secs}`;
  }
}, 500);

// -------------------- FICHAS DE THE CREW --------------------
const memberData = {
  Hongjoong: {
    fullName: "Kim Hong-joong",
    birthday: "7 de noviembre de 1998",
    zodiac: "Escorpio",
    role: "Líder · rapero · compositor",
    description: "Capitán de ATEEZ y una de las figuras creativas del grupo. Se destaca por su liderazgo, su rap y su participación en la composición y producción."
  },
  Seonghwa: {
    fullName: "Park Seong-hwa",
    birthday: "3 de abril de 1998",
    zodiac: "Aries",
    role: "Vocalista · performer",
    description: "El mayor de la tripulación. Es reconocido por su voz, su presencia escénica y su versatilidad como performer."
  },
  Yunho: {
    fullName: "Jeong Yun-ho",
    birthday: "23 de marzo de 1999",
    zodiac: "Aries",
    role: "Bailarín · vocalista · performer",
    description: "Uno de los grandes bailarines de la tripulación. Su energía y precisión en el escenario son parte fundamental del estilo de ATEEZ."
  },
  Yeosang: {
    fullName: "Kang Yeo-sang",
    birthday: "15 de junio de 1999",
    zodiac: "Géminis",
    role: "Vocalista · performer · visual",
    description: "Forma parte de la línea de performers y vocalistas. Su presencia escénica y sus características visuales lo convierten en una pieza muy reconocible de la tripulación."
  },
  San: {
    fullName: "Choi San",
    birthday: "10 de julio de 1999",
    zodiac: "Cáncer",
    role: "Vocalista · performer",
    description: "Conocido por su intensidad y expresividad sobre el escenario. Su interpretación y energía son algunos de los rasgos más destacados de sus actuaciones."
  },
  Mingi: {
    fullName: "Song Min-gi",
    birthday: "9 de agosto de 1999",
    zodiac: "Leo",
    role: "Rapero · performer",
    description: "Rapero de ATEEZ con una voz grave muy característica. También participa como compositor y destaca por su presencia escénica."
  },
  Wooyoung: {
    fullName: "Jung Woo-young",
    birthday: "26 de noviembre de 1999",
    zodiac: "Sagitario",
    role: "Bailarín · vocalista · performer",
    description: "Reconocido por su baile, expresividad y personalidad sobre el escenario. Es una parte importante de la línea de performance del grupo."
  },
  Jongho: {
    fullName: "Choi Jong-ho",
    birthday: "12 de octubre de 2000",
    zodiac: "Libra",
    role: "Vocalista principal · maknae",
    description: "El integrante más joven de ATEEZ y vocalista principal. Es especialmente reconocido por la potencia y estabilidad de su voz."
  }
};

const memberModal = document.querySelector("#memberModal");
const modalClose = document.querySelector("#modalClose");

function openMemberProfile(name) {
  const member = memberData[name];
  if (!member || !memberModal) return;

  document.querySelector("#profileName").textContent = name.toUpperCase();
  document.querySelector("#profileRole").textContent = member.role.toUpperCase();
  document.querySelector("#profileFullName").textContent = member.fullName;
  document.querySelector("#profileBirthday").textContent = member.birthday;
  document.querySelector("#profileZodiac").textContent = member.zodiac;
  document.querySelector("#profilePosition").textContent = member.role;
  document.querySelector("#profileDescription").textContent = member.description;

  memberModal.classList.add("open");
  memberModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeMemberProfile() {
  memberModal?.classList.remove("open");
  memberModal?.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll(".member-card").forEach(card => {
  card.addEventListener("click", () => openMemberProfile(card.dataset.member));
});

modalClose?.addEventListener("click", closeMemberProfile);
document.querySelector("[data-close-modal]")?.addEventListener("click", closeMemberProfile);

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeMemberProfile();
});

document.querySelector("#crewButton")?.addEventListener("click", () => {
  document.querySelector("#crew")?.scrollIntoView({ behavior: "smooth" });
});

document.querySelector("#galleryButton")?.addEventListener("click", () => {
  showToast("Acá podés cargar más fotos de la tripulación.");
});

// -------------------- ACTIVE NAV --------------------
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav a");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => link.classList.remove("active"));
      const active = document.querySelector(`.nav a[href="#${entry.target.id}"]`);
      active?.classList.add("active");
    });
  },
  { rootMargin: "-30% 0px -55% 0px" }
);

sections.forEach(section => observer.observe(section));
