document.addEventListener('keydown', jump);

let score = 0;
let isGameOver = false;

function jump(event) {
  if (!isGameOver && event.code === 'Space') {
    const dino = document.getElementById('dino');
    dino.style.bottom = '100px'; // Adjust the height of the jump
    setTimeout(() => {
      dino.style.bottom = '0';
    }, 500); // Adjust the duration of the jump
  }
}

function createObstacle() {
  if (!isGameOver) {
    const obstacle = document.createElement('div');
    obstacle.className = 'obstacle';
    obstacle.style.animationDuration = `${Math.random() * 2 + 1}s`;
    document.getElementById('game-container').appendChild(obstacle);

    obstacle.addEventListener('animationiteration', () => {
      obstacle.remove();
      score++;
      document.getElementById('score').innerText = `Score: ${score}`;

      // Change background color every 10 points
      if (score % 10 === 0) {
        changeBackgroundColor();
      }
    });

    obstacle.addEventListener('animationstart', () => {
      const dino = document.getElementById('dino');
      const obstacleBottom = parseInt(
        window.getComputedStyle(obstacle).getPropertyValue('bottom')
      );
      const dinoBottom = parseInt(
        window.getComputedStyle(dino).getPropertyValue('bottom')
      );

      if (dinoBottom <= 50 && obstacleBottom <= 50) {
        gameOver();
      }
    });
  }
}

function changeBackgroundColor() {
  const colors = ['#87CEEB', '#90EE90', '#FFD700', '#FFA07A'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  document.getElementById('game-container').style.backgroundColor = randomColor;
}

function gameOver() {
  isGameOver = true;
  alert(`Game Over! Your score is ${score}`);
  score = 0;
  document.getElementById('score').innerText = 'Score: 0';
  isGameOver = false;
  document.getElementById('game-container').style.backgroundColor = '#fff'; // Reset background color
}

setInterval(createObstacle, 2000);