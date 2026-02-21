// --- 1. THREE.JS STARFIELD ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('starfield'), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const starGeo = new THREE.BufferGeometry();
const starPos = new Float32Array(3000 * 3);
for (let i = 0; i < 9000; i++) starPos[i] = (Math.random() - 0.5) * 1000;
starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.8 }));
scene.add(stars);
camera.position.z = 1;

let warpSpeed = 0.2;
function animate() {
    requestAnimationFrame(animate);
    const pos = starGeo.attributes.position.array;
    for (let i = 2; i < pos.length; i += 3) {
        pos[i] += warpSpeed;
        if (pos[i] > 500) pos[i] = -500;
    }
    starGeo.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
}
animate();

// --- 2. INTRO TIMELINE ---
const tl = gsap.timeline();
tl.to("#intro-msg", { opacity: 1, duration: 1, delay: 0.5 });
tl.to({}, { duration: 2, onUpdate: () => { warpSpeed += 0.5; } });
tl.to("#intro-overlay", { backgroundColor: "white", duration: 0.2 });
tl.to("#intro-overlay", {
    opacity: 0,
    display: "none",
    duration: 1,
    onStart: () => {
        gsap.to("#homepage", { opacity: 1, duration: 1 });
        document.body.style.overflow = "auto";
        lucide.createIcons();
    }
});

// --- 3. UI LOGIC ---
function openAchievements() {
    const overlay = document.getElementById('achievement-overlay');
    overlay.style.display = 'block';
    gsap.fromTo(overlay, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 });
}

function closeOverlays() {
    const overlay = document.getElementById('achievement-overlay');
    gsap.to(overlay, { opacity: 0, y: 30, duration: 0.3, onComplete: () => {
        overlay.style.display = 'none';
        overlay.style.opacity = '1';
    }});
}

// Window Resize Fix
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});