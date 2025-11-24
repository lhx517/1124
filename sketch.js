let char1 = {
  spriteSheet: null,
  animation: [],
  frameWidth: 63,
  frameHeight: 52,
  totalFrames: 8,
  currentFrame: 0,
  scale: 3,
  x: 0,
  y: 0
};

let char2 = {
  spriteSheet: null,
  animation: [],
  frameWidth: 124,
  frameHeight: 87,
  totalFrames: 8,
  currentFrame: 0,
  scale: 2,
  x: 0,
  y: 0
};

let char3 = {
  spriteSheet: null,
  animation: [],
  frameWidth: 147, // 角色3每個影格的寬度 (1911 / 13)
  frameHeight: 188, // 角色3每個影格的高度
  totalFrames: 13,  // 角色3的總影格數
  currentFrame: 0,
  scale: 2,
  x: 0,
  y: 0
};

function preload() {
  // 同時載入兩個角色的圖片精靈
  char1.spriteSheet = loadImage('角色1/all1.png');
  char2.spriteSheet = loadImage('角色2/all2 994.87 8.png');
  char3.spriteSheet = loadImage('角色3/all3 1913.188.png'); // 載入角色3
}

function setup() {
  // 創建一個和瀏覽器視窗一樣大的畫布
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);

  // 為角色1裁切動畫
  for (let i = 0; i < char1.totalFrames; i++) {
    let frame = char1.spriteSheet.get(i * char1.frameWidth, 0, char1.frameWidth, char1.frameHeight);
    char1.animation.push(frame);
  }

  // 為角色2裁切動畫
  for (let i = 0; i < char2.totalFrames; i++) {
    let frame = char2.spriteSheet.get(i * char2.frameWidth, 0, char2.frameWidth, char2.frameHeight);
    char2.animation.push(frame);
  }

  // 為角色3裁切動畫
  for (let i = 0; i < char3.totalFrames; i++) {
    let frame = char3.spriteSheet.get(i * char3.frameWidth, 0, char3.frameWidth, char3.frameHeight);
    char3.animation.push(frame);
  }

  // 設定動畫播放速度 (每秒影格數)
  frameRate(8); // 調整播放速度以匹配影格數
}

function draw() {
  background(220);

  // 確保兩個角色的動畫都已載入
  if (char1.animation.length > 0 && char2.animation.length > 0 && char3.animation.length > 0) {
    const spacing = 50; // 兩個角色之間的間距
    
    // 計算角色顯示的寬度
    const char1DisplayWidth = char1.frameWidth * char1.scale;
    const char2DisplayWidth = char2.frameWidth * char2.scale;
    const char3DisplayWidth = char3.frameWidth * char3.scale;

    // 計算三個角色並排的總寬度
    const totalDisplayWidth = char1DisplayWidth + char2DisplayWidth + char3DisplayWidth + (spacing * 2);
    const startX = width / 2 - totalDisplayWidth / 2;

    // 計算並設定三個角色的位置
    char1.x = startX + char1DisplayWidth / 2;
    char2.x = char1.x + char1DisplayWidth / 2 + spacing + char2DisplayWidth / 2;
    char3.x = char2.x + char2DisplayWidth / 2 + spacing + char3DisplayWidth / 2;
    char1.y = height / 2;
    char2.y = height / 2;
    char3.y = height / 2;

    // 繪製角色1
    image(char1.animation[char1.currentFrame], char1.x, char1.y, char1DisplayWidth, char1.frameHeight * char1.scale);
    char1.currentFrame = (char1.currentFrame + 1) % char1.totalFrames;

    // 繪製角色2
    image(char2.animation[char2.currentFrame], char2.x, char2.y, char2DisplayWidth, char2.frameHeight * char2.scale);
    char2.currentFrame = (char2.currentFrame + 1) % char2.totalFrames;

    // 繪製角色3
    image(char3.animation[char3.currentFrame], char3.x, char3.y, char3DisplayWidth, char3.frameHeight * char3.scale);
    char3.currentFrame = (char3.currentFrame + 1) % char3.totalFrames;
  }
}

// 當瀏覽器視窗大小改變時，這個函式會被自動呼叫
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
