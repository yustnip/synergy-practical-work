document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');
    const currentSlideElement = document.querySelector('.current-slide');
    const totalSlidesElement = document.querySelector('.total-slides');
    
    // Текущий индекс слайда
    let currentSlideIndex = 0;
    const totalSlides = slides.length;
    
    // Установка общего количества слайдов
    totalSlidesElement.textContent = totalSlides;
    
    function initSlider() {
        updateSlider();
        setupEventListeners();
        setupKeyboardNavigation();
        startAutoSlide();
    }
    
    function updateSlider() {
        // Скрыть все слайды
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Показать текущий слайд
        slides[currentSlideIndex].classList.add('active');
        
        // Обновить индикаторы
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        indicators[currentSlideIndex].classList.add('active');
        
        // Обновить номер текущего слайда
        currentSlideElement.textContent = currentSlideIndex + 1;
    }
    
    function nextSlide() {
        currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
        updateSlider();
    }
    
    function prevSlide() {
        currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
    }
    
    function goToSlide(index) {
        if (index >= 0 && index < totalSlides) {
            currentSlideIndex = index;
            updateSlider();
        }
    }
    
    function setupEventListeners() {
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        indicators.forEach(indicator => {
            indicator.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                goToSlide(index);
            });
        });
        
        // Остановка автослайда при наведении на слайдер
        const sliderContainer = document.querySelector('.slider-container');
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
    }
    
    function setupKeyboardNavigation() {
        document.addEventListener('keydown', function(event) {
            if (event.key === 'ArrowLeft') {
                prevSlide();
            } else if (event.key === 'ArrowRight') {
                nextSlide();
            }
        });
    }
    
    let autoSlideInterval;
    
    function startAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }
    
    initSlider();
    
    window.slider = {
        nextSlide,
        prevSlide,
        goToSlide,
        currentSlideIndex: () => currentSlideIndex
    };
});