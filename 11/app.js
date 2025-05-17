document.addEventListener('DOMContentLoaded', () => {
    // Get elements
    const videoContainer = document.getElementById('video-container');
    const video = document.getElementById('video');
    const playPauseBtn = document.getElementById('play-pause');
    const bigPlayBtn = document.getElementById('big-play-button');
    const volumeBtn = document.getElementById('volume');
    const fullscreenBtn = document.getElementById('fullscreen');
    const progress = document.getElementById('progress');
    const progressBar = document.querySelector('.progress-bar');
    const volumeProgress = document.getElementById('volume-progress');
    const volumeSlider = document.querySelector('.volume-slider');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const progressHoverTime = document.getElementById('progress-hover-time');

    // Initial setup
    let isFullscreen = false;
    let isMuted = false;
    let mouseDownOnProgress = false;
    let mouseDownOnVolume = false;

    // Set initial volume
    video.volume = 1;
    updateVolumeProgress();

    // Format time function
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    // Update progress bar
    function updateProgress() {
        const percent = (video.currentTime / video.duration) * 100;
        progress.style.width = `${percent}%`;
        currentTimeEl.textContent = formatTime(video.currentTime);
    }

    // Update volume progress
    function updateVolumeProgress() {
        volumeProgress.style.width = `${video.volume * 100}%`;
    }

    // Play/Pause video
    function togglePlay() {
        if (video.paused) {
            video.play();
            videoContainer.classList.add('playing');
        } else {
            video.pause();
            videoContainer.classList.remove('playing');
        }
        videoContainer.classList.toggle('paused', video.paused);
    }

    // Toggle mute
    function toggleMute() {
        video.muted = !video.muted;
        videoContainer.classList.toggle('muted', video.muted);
    }

    // Toggle fullscreen
    function toggleFullscreen() {
        if (!isFullscreen) {
            if (videoContainer.requestFullscreen) {
                videoContainer.requestFullscreen();
            } else if (videoContainer.webkitRequestFullscreen) {
                videoContainer.webkitRequestFullscreen();
            } else if (videoContainer.msRequestFullscreen) {
                videoContainer.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }

    // Set progress bar position based on mouse click
    function setProgress(e) {
        const rect = progressBar.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        video.currentTime = pos * video.duration;
    }

    // Set volume based on mouse click
    function setVolume(e) {
        const rect = volumeSlider.getBoundingClientRect();
        let pos = (e.clientX - rect.left) / rect.width;
        pos = Math.max(0, Math.min(1, pos));
        video.volume = pos;
        updateVolumeProgress();

        if (pos === 0) {
            videoContainer.classList.add('muted');
            video.muted = true;
        } else {
            videoContainer.classList.remove('muted');
            video.muted = false;
        }
    }

    // Show hover time on progress bar
    function showHoverTime(e) {
        const rect = progressBar.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        const time = pos * video.duration;

        progressHoverTime.textContent = formatTime(time);
        progressHoverTime.style.left = `${e.clientX - rect.left}px`;
        progressHoverTime.style.display = 'block';
    }

    // Event listeners
    playPauseBtn.addEventListener('click', togglePlay);
    bigPlayBtn.addEventListener('click', togglePlay);
    video.addEventListener('click', togglePlay);

    volumeBtn.addEventListener('click', toggleMute);
    fullscreenBtn.addEventListener('click', toggleFullscreen);

    video.addEventListener('timeupdate', updateProgress);

    video.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(video.duration);
    });

    video.addEventListener('ended', () => {
        videoContainer.classList.remove('playing');
        videoContainer.classList.add('paused');
    });

    // Progress bar events
    progressBar.addEventListener('click', setProgress);

    progressBar.addEventListener('mousedown', () => {
        mouseDownOnProgress = true;
    });

    document.addEventListener('mouseup', () => {
        mouseDownOnProgress = false;
        mouseDownOnVolume = false;
    });

    document.addEventListener('mousemove', (e) => {
        if (mouseDownOnProgress) {
            setProgress(e);
        }
        if (mouseDownOnVolume) {
            setVolume(e);
        }
    });

    // Volume slider events
    volumeSlider.addEventListener('click', setVolume);

    volumeSlider.addEventListener('mousedown', (e) => {
        mouseDownOnVolume = true;
        setVolume(e);
    });

    // Progress hover time
    progressBar.addEventListener('mousemove', showHoverTime);
    progressBar.addEventListener('mouseout', () => {
        progressHoverTime.style.display = 'none';
    });

    // Fullscreen change event
    document.addEventListener('fullscreenchange', () => {
        isFullscreen = !!document.fullscreenElement;
        videoContainer.classList.toggle('fullscreen', isFullscreen);
    });

    document.addEventListener('webkitfullscreenchange', () => {
        isFullscreen = !!document.webkitFullscreenElement;
        videoContainer.classList.toggle('fullscreen', isFullscreen);
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            togglePlay();
            e.preventDefault();
        } else if (e.code === 'KeyM') {
            toggleMute();
        } else if (e.code === 'KeyF') {
            toggleFullscreen();
        } else if (e.code === 'ArrowRight') {
            video.currentTime += 5;
        } else if (e.code === 'ArrowLeft') {
            video.currentTime -= 5;
        } else if (e.code === 'ArrowUp') {
            video.volume = Math.min(1, video.volume + 0.1);
            updateVolumeProgress();
            videoContainer.classList.remove('muted');
            video.muted = false;
        } else if (e.code === 'ArrowDown') {
            video.volume = Math.max(0, video.volume - 0.1);
            updateVolumeProgress();
            if (video.volume === 0) {
                videoContainer.classList.add('muted');
                video.muted = true;
            }
        }
    });

    // Add ripple effect on buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);

            const x = e.clientX - this.getBoundingClientRect().left;
            const y = e.clientY - this.getBoundingClientRect().top;

            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});