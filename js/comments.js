import { declineByNumber } from './utils.js';

const MAX_NEW_COMMENTS_COUNT = 5;

const bigPicture = document.querySelector('.big-picture');
const loadingButton = bigPicture.querySelector('.comments-loader');
const commentsCountItem = bigPicture.querySelector('.social__comment-count');
const pictureComments = bigPicture.querySelector('.social__comments');
const commentChild = pictureComments.children[0];

let maxCommentsMultiplyer = 1;

const getCommentItem = (comment) => {
  const newComment = commentChild.cloneNode(true);
  const newCommentImg = newComment.querySelector('.social__picture');

  newCommentImg.src = comment.avatar;
  newCommentImg.alt = comment.name;

  newComment.querySelector('.social__text').textContent = comment.message;

  newComment.classList.add('hidden');

  return newComment;
};

const addNewComments = () => {
  const newCommentsCount = MAX_NEW_COMMENTS_COUNT * maxCommentsMultiplyer;
  const commentsOverallCount = pictureComments.children.length;
  const addedCommentsCount = newCommentsCount >= commentsOverallCount ? commentsOverallCount : newCommentsCount;

  for(let i = 0; i < addedCommentsCount; i++) {
    if (i < newCommentsCount && i >= newCommentsCount - MAX_NEW_COMMENTS_COUNT) {
      pictureComments.children[i].classList.remove('hidden');
    }
  }

  if(commentsOverallCount > newCommentsCount) {
    loadingButton.classList.remove('hidden');
  }
  else{
    loadingButton.classList.add('hidden');
  }

  commentsCountItem.innerHTML = `${addedCommentsCount} из <span class="comments-count">${commentsOverallCount}</span>
  ${declineByNumber(commentsOverallCount, 'комментарий', 'комментария', 'комментариев')}`;
};

const setComments = (comments) => {
  pictureComments.innerHTML = '';
  comments.forEach((comment) => {
    pictureComments.appendChild(getCommentItem(comment));
  });
  maxCommentsMultiplyer = 1;
  addNewComments();
};

loadingButton.addEventListener('click', () => {
  addNewComments(maxCommentsMultiplyer++);
});

export { setComments, bigPicture };
