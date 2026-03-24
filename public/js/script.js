// Tech stack modal (About page)
document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('tech-modal');
  const modalClose = document.getElementById('tech-modal-close');
  const modalTitle = document.getElementById('tech-modal-title');
  const modalList = document.getElementById('tech-modal-list');
  const viewAllButtons = document.querySelectorAll('.view-all-btn');

  if (!modal || !modalTitle || !modalList) return;

  const categoryTitles = {
    backend: 'Backend',
    frontend: 'Frontend',
    databases: 'Databases',
    cloudDevops: 'Cloud & DevOps',
    uiux: 'UI/UX',
    tools: 'Tools'
  };

  function openModal(category, items) {
    modalTitle.textContent = categoryTitles[category] || category;
    modalList.innerHTML = '';

    items.forEach((item) => {
      const techItem = document.createElement('div');
      techItem.className = 'tech-item';

      if (item.image) {
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.name;
        techItem.appendChild(img);
      } else {
        const textDiv = document.createElement('div');
        textDiv.className = 'tech-item-text';
        textDiv.textContent = item.name;
        techItem.appendChild(textDiv);
      }

      const tooltip = document.createElement('span');
      tooltip.className = 'tooltip';
      tooltip.textContent = item.name;
      techItem.appendChild(tooltip);

      modalList.appendChild(techItem);
    });

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  viewAllButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const category = this.getAttribute('data-category');
      const itemsJson = this.getAttribute('data-items');
      try {
        const items = JSON.parse(itemsJson);
        openModal(category, items);
      } catch (e) {
        console.error('Error parsing tech items:', e);
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
});
