document.addEventListener('DOMContentLoaded', function(){
    let $forms = document.querySelectorAll('form');

    var $openforms = document.querySelectorAll('.openform'),
        $form = document.querySelector('.mainform'),
        $body = document.querySelector('body');

    // open Main form

Array.from($openforms).forEach(function(element) {

    element.addEventListener('click', function(){

        $form.classList.add('mainform__active');        
        $body.classList.add('_lock');

    });        
});

//to close mainform

$form.addEventListener('click',function(e){
    if(e.target.classList.contains('mainform__active')){
        closeForm ();
    }  
    
});

// send form data

    Array.from($forms).forEach(function(form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            formSend(form);
        });

        // hide prompts about phone format and .error

        form.addEventListener('click',function(e){
            if(!e.target.classList.contains('mainform__active') && !e.target.classList.contains('submit') && e.target.classList.contains('error')){
                removeError(e.target);
            }            
        });

        

        
    });

    async function formSend(form) {
        let error = formValidate(form);
        
        let formData = new FormData(form);

        
        if(error === 0) {
            document.querySelector('.sending').classList.add('sending_active');
            let response = await fetch('../php/mail.php',{
                method: 'POST',
                body: formData
            });

            if(response.ok) {
              document.querySelector('.sending').classList.add('sending_answer');
              document.querySelector('.sending__message').textContent = 'Успешно отправлено!';
              document.querySelector('.sending').classList.remove('sending_active');
                  form.reset();
                setTimeout(() =>{
                  
                document.querySelector('.sending').classList.remove('sending_answer');
                if($form.classList.contains('mainform__active')){
                    closeForm ();
                }

                }, 3000);

            } else {

                document.querySelector('.sending').classList.add('sending_answer');
                document.querySelector('.sending__message').textContent = 'Ошибка отправки. Вы можете связать с нами по +375 (29) 158-14-28.';
              	document.querySelector('.sending').classList.remove('sending_active');
                  form.reset();
                setTimeout(() =>{
                  
                document.querySelector('.sending').classList.remove('sending_answer');

                }, 3000);

            }

        } else {
            document.querySelector('.sending').classList.add('sending_answer');
            document.querySelector('.sending__message').textContent = `НЕ ОТПРАВЛЕНО!  Проверьте номер, который вы вводите.`;
            document.querySelector('.sending').classList.remove('sending_active');
            setTimeout(() =>{
                  
                document.querySelector('.sending').classList.remove('sending_answer');

            }, 3000);
        }
    }

    function formValidate(form) {
        let error = 0;

        let formReq = Array.from(form.querySelectorAll('._req'));

        for(let index = 0; index < formReq.length; index++) {
            const input = formReq[index];

            removeError(input);

            if(input.classList.contains('tel') && input.value.length < 13){
                formAddError(input);
                error++;                
            }

        }
        return error;
    }

    function formAddError(input){
        input.classList.add('error');
    }

    function removeError(input) {
        input.classList.remove('error');
    }

    function closeForm () {       
            $form.classList.remove('mainform__active');            
            $body.classList.remove('_lock');
            if($form.querySelector('.tel').classList.contains('error')) {
                $form.querySelector('.tel').classList.remove('error');
            }
    }
});