const graduationDate = new Date("Apr 12, 2026 10:30:00").getTime();
// const graduationDate = new Date().getTime() - 86400000;
// const graduationDate = new Date().getTime() + 5000;

window.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("page-loaded");
});

const timer = setInterval(function() {
    const now = new Date().getTime();
    const distance = graduationDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;

    if (distance < 0) {
        clearInterval(timer);
        document.getElementById("countdown").innerHTML = `
            <div class="event-started">
                <h3 class="status-text-running">Lễ Tốt Nghiệp Đang Diễn Ra</h3>
                <div class="heart-icon">❤️</div>
            </div>
        `;
    }

    if (distance < -86400000) {
        clearInterval(timer);
        document.getElementById("countdown").innerHTML = `
            <div class="event-started">
                <h3 class="status-text">Cảm ơn bạn đã đến dự lễ tốt nghiệp!</h3>
                <div class="heart-icon">❤️</div>
            </div>
        `;
    }

}, 1000);

window.onscroll = function() {
    const nav = document.querySelector('.navbar');
    if (!nav) return;

    if (window.pageYOffset > 50) {
        nav.style.background = "#001f3f";
        nav.style.boxShadow = "0 2px 10px rgba(0,0,0,0.3)";
    } else {
        nav.style.background = "transparent";
        nav.style.boxShadow = "none";
    }
};

const pathParts = window.location.pathname.split("/");
const inviteSlug = pathParts[2] ? pathParts[2].split(".")[0] : "";

const invitePageLink = document.getElementById("invitePageLink");

if (invitePageLink) {
    const url = new URL(invitePageLink.getAttribute("href"), window.location.origin);
    const currentParams = new URLSearchParams(window.location.search);
    if (inviteSlug) {
        currentParams.set("invite", inviteSlug);
    }
    currentParams.forEach((value, key) => {
    url.searchParams.set(key, value);
    });

    invitePageLink.href = url.pathname + url.search;
}