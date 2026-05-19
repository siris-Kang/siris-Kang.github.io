(function () {
    var SELECTOR = '.post-full-content img';

    function init() {
        var images = document.querySelectorAll(SELECTOR);
        if (!images.length) return;

        var overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-hidden', 'true');

        var closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.className = 'lightbox-close';
        closeBtn.setAttribute('aria-label', '닫기');
        closeBtn.innerHTML = '&times;';

        var fullImg = document.createElement('img');
        fullImg.alt = '';

        overlay.appendChild(closeBtn);
        overlay.appendChild(fullImg);
        document.body.appendChild(overlay);

        function open(src, alt) {
            fullImg.src = src;
            fullImg.alt = alt || '';
            overlay.classList.add('is-open');
            overlay.setAttribute('aria-hidden', 'false');
            document.body.classList.add('lightbox-open');
        }

        function close() {
            overlay.classList.remove('is-open');
            overlay.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('lightbox-open');
            fullImg.src = '';
        }

        images.forEach(function (img) {
            if (img.closest('a')) return;
            img.classList.add('is-zoomable');
            img.addEventListener('click', function () {
                open(img.currentSrc || img.src, img.alt);
            });
        });

        overlay.addEventListener('click', function (event) {
            if (event.target === overlay || event.target === fullImg || event.target === closeBtn) {
                close();
            }
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && overlay.classList.contains('is-open')) {
                close();
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
}());
