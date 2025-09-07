
<!-- Lightbox -->
		let gallery = [];
		let currentIndex = 0;

		function openLightbox(mediaItems, title, tagsHTML, description) {
			gallery = mediaItems;
			currentIndex = 0;

			document.getElementById('lightboxTitle').innerText = title;
			document.getElementById('lightboxTags').innerHTML = tagsHTML;
			document.getElementById('lightboxDescription').innerText = description;

			updateMedia();
			const overlay = document.getElementById('lightboxOverlay');
			overlay.classList.remove('hidden'); // Sofort sichtbar (aber noch unsichtbar durch opacity)
			// Jetzt leicht verzögert sichtbar machen (triggert Transition)
			requestAnimationFrame(() => overlay.classList.add('visible'));
		}

		function closeLightbox() {
			const overlay = document.getElementById('lightboxOverlay');
			overlay.classList.remove('visible');

			// Warte, bis Fade-out vorbei ist (400ms), dann DOM entfernen
			setTimeout(() => {
			overlay.classList.add('hidden');
			document.getElementById('mediaContainer').innerHTML = '';
			}, 400);
		}

		function changeSlide(direction) {
			currentIndex += direction;
			if (currentIndex < 0) currentIndex = gallery.length - 1;
			if (currentIndex >= gallery.length) currentIndex = 0;
			updateMedia();
		}

		function updateMedia() {
			const container = document.getElementById('mediaContainer');
			const media = gallery[currentIndex];
			container.innerHTML = '';

			if (media.type === 'image') {
			const img = document.createElement('img');
			img.src = media.src;
			container.appendChild(img);
			} else if (media.type === 'video') {
			const video = document.createElement('video');
			video.src = media.src;
			video.controls = true;
			video.autoplay = true;
			video.muted = true;
			container.appendChild(video);
			}
		}
		
		document.addEventListener('DOMContentLoaded', () => {
			document.querySelectorAll('.project-card').forEach(card => {
			card.addEventListener('click', () => {
				const title = card.getAttribute('data-title');
				const tags = card.getAttribute('data-tags')
								 .split(',')
								 .map(tag => `<span>${tag.trim()}</span>`)
								 .join('');
				const description = card.getAttribute('data-description');
				const media = JSON.parse(card.getAttribute('data-media'));
				const link = card.getAttribute('data-link');

				const extraButton = link 
					  ? `<a href="${link}" target="_blank" class="lightbox-button">Projekt öffnen</a>`
					  : '';
	  
				  // Tags + Button zusammensetzen
				const topLeftContent = tags + extraButton;
	
				openLightbox(media, title, topLeftContent, description);
				});
			});
			
			// Stoppe das Event beim Klick auf den Button oder Link
			document.querySelectorAll('.link').forEach(link => {
			  link.addEventListener('click', e => {
				e.stopPropagation(); // Verhindert das Öffnen der Lightbox
			  });
			});

			// Lightbox schließt bei Klick auf Hintergrund
			document.getElementById('lightboxOverlay').addEventListener('click', function (e) {
				const content = document.querySelector('.lightbox-content');
				if (!content.contains(e.target)) {
					closeLightbox();
				}
			});

			// ESC schließt Lightbox
			document.addEventListener('keydown', function (e) {
				if (e.key === 'Escape') {
					closeLightbox();
				}
			});
		});

	  
	  
	  
	  
<!-- Projekte scrollen -->
		let slideIndex = [1, 1, 1, 1, 1, 1, 1];
		let slideId = ["mySlides1", "mySlides2", "mySlides3", "mySlides4", "mySlides5", "mySlides6", "mySlides7"]

// Slides dynamisch aufbauen
function buildSlides() {
  slideId.forEach((id, no) => {
    const container = document.querySelector(`.slides-container[data-id="${id}"]`);
    const allProjects = container?.parentNode.querySelector(".all-projects .project-card");

    if (!container) return;

    container.innerHTML = ""; // alte Slides löschen
    const projects = container.parentNode.querySelectorAll(".all-projects .project-card");
    const projectsPerSlide = window.innerWidth <= 600 ? 1 : 3;

    for (let i = 0; i < projects.length; i += projectsPerSlide) {
      const slide = document.createElement("div");
      slide.classList.add(id, "fade");

      const grid = document.createElement("div");
      grid.classList.add("project-grid");

      for (let j = i; j < i + projectsPerSlide && j < projects.length; j++) {
        grid.appendChild(projects[j].cloneNode(true));
      }

      slide.appendChild(grid);
      container.appendChild(slide);
    }
    slideIndex[no] = 1; // zurücksetzen
    showSlides(slideIndex[no], no);
	
	// 👉 Swipe für diese Section aktivieren
    addSwipeSupport(container.parentNode, no);
  });
}


		function plusSlides(n, no) {
			showSlides(slideIndex[no] += n, no);
		}

		function showSlides(n, no) {
			const slides = document.getElementsByClassName(slideId[no]);
			const gallery = slides[0]?.closest('.section-background'); // Container finden
			const prevBtn = gallery?.querySelector('.prev');
			const nextBtn = gallery?.querySelector('.next');

			if (!slides.length || !gallery) return;

			if (n > slides.length) slideIndex[no] = slides.length;
			if (n < 1) slideIndex[no] = 1;

			for (let i = 0; i < slides.length; i++) {
				slides[i].style.display = "none";
			}
			slides[slideIndex[no] - 1].style.display = "block";

			// Sichtbarkeit der Pfeile anpassen
			if (slideIndex[no] <= 1) {
				prevBtn?.classList.remove('visible');
			} else {
				prevBtn?.classList.add('visible');
			}

			if (slideIndex[no] >= slides.length) {
				nextBtn?.classList.remove('visible');
			} else {
				nextBtn?.classList.add('visible');
			}
		}
		
		
		
		// 👉 Swipe-Erkennung hinzufügen
