export default function resizeCanvas({ canvas, context, bounds }) {
  const [w, h] = [canvas.clientWidth, canvas.clientHeight];
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }

  const centerX = bounds.offset.x + bounds.size.x / 2;
  const centerY = bounds.offset.y + bounds.size.y / 2;
  const scaleX = bounds.size.x / canvas.width;
  const scaleY = bounds.size.y / canvas.height;
  let scale = Math.max(scaleX, scaleY) * 1.2;
  if (scale < 1) scale = 1;
  const width = canvas.width * scale;
  const height = canvas.height * scale;

  context.setTransform(1, 0, 0, 1, 0, 0);
  context.scale(1 / scale, 1 / scale);
  context.translate(-centerX, -centerY);
  context.translate(width / 2, height / 2);
}
