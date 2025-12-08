const canvasEl = document.getElementById('canvas');

if (!(canvasEl instanceof HTMLCanvasElement)) {
  throw new Error('Canvas element with id "canvas" not found.');
}

const canvas: HTMLCanvasElement = canvasEl;
const ctx = (() => {
  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('2D context not available for canvas.');
  }
  return context;
})();

const bgImageUrl = 'https://res.cloudinary.com/dmq8ipket/image/upload/v1765208339/bg_tcrssc.png';
const bgImage = new Image();

const pointerState = {
  drawing: false,
  lastX: 0,
  lastY: 0,
};

const dpr = window.devicePixelRatio || 1;

bgImage.src = bgImageUrl;
bgImage.onload = () => {
  const width = bgImage.naturalWidth;
  const height = bgImage.naturalHeight;

  // Match canvas pixel size to the background image while staying crisp on HiDPI
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  ctx.resetTransform();
  ctx.scale(dpr, dpr);

  drawBackground();
  setupDrawing();
};

bgImage.onerror = () => {
  console.error('Failed to load background image:', bgImageUrl);
};

function drawBackground(): void {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Use CSS pixel units because we scaled the context for DPR above
  ctx.drawImage(bgImage, 0, 0, canvas.width / dpr, canvas.height / dpr);
}

function setupDrawing(): void {
  canvas.addEventListener('pointerdown', startDrawing);
  canvas.addEventListener('pointermove', handleDraw);
  canvas.addEventListener('pointerup', stopDrawing);
  canvas.addEventListener('pointerleave', stopDrawing);
}

function startDrawing(event: PointerEvent): void {
  pointerState.drawing = true;
  const { x, y } = getCanvasCoords(event);
  pointerState.lastX = x;
  pointerState.lastY = y;
}

function handleDraw(event: PointerEvent): void {
  if (!pointerState.drawing) return;

  const { x, y } = getCanvasCoords(event);

  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = '#111827'; // dark gray

  ctx.beginPath();
  ctx.moveTo(pointerState.lastX, pointerState.lastY);
  ctx.lineTo(x, y);
  ctx.stroke();

  pointerState.lastX = x;
  pointerState.lastY = y;
}

function stopDrawing(): void {
  pointerState.drawing = false;
}

function getCanvasCoords(event: PointerEvent): { x: number; y: number } {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}

