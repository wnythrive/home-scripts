document.addEventListener('DOMContentLoaded', function () {
  // Form Handling and Redirection Logic
  const searchForm = document.getElementById('Home-Filter-Form');
  const servicesField = document.getElementById('Services');
  const industryField = document.getElementById('Industry');
  const locationField = document.getElementById('Location');
  const submitButton = document.querySelector('.submit_filter-button');

  const keywordLabels = [...document.querySelectorAll('[fs-cmsfilter-field="keyword"]')];

  // Preselect checkboxes based on URL parameters
  const params = new URLSearchParams(window.location.search);
  const selectedKeywords = params.get('keyword')?.split(',') || [];

  keywordLabels.forEach(label => {
    const checkbox = label.previousElementSibling;
    if (checkbox && checkbox.type === 'checkbox' && selectedKeywords.includes(label.textContent.trim())) {
      checkbox.checked = true;
    }
  });

  // Optimize redirection
  submitButton.addEventListener('click', function (event) {
    event.preventDefault();

    // Gather form inputs
    const servicesValue = servicesField.value.trim();
    const industryValue = industryField.value.trim();
    const locationValue = locationField.value.trim();
    const keywordValues = keywordLabels
      .filter(label => label.previousElementSibling.checked)
      .map(label => label.textContent.trim());

    // Create query string, excluding empty parameters
    const params = new URLSearchParams();
    if (servicesValue) params.append('services', servicesValue);
    if (industryValue) params.append('industry', industryValue);
    if (locationValue) params.append('location', locationValue);
    if (keywordValues.length) params.append('keyword', keywordValues.join(','));

    window.location.href = `/directory?${params.toString()}`;
  });
});

document.addEventListener('DOMContentLoaded', function () {
  // Social Sharing Logic
  const items = [...document.querySelectorAll('.thrive_listing, .thrive_update')];

  items.forEach(item => {
    const slug = item.getAttribute('data-slug');
    if (!slug) return;

    const baseURL = 'https://wnybizboard.com';
    const itemURL = item.classList.contains('thrive_listing')
      ? `${baseURL}/listings/${slug}`
      : `${baseURL}/updates/${slug}`;

    const shareLinks = [...item.querySelectorAll('.social-share_link')];

    shareLinks.forEach(link => {
      const platform = link.getAttribute('data-platform');
      let href = '';

      switch (platform) {
        case 'facebook':
          href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(itemURL)}`;
          break;
        case 'twitter':
          href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(itemURL)}&text=${encodeURIComponent('Check this out!')}`;
          break;
        case 'linkedin':
          href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(itemURL)}`;
          break;
        case 'instagram':
          link.addEventListener('click', event => {
            event.preventDefault();
            navigator.clipboard.writeText(itemURL)
              .then(() => alert('Link copied! You can share it on Instagram by pasting it.'))
              .catch(console.error);
          });
          return; // Skip href assignment
      }

      if (href) {
        link.setAttribute('href', href);
        link.setAttribute('target', '_blank');
      }
    });
  });
});
