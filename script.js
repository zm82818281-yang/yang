document.addEventListener('DOMContentLoaded', () => {
    
    // --- 部分 1: 平滑滾動邏輯 ---
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80; 
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });

    // --- 部分 2: 流星產生器 ---
    const container = document.querySelector('.shooting-stars');

    function createStar() {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // 確保流星從螢幕右上方外側一點的地方開始飛
        const x = Math.random() * window.innerWidth + 200;
        const y = -(Math.random() * 200); 
        
        // 飛行時間設定為 1.5 秒 ~ 3 秒之間
        const duration = Math.random() * 1.5 + 1.5;
        
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
        
        // 利用 JS 將動畫直接綁定上去
        star.style.animation = `tail ${duration}s ease-in-out forwards, shooting ${duration}s ease-in-out forwards`;

        container.appendChild(star);

        // 動畫結束後移除元素，避免記憶體佔用
        setTimeout(() => {
            star.remove();
        }, duration * 1000);
    }

    // 每隔 1.5 ~ 4 秒出現一顆流星
    function starLoop() {
        const randomTime = Math.random() * 2500 + 1500;
        setTimeout(() => {
            createStar();
            starLoop();
        }, randomTime);
    }

    // 啟動流星循環
    starLoop();
});
