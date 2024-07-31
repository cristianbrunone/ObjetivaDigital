$(document).ready(function () {
    // Inicializa o slider de logotipos
    $('.logo-slider').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            }
        ]
    });

    // Inicializa o slider de avatares
    $('.avatar-slider').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        centerPadding: '0',
        arrows: true,
        dots: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            }
        ]
    });

    // Configura o acordeão para mostrar apenas um painel de cada vez
    var accordionElement = document.querySelector('#accordion');

    if (accordionElement) {
        var accordions = accordionElement.querySelectorAll('.accordion-collapse');
        var containers = document.querySelectorAll('.custom-container');

        // Ativa o primeiro painel do acordeão ao carregar a página
        if (accordions.length > 0) {
            var firstAccordion = accordions[0];
            new bootstrap.Collapse(firstAccordion, {
                toggle: true
            });

            // Adiciona a classe active ao contêiner correspondente ao primeiro painel
            var firstTargetId = firstAccordion.id;
            var firstActiveContainer = document.querySelector(`.custom-container[data-bs-target="#${firstTargetId}"]`);
            if (firstActiveContainer) {
                firstActiveContainer.classList.add('active');
            }
        }

        accordions.forEach(function (accordion) {
            accordion.addEventListener('show.bs.collapse', function () {
                // Remove a classe active de todos os containers
                containers.forEach(function (container) {
                    container.classList.remove('active');
                });

                // Fecha todos os outros painéis do acordeão
                accordions.forEach(function (otherAccordion) {
                    if (otherAccordion !== accordion) {
                        bootstrap.Collapse.getInstance(otherAccordion)?.hide();
                    }
                });

                // Adiciona a classe active ao contêiner correspondente ao painel aberto
                var targetId = accordion.id;
                var activeContainer = document.querySelector(`.custom-container[data-bs-target="#${targetId}"]`);
                if (activeContainer) {
                    activeContainer.classList.add('active');
                }

                // Força uma atualização do slider após o painel ser aberto
                setTimeout(function () {
                    // Atualiza todos os sliders, incluindo o logo e o avatar slider
                    $('.logo-slider').slick('refresh');
                    $('.avatar-slider').slick('refresh');
                }, 300); // Ajuste o tempo se necessário
            });

            accordion.addEventListener('hidden.bs.collapse', function () {
                // Remove a classe active quando o painel é fechado
                var targetId = accordion.id;
                var activeContainer = document.querySelector(`.custom-container[data-bs-target="#${targetId}"]`);
                if (activeContainer) {
                    activeContainer.classList.remove('active');
                }
            });
        });
    }
});
