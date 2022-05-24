    import { DATA } from './modules/quizdata.js';
    

    const quiz = document.getElementById('quiz');
    const questions = document.getElementById('questions');
    const answers = document.getElementById('answers');
    const idicator = document.getElementById('indicator');
    const results = document.getElementById('results');
    const btnRestart = document.getElementById('btnRestart');
    const btnNext = document.getElementById('btnNext');
    const testInfo = document.querySelector ('.quiz__test-info');
    const infoBlock = document.querySelector('.quiz__infoBlock');
    const extraLinks = document.querySelector('.quiz__extra-links');

    let localResults = [];

    const rendorQuetions = (index) => {

        const renderAnswer = () => DATA[index].answers
              .map((answer) => `
                    <li class="quiz__answer">
                        <label>
                            <input class="quiz__answer-input" type="radio" name="${index}" value="${answer.id}">
                            <span class="quiz__answer-label-span">${answer.value}</span>
                        </label>
                    </li>
                    `)
                    .join('');

        questions.innerHTML = `
        <div class="quiz__questions-rubric" id="quiz__questions-rubric">${DATA[index].rubric}</div>
        <div class="quiz__questions-quest" id="quiz__questions-quest">${DATA[index].question}</div>
                <ul class="quiz__questions-answers" id="answers">
                    ${renderAnswer()}  
                </ul>
        `;

        rendorIndicator (index);

    };


    function rendorResults () {
        let points = 0;

        DATA.forEach((question, index) => {
            
            if( question.answers[localResults[index]].currect === true ) {

                points++;
                console.log(points);

            }

        });


        function renderLevel (points) {

            if (points <= 10 ) {

                return 'Beginner (Начинающий)';
    
            } else if (points <= 18 ) {
                return 'Elementary (A1)';
            } else if (points <= 32 ) {
                return 'Pre-Intermediate (начальный средний)';
            } else if (points <= 41 ) {
                return 'Intermediate';
            } else {
                return 'Upper-Intermediate';
            }   

        }
        
        console.log(points);

       
        results.innerHTML = `
        <div class="quiz__result-quest" id="quiz__result-quest">Ваш результат: ${renderLevel (points)}</div>
                <div class="quiz__result-answers" id="result-answers"> Правильных ответов: ${points} из ${DATA.length}</div>
        `;

    };

    function rendorIndicator (index) {

        idicator.innerHTML = `${index + 1} / ${DATA.length}`;

    };

    rendorQuetions (0);
    
    quiz.addEventListener ('change', (event) => {
        if ( !event.target.classList.contains('quiz__btn-next-span')) {
            
            localResults[event.target.name] = event.target.value;
            btnNext.disabled = false;
            console.log(localResults);
        }
    });

    quiz.addEventListener ('click', (event) => {
        let currentIndex = Number(document.querySelector('.quiz__answer-input').name);

        if (event.target.classList.contains('quiz__btn-next-span') && (currentIndex + 1) < DATA.length) {
            console.log('next');
            rendorQuetions(currentIndex + 1);
            

        btnNext.disabled = true;

        } else if (event.target.classList.contains('quiz__btn-next-span') && (currentIndex + 1) === DATA.length){

            btnRestart.classList.add('quiz__btn-restart_visible');
            btnNext.classList.add('quiz__btn-next_invisible');
            questions.classList.add('quiz__questions-item_invisible');
            results.classList.add('quiz__result-item_visible');
            idicator.innerHTML = `Вы ответили на все вопросы!`;
            idicator.classList.add('quiz__progres_final');
            infoBlock.classList.add('quiz__infoBlock_active');
            extraLinks.classList.add('quiz__extra-links_active');
            rendorResults ();

        } else if (event.target.classList.contains('quiz__btn-restart-span')) {
            questions.classList.remove('quiz__questions-item_invisible');
            results.classList.remove('quiz__result-item_visible');
            btnRestart.classList.remove('quiz__btn-restart_visible');
            btnNext.classList.remove('quiz__btn-next_invisible');
            idicator.classList.remove('quiz__progres_final');            
            infoBlock.classList.remove('quiz__infoBlock_active');            
            extraLinks.classList.remove('quiz__extra-links_active');
            localResults = {};
            rendorQuetions (0);
            

        btnNext.disabled = true;
        }
    });

    testInfo.addEventListener('click', () => {

        testInfo.classList.toggle('quiz__test-info_active');

        
        if (testInfo.classList.contains('quiz__test-info_active')) {

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            setTimeout( addLockToBody, 300);

                // toTopInfoBlock ( position, addLockToBody);

                // addLockToBody ();

                function addLockToBody () {
                    document.body.classList.add('_lock');
                };

        } else {

            document.body.classList.remove('_lock');

        }



    });