// Calculator functionality
let result = document.getElementById('result');

function appendToResult(value) {
    result.value += value;
    // Character reaction
    characterReaction('happy');
}

function clearResult() {
    result.value = '';
    characterReaction('surprised');
}

function backspace() {
    result.value = result.value.slice(0, -1);
    characterReaction('sad');
}

function calculate() {
    try {
        result.value = eval(result.value);
        characterReaction('excited');
    } catch (error) {
        result.value = 'Error';
        characterReaction('angry');
    }
}

// Character interaction
const character = document.getElementById('character');
const characterContainer = document.getElementById('characterContainer');
const premiumCharacter = document.getElementById('premiumCharacter');
const premiumModal = document.getElementById('premiumModal');

// Track mouse position for character to follow
document.addEventListener('mousemove', (e) => {
    const rect = characterContainer.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    const distance = Math.min(
        Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)) / 10,
        20
    );
    
    // Make eyes follow cursor
    const eyes = document.querySelectorAll('.eye, .miku-eye');
    eyes.forEach(eye => {
        const pupil = eye.querySelector('.pupil') || eye;
        const eyeRect = eye.getBoundingClientRect();
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;
        
        const eyeAngle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
        const eyeDistance = Math.min(5, distance / 2);
        
        pupil.style.transform = `translate(${Math.cos(eyeAngle) * eyeDistance}px, ${Math.sin(eyeAngle) * eyeDistance}px)`;
    });
    
    // Make character lean away when cursor gets close
    if (distance < 15) {
        characterContainer.style.transform = `translate(-50%, ${-distance}px) rotate(${-angle * 0.2}rad)`;
        characterReaction('shy');
    } else {
        characterContainer.style.transform = 'translate(-50%, 0)';
    }
});

// Character reactions
function characterReaction(type) {
    const mouth = document.querySelector('.mouth, .miku-mouth');
    
    switch(type) {
        case 'happy':
            anime({
                targets: mouth,
                height: 15,
                borderRadius: ['0 0 10px 10px', '50%'],
                duration: 300,
                easing: 'easeInOutQuad'
            });
            break;
        case 'sad':
            anime({
                targets: mouth,
                height: 5,
                width: 25,
                borderRadius: ['50%', '50% 50% 0 0'],
                duration: 300,
                easing: 'easeInOutQuad'
            });
            break;
        case 'angry':
            anime({
                targets: mouth,
                height: 3,
                width: 30,
                borderRadius: 0,
                duration: 200,
                easing: 'easeInOutQuad'
            });
            break;
        case 'excited':
            anime({
                targets: mouth,
                height: 20,
                width: 15,
                borderRadius: ['0 0 10px 10px', '50%'],
                duration: 200,
                easing: 'easeInOutQuad'
            });
            break;
        case 'surprised':
            anime({
                targets: mouth,
                height: 15,
                width: 15,
                borderRadius: '50%',
                duration: 200,
                easing: 'easeInOutQuad'
            });
            break;
        case 'shy':
            anime({
                targets: mouth,
                height: 5,
                width: 20,
                borderRadius: ['0 0 10px 10px', '50% 50% 0 0'],
                duration: 200,
                easing: 'easeInOutQuad'
            });
            break;
    }
    
    // Blink animation
    const eyes = document.querySelectorAll('.eye, .miku-eye');
    anime({
        targets: eyes,
        height: [20, 5, 20],
        duration: 300,
        easing: 'easeInOutQuad',
        delay: anime.stagger(100)
    });
}

// Random blinking
setInterval(() => {
    if (Math.random() > 0.7) {
        const eyes = document.querySelectorAll('.eye, .miku-eye');
        anime({
            targets: eyes,
            height: [20, 5, 20],
            duration: 300,
            easing: 'easeInOutQuad',
            delay: anime.stagger(100)
        });
    }
}, 3000);

// Premium features
let isPremium = localStorage.getItem('isPremium') === 'true';

function togglePremium() {
    if (isPremium) {
        // Already premium, toggle character
        toggleCharacter();
    } else {
        // Show premium modal
        premiumModal.classList.remove('hidden');
    }
}

function toggleCharacter() {
    if (isPremium) {
        character.classList.toggle('hidden');
        premiumCharacter.classList.toggle('hidden');
    }
}

function unlockPremium() {
    // In a real app, this would process payment
    isPremium = true;
    localStorage.setItem('isPremium', 'true');
    premiumModal.classList.add('hidden');
    character.classList.add('hidden');
    premiumCharacter.classList.remove('hidden');
    
    // Celebrate!
    anime({
        targets: '.premium-character',
        translateY: [-20, 0],
        scale: [1, 1.2, 1],
        duration: 1000,
        easing: 'easeInOutQuad'
    });
    
    // Confetti effect
    for (let i = 0; i < 50; i++) {
        createConfetti();
    }
}

function closePremiumModal() {
    premiumModal.classList.add('hidden');
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(confetti);
    
    anime({
        targets: confetti,
        translateY: [0, window.innerHeight],
        translateX: [0, Math.random() * 200 - 100],
        rotate: Math.random() * 360,
        opacity: [1, 0],
        duration: 1000 + Math.random() * 2000,
        easing: 'easeInOutQuad',
        complete: () => confetti.remove()
    });
}

// Initialize premium status
if (isPremium) {
    character.classList.add('hidden');
    premiumCharacter.classList.remove('hidden');
}