(() => {
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';

    if (!window.matchMedia('(min-width: 701px)').matches) {
        return;
    }

    const style = document.createElement('style');
    style.textContent = `
        .image-agrandie {
            position: fixed;
            inset: 0;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
            background: rgba(0, 0, 0, 0.88);
            cursor: zoom-out;
        }

        .image-agrandie img {
            display: block;
            max-width: min(96vw, 1600px);
            max-height: 92vh;
            width: auto;
            height: auto;
            object-fit: contain;
            border-radius: 8px;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.45);
            cursor: default;
        }
    `;
    document.head.appendChild(style);

    const images = document.querySelectorAll('.galerie img, .schema');

    function fermerImage() {
        const apercu = document.querySelector('.image-agrandie');
        if (apercu) {
            apercu.remove();
        }
    }

    function ouvrirImage(image) {
        fermerImage();

        const apercu = document.createElement('div');
        apercu.className = 'image-agrandie';
        apercu.setAttribute('role', 'dialog');
        apercu.setAttribute('aria-label', 'Image agrandie');

        const imageAgrandie = document.createElement('img');
        imageAgrandie.src = image.currentSrc || image.src;
        imageAgrandie.alt = image.alt;
        apercu.appendChild(imageAgrandie);
        document.body.appendChild(apercu);

        apercu.addEventListener('click', (event) => {
            if (event.target === apercu) {
                fermerImage();
            }
        });
    }

    images.forEach((image) => {
        image.tabIndex = 0;
        image.setAttribute('role', 'button');
        image.setAttribute('aria-label', `${image.alt || 'Image'} - agrandir`);
        image.addEventListener('click', () => ouvrirImage(image));
        image.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                ouvrirImage(image);
            }
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            fermerImage();
        }
    });
})();
