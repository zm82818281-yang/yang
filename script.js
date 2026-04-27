// 等待 DOM 載入完成後執行
document.addEventListener('DOMContentLoaded', () => {
    
    // 取得所有具有錨點連結的 a 標籤
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 取得目標 href 屬性值
            const targetId = this.getAttribute('href');
            
            // 如果 href 只是 "#"，則不執行平滑滾動
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // 取消預設的瞬間跳轉行為
                e.preventDefault();

                // 計算導覽列的高度，避免滾動後被導覽列遮擋 (導覽列大約 60px)
                const headerOffset = 60;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                // 執行平滑滾動
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});