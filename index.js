const BASE_LEN = 300;
const SLEEP_COLOR = 'rgb(155, 158, 157)';
const RECOVER_COLOR = 'rgb(225, 225, 225)';
const BUFFER_COLOR = 'rgb(219, 219, 219)';

function start() {
  const canvas = document.querySelector('canvas');
  if (!canvas) {
    throw new Error('No canvas found!');
  }

  const ctx = canvas.getContext('2d');
  ctx.translate(BASE_LEN, BASE_LEN);

  const ro = BASE_LEN * 2 / 3;
  const ri = BASE_LEN / 3;
  fill_arc(ctx, ri, ro + 6, -Math.PI / 2, Math.PI * 5 / 8, SLEEP_COLOR);
  fill_arc(ctx, ri, ro + 6, -Math.PI * 5 / 8, Math.PI / 8, BUFFER_COLOR);
  fill_arc(ctx, ri, ro + 6, 0, Math.PI / 8, BUFFER_COLOR);
  fill_arc(ctx, ri, ro + 6, Math.PI * 7 / 12, Math.PI / 6, RECOVER_COLOR);
  fill_arc(ctx, ri, ro + 6, Math.PI * 11 / 12, Math.PI / 6, RECOVER_COLOR);

  draw_circle(ctx, ro + 6, 2);
  draw_circle(ctx, ro);
  draw_circle(ctx, ri);

  draw_measure(ctx, ri, ro);
}

start();

function draw_circle(ctx, r, width = 1) {
  ctx.lineWidth = width;
  ctx.strokeStyle = '#000';
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, 2 * Math.PI);
  ctx.stroke();
}

function draw_measure(ctx, ri, ro) {
  ctx.font = '14px Helvetica';
  ctx.strokeStyle = '#000';
  ctx.fillStyle = '#000';
  let line_length;
  let text_pos;
  for (let i = 0; i < 48; i++) {
    if (i % 12 === 0) {
      ctx.lineWidth = 2;
      line_length = -ro - 25;
      text_pos = -ro - 30;
    } else {
      ctx.lineWidth = 1;
      line_length = -ro - 12;
      text_pos = -ro - 17;
    }
    ctx.beginPath();
    if (i % 3 === 0) {
      ctx.moveTo(0, -ri);
    } else {
      ctx.moveTo(0, -ro);
    }
    ctx.lineTo(0, line_length);
    ctx.stroke();
    if (i % 2 === 0) {
      ctx.fillText(i / 2, i / 2 > 9 ? -8 : -4, text_pos);
    }
    ctx.rotate(Math.PI / 24);
  }

  ctx.fillStyle = 'rgb(203, 43, 41)';
  ctx.beginPath();
  ctx.arc(ro + 6, 0, 6, 0, Math.PI * 2);
  ctx.fill();
}

function fill_arc(ctx, ri, ro, start, theta, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(0, 0, ro, start, start + theta);
  ctx.lineTo(ri * Math.cos(start + theta), ri * Math.sin(start + theta));
  ctx.arc(0, 0, ri, start + theta, start, true);
  ctx.closePath();
  ctx.fill();
}