function addSwipeSupport(sectionEl, no) {
  let startX = 0;
  let endX = 0;

  sectionEl.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  sectionEl.addEventListener("touchend", e => {
    endX = e.changedTouches[0].clientX;
    handleSwipe(startX, endX, no);
  });
}

function handleSwipe(startX, endX, no) {
  const diff = startX - endX;
  if (Math.abs(diff) > 50) { // mindestens 50px Swipe
    if (diff > 0) {
      plusSlides(1, no);  // nach links wischen → nächstes Projekt
    } else {
      plusSlides(-1, no); // nach rechts wischen → vorheriges Projekt
    }
  }
}



// Initialisieren
window.addEventListener("load", buildSlides);
window.addEventListener("resize", buildSlides);












	<!-- Video hover -->
		document.querySelectorAll('.project-card').forEach(card => {
			const video = card.querySelector('.video-projects');

			card.addEventListener('mouseenter', () => {
				if (video) {
					video.currentTime = 0;     // von vorne beginnen
					video.play();
				}
			});

			card.addEventListener('mouseleave', () => {
				if (video) {
					video.pause();
					video.currentTime = 0;     // zurücksetzen
				}
			});
		});
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  <!-- Formular -->
document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.contact-form');
  const successMessage = document.querySelector('.form-success-message');

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Verhindert normales Abschicken

    const formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        successMessage.style.display = 'block';
        successMessage.style.opacity = '0';
        setTimeout(() => {
          successMessage.style.opacity = '1';
          successMessage.style.transition = 'opacity 0.4s ease';
        }, 10);
        form.reset();
      } else {
        alert('Es gab ein Problem beim Senden. Bitte versuche es später erneut.');
      }
    })
    .catch(error => {
      alert('Es gab einen Fehler beim Senden.');
    });
  });
});


<!-- Navigation ausfaden -->
window.addEventListener("scroll", () => {
  const aboutSection = document.querySelector("#about");
  const header = document.querySelector("header");
  const title = document.querySelector(".vorher-left");
  const icons = document.querySelector(".vorher-box-icons");

  if (!aboutSection) return;

  const triggerPoint = aboutSection.offsetTop - 100;

  if (window.scrollY >= triggerPoint) {
    title.style.opacity = "0";
    icons.style.opacity = "0";
  } else {
    title.style.opacity = "1";
    icons.style.opacity = "1";
  }
});




<!-- Mobile Menu -->
const burger = document.querySelector(".vorher-menu-icon i");
const nav = document.querySelector(".navigation");

burger.addEventListener("click", () => {
  nav.classList.toggle("active");

  // Icon ändern zwischen Menü ☰ und X ✖
  if (nav.classList.contains("active")) {
    burger.classList.replace("bx-menu", "bx-x");
  } else {
    burger.classList.replace("bx-x", "bx-menu");
  }
});

// Menü schließen, wenn man einen Link klickt
document.querySelectorAll(".navigation a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
    burger.classList.replace("bx-x", "bx-menu");
  });
});






let currentLang = "de";

// Sprache laden
async function setLanguage(lang) {
  const res = await fetch(`lang/${lang}.json`);
  const dict = await res.json();

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      // Falls HTML im Text erlaubt ist (für <span> im Hero)
      el.innerHTML = dict[key];
    }
  });

  currentLang = lang;

  // Aktive Sprache hervorheben
  document.getElementById("lang-de").style.fontWeight = (lang === "de") ? "bold" : "normal";
  document.getElementById("lang-en").style.fontWeight = (lang === "en") ? "bold" : "normal";
}

// Automatische Spracherkennung beim Laden
window.addEventListener("DOMContentLoaded", () => {
  const userLang = navigator.language || navigator.userLanguage;
  if (userLang.startsWith("de")) {
    setLanguage("de");
  } else {
    setLanguage("en");
  }
});
