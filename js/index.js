$(document).ready(function () {
  $(".carousel_inner").slick({
    speed: 1200,
    prevArrow: `
            <button type="button" class="slick-prev">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" class="bi bi-chevron-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                </svg>
            </button>
        `,
    nextArrow: `
            <button type="button" class="slick-next">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" class="bi bi-chevron-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </button>
        `,
    responsive: [
      {
        breakpoint: 840,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  });

  validateForm("#consultation form");
  validateForm("#purchase form");
  validateForm("#main-consultation");
  $('input[name=phone]').mask('+0 (999) 999-99-99');

  $('form').submit(function(e) {
    e.preventDefault();
    if($('input[name=phone]').val().trim() !== '' && $('input[name=name]').val().trim() !== '' && $('input[name=email]').val().trim() !== ''){
      $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
      }).done(function() {
        $(this).find("input").val("");
  
        $('form').trigger("reset");
  
        document.getElementById("consultation").parentNode.classList.remove("modal__main-active");
        document.getElementById("thanks").classList.add("modal__greeting-active");
  
        return false;
      });
    }
    else{
      return false;
    }
  });

  function validateForm(formId) {
    $(formId).validate({
      rules: {
        name: "required",
        phone: "required",
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: "lorem ipsum",
        phone: "lorem number ipsum",
        email: {
          required: "lorem ipsum dolor",
          email: "lorem ipsum valid email of ipsum@lorem.ipsum",
        },
      },
    });
  }

  const tabs = document.querySelectorAll(".catalog__tab");
  const tabs_content = document.querySelectorAll(".catalog__content");
  const catalog_item_links = document.querySelectorAll(".catalog-item__link");
  const modal_close_btn = document.querySelector(".modal__close");
  const button_button_main = document.querySelector(".button.button__main");
  const button_button_call = document.querySelector(".button.button__call");
  const buttons_buttons_mini = document.querySelectorAll(
    ".button.button__mini"
  );
  const modal_greeting_close = document.querySelector(
    ".modal__greeting__close"
  );
  const modal_purchase_close = document.querySelector(
    ".modal__purchase__close"
  );

  tabs.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      tabs.forEach((i) => {
        i.classList.remove("active");
      });
      item.classList.add("active");

      console.log(item.dataset.content);

      tabs_content.forEach((tab_content) => {
        if (tab_content.dataset.content === item.dataset.content) {
          tabs_content.forEach((t) => {
            t.classList.remove("catalog__content-active");
          });

          tab_content.classList.add("catalog__content-active");
        }
      });
    });
  });

  catalog_item_links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      if (e.target.parentNode.nextElementSibling) {
        e.target.parentNode.classList.toggle("catalog-item__content-active");
        e.target.parentNode.nextElementSibling.classList.toggle(
          "catalog-item__specs-active"
        );
      } else {
        e.target.parentNode.classList.toggle("catalog-item__specs-active");
        e.target.parentNode.previousElementSibling.classList.toggle(
          "catalog-item__content-active"
        );
      }
    });
  });

  modal_close_btn.addEventListener("click", (e) => {
    toggleModal(".modal", "modal__main-active", e);
  });

  button_button_main.addEventListener("click", (e) => {
    toggleModal(".modal", "modal__main-active", e);
  });

  button_button_call.addEventListener("click", (e) => {
    toggleModal(".modal", "modal__main-active", e);
  });

  modal_greeting_close.addEventListener("click", (e) => {
    toggleModal(".modal__greeting", "modal__greeting-active", e);
  });
  modal_purchase_close.addEventListener("click", (e) => {
    toggleModal(".modal__purchase", "modal__purchase-active", e);
  });

  const purchase = document.querySelector(".purchase");

  buttons_buttons_mini.forEach((button_button_mini) => {
    button_button_mini.addEventListener("click", (e) => {
      e.preventDefault();
      var { item } = button_button_mini.dataset;
      purchase.innerHTML = item;
      toggleModal(".modal__purchase", "modal__purchase-active", e);
    });
  });

  function toggleModal(selectorClass, modalClass, event) {
    document.querySelector(selectorClass).classList.toggle(modalClass);
  }

  $(window).scroll(function() {
    if($(this).scrollTop() >= 1600){
      $('.pageup').fadeIn();
    }
    else{
      $('.pageup').fadeOut();
    }
  });

  $(function(){
    $("a[href=#up]").click(function(){
            var _href = $(this).attr("href");
            $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
            return false;
    });
});
});
