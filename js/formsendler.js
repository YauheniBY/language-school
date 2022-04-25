document.addEventListener('DOMContentLoaded', function(){
    let $forms = document.querySelectorAll('form');

    Array.from($forms).forEach(function(form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            formSend(form);
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

                }, 3000);

            } else {

                document.querySelector('.sending').classList.add('sending_answer');
                document.querySelector('.sending__message').textContent = 'Ошибка отправки (';
              	document.querySelector('.sending').classList.remove('sending_active');
                  form.reset();
                setTimeout(() =>{
                  
                document.querySelector('.sending').classList.remove('sending_answer');

                }, 3000);

            }

        } else {
            alert('Заполните все поля формы');
        }
    }

    function formValidate(form) {
        let error = 0;

        let formReq = Array.from(form.querySelectorAll('._req'));

        for(let index = 0; index < formReq.length; index++) {
            const input = formReq[index];

            removeError(input);

            if(input.getAttribute("type") === "checkbox" && input.checked === false){
                formAddError(input);
                error++;                
            }

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
});