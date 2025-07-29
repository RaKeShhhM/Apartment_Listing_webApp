// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

//script for show.ejs
const deleteBtn = document.getElementById("deleteBtn");
//console.log(deleteBtn);
  const deleteModal = document.getElementById("deleteModal");
  //console.log(deleteModal);
  const backdrop = document.getElementById("backdrop");
 // console.log(backdrop);
  const cancelBtn = document.getElementById("cancelBtn");
 // console.log(cancelBtn);
  deleteBtn.addEventListener("click", () => {
    backdrop.style.display = "block";
    deleteModal.style.display = "block";
    setTimeout(() => deleteModal.classList.add("show"), 10);
  });

  cancelBtn.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);

  function closeModal() {
    deleteModal.classList.remove("show");
    setTimeout(() => {
      deleteModal.style.display = "none";
      backdrop.style.display = "none";
    }, 300);
  }