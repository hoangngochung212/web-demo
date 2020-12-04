function loginResgis(){
    var resgisItem = document.querySelector('.registration');
    var loginItem = document.querySelector('.login');
    var formLogin = document.querySelector('.form-login');
    var modalElement = document.querySelector('.modal');
    var formResgis = document.querySelector('.form_registration');
    var exitForms = document.querySelectorAll('.form-control-back');
   
    resgisItem.addEventListener('click',()=>{
        modalElement.style.display = 'flex';
        formLogin.style.display = 'none';
        formResgis.style.display ='block'
    });

    loginItem.addEventListener('click',()=>{
        modalElement.style.display = 'flex';
        formResgis.style.display='none';
        formLogin.style.display ="block"
    })

   
    exitForms.forEach(value =>{
        value.addEventListener('click',()=>{
            modalElement.style.display = 'none';
        })
    })
    document.querySelector('.modal__overlay').addEventListener('click',()=>{
        modalElement.style.display = 'none';
    });

    var switchForm = document.querySelectorAll('.form_switch-btn');
    switchForm[0].addEventListener('click',()=>{
        modalElement.style.display = 'flex';
        formResgis.style.display='none';
        formLogin.style.display ="block"
    })
    switchForm[1].addEventListener('click',()=>{
        modalElement.style.display = 'flex';
        formLogin.style.display = 'none';
        formResgis.style.display ='block';
    })

}
loginResgis();



//* Đối tượng 
function Validator(options){
    function getParent(element, selector){
        while(element.parentElement){
            if(element.parentElement.matches(selector)){
                return element.parentElement
            }
            element = element.parentElement;
        }
    }
    var selectoRules = {};
 //   hàm validate - thực hiện
    function validate(inputElement,rule){
           
            var errorMessage = rule.test(inputElement.value);
            var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);

            var rules = selectoRules[rule.selector];
            // lặp qua từng rule và kiểm tra
            // nếu có lỗi thì break
            for(var i = 0 ; i < rules.length ; i++){
                switch (inputElement.type){
                    case 'radio':
                    case 'checkbox':
                        errorMessage =  rules[i](formElement.querySelector(
                            rule.selector + ":checked"));
                        break;
                    default:
                        errorMessage =  rules[i](inputElement.value);
                }
                
                if(errorMessage) break;
            }
           if(errorMessage){
               errorElement.innerHTML = errorMessage;
               getParent(inputElement, options.formGroupSelector).classList.add('invalid');
           }else {
               errorElement.innerHTML = '';
               getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
           }
           return   !errorMessage;
    }
    var formElement = document.querySelector(options.form);
    
    if(formElement){
        // Khi submit form
        formElement.onsubmit = function(e){
            e.preventDefault();
            var isFormValid =true;
            options.rules.forEach(function(rule){
                var inputElement = formElement.querySelector(rule.selector);
                var isValid  = validate(inputElement,rule)
                if(!isValid){
                    isFormValid = false;
                }
            });
            if(isFormValid){
                // trường hợp submit với js
                if (typeof options.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]');
                    var checkElement = undefined;
                    var checkedSelector = '';
                    var formValues = Array.from(enableInputs).reduce(function (values, input) {
                    switch (input.type) {
                        case 'radio':
                            values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                            break;
                        case 'checkbox':
                            checkedSelector = input.name;
                    if (input.matches(':checked')) {
                         checkElement = input;
                        if (!Array.isArray(values[input.name])) {
                        values[input.name] = [];
                        }
                        values[input.name].push(input.value);
                        }
                         break;
                        case 'file':
                            values[input.name] = input.files;
                        break;
                            default:
                            values[input.name] = input.value;
                             }
                        return values;
                        }, {});
                         if (!checkElement) {
                             formValues[checkedSelector] = '';
                    
                            }
                    options.onSubmit(formValues);
                    }
                else {
                    // submit mặc định
                    formElement.submit();
                    }
            }
             
        }

        options.rules.forEach(function(rule){
            // lưu lại các rule cho mỗi input
            // selectoRules[rule.selector] = rule.test;
            if(Array.isArray(selectoRules[rule.selector])){
                selectoRules[rule.selector].push(rule.test)
            }else {
                selectoRules[rule.selector] = [rule.test];
            }
            
            var inputElements = formElement.querySelectorAll(rule.selector);
            Array.from(inputElements).forEach(function (inputElement){
                inputElement.onblur = function(){
                    // var errorMessage ;
                    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                    validate(inputElement,rule);
                // if(errorMessage){
                //        errorElement.innerHTML = errorMessage;
                //        getParent(inputElement, options.formGroupSelector).classList.add('invalid');
                //    }else {
                //        errorElement.innerHTML = '';
                //        getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
                //    }
                }
                inputElement.oninput = function(){ // khi user nhap
                    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                    errorElement.innerHTML = '';
                    getParent(inputElement, options.formGroupSelector).classList.remove('invalid')
                }
            })
           
        });
       
    }
    
}
// * Định nghĩa rule
// * Nguyen tac rules :
//*1 .Khi co loi => mess loi
//*2 .Khi hop le => undefined   
Validator.isRequired = function(selector,message){
    return {
        selector : selector ,
        test : function(value){
          return value ? undefined : message || 'Vui lòng nhập trường này!'
        }
        
    }
} 
Validator.isEmail = function(selector,message){
      return {
        selector : selector ,
        test : function(value){
            var regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            var regexPhone = /^\d{10}$/;
            // return regexEmail.test(value) ? undefined : 'truong nay phai la email'
            if(regexEmail.test(value) || regexPhone.test(value)){
                return undefined;
            }else {
               return message ||'Trường này phải là Email !'
            }
        }
    }
} 
Validator.checkPass= function(selector){
    return {
      selector : selector ,
      test : function(value){
    //   var checkPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    //   if(value.match(checkPassword)){
    //       return undefined
    //   } else {return 'chứa ít nhất 8 ký tự, 1 số, 1 chữ hoa và 1 chữ thường '}
    //   return value.match(checkPassword) ? undefined : 'Mật khẩu phải chứa ít nhất 8 ký tự, và chứa ít nhất hai trong những điều sau đây: chữ viết hoa, chữ viết thường, số và ký hiệu.'
         return value.length >= 6 ? undefined : 'Mật khẩu chứ ít nhất 6 ký tự'
      
  }
}
} 
Validator.isConfirmed = function(selector,getConfirm,message){
    return{
        selector : selector,
        test : function(value){
            return value === getConfirm() ? undefined : message || "Giá trị nhập vào không chính xác,vui lòng nhập lại"

        }
    }
}

// ! Run
 Validator({
    form: '.form_registration',
    formGroupSelector : '.form-group',
    errorSelector : '.form-message',
    rules : [
        Validator.isEmail('#email','Email hoặc số điện thoại không hợp lệ'),
        Validator.checkPass('#password',6),
        Validator.isRequired('#password_confirmation'),
        Validator.isConfirmed('#password_confirmation',function(){
          return document.querySelector('.form_registration #password').value;
        }, 'Mật khẩu nhập lại không chính xác'),
    ],
    onSubmit: function(data){
       //call API
        console.log(data);
    }
})



