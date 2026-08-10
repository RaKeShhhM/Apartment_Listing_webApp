//bootstrap modal to validate to delete a post 
const deleteBtn = document.getElementById("deleteBtn");
const deleteModal = document.getElementById("deleteModal");
const backdrop = document.getElementById("backdrop");
const cancelBtn = document.getElementById("cancelBtn");

if (deleteBtn && deleteModal && backdrop && cancelBtn) {
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
}