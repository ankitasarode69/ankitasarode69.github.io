const loadingScreen = document.querySelector("#loadingScreen");
window.addEventListener("load", () => {
  window.setTimeout(() => loadingScreen?.classList.add("is-hidden"), 550);
});

const currentYear = document.querySelector("#currentYear");
if (currentYear) currentYear.textContent = String(new Date().getFullYear());

const revealTargets = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealTargets.forEach((element) => observer.observe(element));
} else {
  revealTargets.forEach((element) => element.classList.add("is-visible"));
}

const chapters = [...document.querySelectorAll("[data-chapter]")];
const chapterNumber = document.querySelector("#chapterNumber");
const chapterProgress = document.querySelector("#chapterProgress");

const updateChapterProgress = () => {
  const scrollTop = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const overallProgress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
  if (chapterProgress) chapterProgress.style.height = `${overallProgress}%`;

  let activeChapter = chapters[0];
  for (const chapter of chapters) {
    if (chapter.getBoundingClientRect().top < window.innerHeight * 0.45) activeChapter = chapter;
  }
  if (chapterNumber && activeChapter) chapterNumber.textContent = activeChapter.dataset.chapter;
};

if ("onscroll" in window) {
  window.addEventListener("scroll", updateChapterProgress, { passive: true });
  updateChapterProgress();
}
