document.addEventListener("DOMContentLoaded", () => {
    const mainVideo = document.getElementById("main-video");
    const videoTitle = document.getElementById("main-video-title");
    const thumbnails = document.querySelectorAll(".thumbnail");

    thumbnails.forEach((thumbnail) => {
        thumbnail.addEventListener("click", () => {
            // Update active state
            thumbnails.forEach(btn => btn.classList.remove("active"));
            thumbnail.classList.add("active");

            // Change video source
            const src = thumbnail.getAttribute("data-src");
            const title = thumbnail.getAttribute("data-title");

            // Optional: Fade out effect
            mainVideo.style.opacity = 0;
            videoTitle.style.opacity = 0;

            setTimeout(() => {
                mainVideo.src = src;
                videoTitle.textContent = title;
                
                // Play new video automatically
                mainVideo.play().catch(error => {
                    console.error("Auto-play was prevented by browser:", error);
                });

                // Fade back in
                mainVideo.style.opacity = 1;
                videoTitle.style.opacity = 1;
            }, 300); // match timeout with css transition time
        });
    });

    // Handle end of video (optional: loop or move to next)
    mainVideo.addEventListener("ended", () => {
        // Find current active index
        let activeIdx = 0;
        thumbnails.forEach((t, i) => {
            if (t.classList.contains('active')) activeIdx = i;
        });

        // Trigger click on the next thumbnail if exists (looping behavior)
        const nextIdx = (activeIdx + 1) % thumbnails.length;
        thumbnails[nextIdx].click();
    });
});
