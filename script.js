// Made By Ketener - JavaScript do Tributo Ayrton Senna


let tributes = JSON.parse(localStorage.getItem('tributes')) || [];

function submitTribute() {
    const textarea = document.querySelector('.tribute-form textarea');
    const message = textarea.value.trim();
    
    if (message) {
        
        const tribute = {
            id: Date.now(),
            message,
            date: new Date().toLocaleDateString('pt-BR')
        };
        
        
        tributes.unshift(tribute);
        
        
        localStorage.setItem('tributes', JSON.stringify(tributes));
        
       
        textarea.value = '';
        
       
        displayTributes();
        
        
        showNotification('Tributo enviado com sucesso!', 'success');
    }
}

function displayTributes() {
    const tributesList = document.getElementById('tributes-list');
    if (tributesList) {
        tributesList.innerHTML = tributes.map(tribute => `
            <div class="tribute-item">
                <p>${tribute.message}</p>
                <small>Enviado em ${tribute.date}</small>
            </div>
        `).join('');
    }
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}


const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = entry.target.querySelectorAll('.number');
            stats.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateValue(stat, 0, target, 2000);
            });
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });


const bioStats = document.querySelector('.bio-stats');
if (bioStats) {
    observer.observe(bioStats);
}


const scrollReveal = () => {
    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', scrollReveal);
scrollReveal();


const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});


const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filter === 'all' || item.classList.contains(filter)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    displayTributes();
});
