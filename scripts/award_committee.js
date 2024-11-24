const observer = new MutationObserver(() => {
    document.querySelectorAll('article').forEach((tweet) => {
        if (tweet.querySelector('.award-overlay')) return;

        const likeCountElement = tweet.querySelector('[data-testid="like"],[data-testid="unlike"]');
        const replyCountElement = tweet.querySelector('[data-testid="reply"]');
      
        var likeCount = 1
        var replyCount = 1

        if (likeCountElement) {
          likeCount = parseInt(likeCountElement.getAttribute('aria-label').replace(/\D/g, ""));
        }
        if (replyCountElement) {
          replyCount = parseInt(replyCountElement.getAttribute('aria-label').replace(/\D/g, ""));
          if (replyCount == 0) {replyCount = 1}
        }

        if (likeCount/replyCount > 500) {
          const img = document.createElement('img');
          img.src = chrome.runtime.getURL('resources/award.png'); // Replace with your image URL
          //img.alt = 'Overlay Image';
          img.className = 'award-overlay';

          img.style.position = 'absolute';
          img.style.top = '27px'; // Adjust position as needed
          img.style.left = '30px'; // Adjust position as needed
          img.style.width = '35px'; // Adjust size as needed
          img.style.height = '40px';
          img.style.zIndex = '1000'; // Ensure it overlays other content

          tweet.style.position = 'relative';
          tweet.appendChild(img);
          console.log(img);
        }

    });
});

observer.observe(document.body, { childList: true, subtree: true });
