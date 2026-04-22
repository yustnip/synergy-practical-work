/**
 * Функция запрашивает у пользователя день, месяц и год рождения
 * с валидацией ввода и проверкой корректности даты.
 */
function askBirthday() {
    let day, month, year;
    
    // Запрашиваем день
    do {
        const dayInput = prompt("Введите день вашего рождения (1-31):");
        if (dayInput === null) {
            // Пользователь нажал "Отмена"
            alert("Ввод отменён.");
            return null;
        }
        day = parseInt(dayInput, 10);
        if (isNaN(day) || day < 1 || day > 31) {
            alert("Пожалуйста, введите корректный день (от 1 до 31).");
        }
    } while (isNaN(day) || day < 1 || day > 31);
    
    // Запрашиваем месяц
    do {
        const monthInput = prompt("Введите месяц вашего рождения (1-12):");
        if (monthInput === null) {
            alert("Ввод отменён.");
            return null;
        }
        month = parseInt(monthInput, 10);
        if (isNaN(month) || month < 1 || month > 12) {
            alert("Пожалуйста, введите корректный месяц (от 1 до 12).");
        }
    } while (isNaN(month) || month < 1 || month > 12);
    
    // Запрашиваем год
    const currentYear = new Date().getFullYear();
    do {
        const yearInput = prompt(`Введите год вашего рождения (1900-${currentYear}):`);
        if (yearInput === null) {
            alert("Ввод отменён.");
            return null;
        }
        year = parseInt(yearInput, 10);
        if (isNaN(year) || year < 1900 || year > currentYear) {
            alert(`Пожалуйста, введите корректный год (от 1900 до ${currentYear}).`);
        }
    } while (isNaN(year) || year < 1900 || year > currentYear);
    
    // Проверка корректности даты
    const date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
        alert("Введённая дата некорректна! Пожалуйста, введите существующую дату.");
        return null;
    }
    
    return {
        day: day,
        month: month,
        year: year
    };
}

/**
 * Определяет день недели для заданной даты
 */
function getDayOfWeek(day, month, year) {
    const date = new Date(year, month - 1, day);
    const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    return days[date.getDay()];
}

/**
 * Определяет, является ли год високосным
 */
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

/**
 * Вычисляет возраст пользователя на текущую дату
 */
function calculateAge(day, month, year) {
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();
    
    // Если день месяца ещё не наступил в текущем месяце
    if (days < 0) {
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
        months--;
    }
    
    // Если месяц ещё не наступил в текущем году
    if (months < 0) {
        months += 12;
        years--;
    }
    
    return {
        years: years,
        months: months,
        days: days
    };
}

/**
 * Возвращает массив строк с цифрами от 0 до 9 в виде звёздочек (3x3)
 */
function getDigitStars(digit) {
    const stars = {
        0: ['***', '* *', '***'],
        1: ['  *', '  *', '  *'],
        2: ['***', ' **', '***'],
        3: ['***', ' **', '***'],
        4: ['* *', '***', '  *'],
        5: ['***', '** ', '***'],
        6: ['***', '** ', '***'],
        7: ['***', '  *', '  *'],
        8: ['***', '***', '***'],
        9: ['***', '***', '***']
    };
    return stars[digit] || ['   ', '   ', '   '];
}

/**
 * Преобразует число в строку с ведущими нулями до указанной длины
 */
function padNumber(num, length) {
    return num.toString().padStart(length, '0');
}

/**
 * Выводит в консоль дату в формате дд мм гггг, где цифры нарисованы звёздочками
 */
function printDateWithStars(day, month, year) {
    // Форматируем числа: день и месяц двузначные, год четырёхзначный
    const dayStr = padNumber(day, 2);
    const monthStr = padNumber(month, 2);
    const yearStr = padNumber(year, 4);
    
    // Объединяем все цифры в одну строку (дд мм гггг)
    const allDigits = dayStr + monthStr + yearStr; // 8 цифр
    const digits = allDigits.split('').map(Number);
    const lines = ['', '', ''];
    
    // Для каждой цифры добавляем её звёздочные строки
    digits.forEach((digit, index) => {
        const digitLines = getDigitStars(digit);
        // Добавляем пробел между группами цифр (после 2 и 4 цифры)
        const separator = (index === 1 || index === 3) ? '   ' : ' ';
        for (let i = 0; i < 3; i++) {
            lines[i] += digitLines[i] + separator;
        }
    });
    
    // Выводим в консоль
    console.log('Дата рождения в формате дд мм гггг (звёздочки):');
    lines.forEach(line => console.log(line));
    console.log(''); // пустая строка для разделения
}

/**
 * Функция, которая запрашивает дату и выводит день недели
 */
function askBirthdayAndShowDay() {
    const birthday = askBirthday();
    if (!birthday) {
        return null;
    }
    const dayOfWeek = getDayOfWeek(birthday.day, birthday.month, birthday.year);
    return `Ваш день рождения (${birthday.day}.${birthday.month}.${birthday.year}) приходится на ${dayOfWeek}.`;
}

/**
 * Функция, которая запрашивает дату и определяет, был ли год високосным
 */
function askBirthdayAndShowLeap() {
    const birthday = askBirthday();
    if (!birthday) {
        return null;
    }
    const leap = isLeapYear(birthday.year);
    const leapText = leap ? "високосный" : "невисокосный";
    return `Год ${birthday.year} является ${leapText}.`;
}

/**
 * Функция, которая запрашивает дату и выводит возраст пользователя
 */
function askBirthdayAndShowAge() {
    const birthday = askBirthday();
    if (!birthday) {
        return null;
    }
    const age = calculateAge(birthday.day, birthday.month, birthday.year);
    return `Вам ${age.years} лет, ${age.months} месяцев и ${age.days} дней.`;
}

/**
 * Функция, которая запрашивает дату и выводит её в консоль в виде звёздочек
 */
function askBirthdayAndPrintStars() {
    const birthday = askBirthday();
    if (!birthday) {
        return null;
    }
    printDateWithStars(birthday.day, birthday.month, birthday.year);
    return birthday;
}
