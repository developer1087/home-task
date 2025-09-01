function makeTriangle() {
  const x1 = document.getElementById('x1').value;
  const y1 = document.getElementById('y1').value;
  const x2 = document.getElementById('x2').value;
  const y2 = document.getElementById('y2').value;
  const x3 = document.getElementById('x3').value;
  const y3 = document.getElementById('y3').value;

  localStorage.setItem('triangleData', JSON.stringify({x1, y1, x2, y2, x3, y3}));
  window.location.href = 'view.html';

}

function drawTriangle() {
    const data = JSON.parse(localStorage.getItem('triangleData'));
    const {x1, y1, x2, y2, x3, y3} = data;
  
    const p1 = {x: parseFloat(x1), y: parseFloat(y1)};
    const p2 = {x: parseFloat(x2), y: parseFloat(y2)};
    const p3 = {x: parseFloat(x3), y: parseFloat(y3)};
  
    const canvas = document.getElementById('triangle');
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // ציור המשולש
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.closePath();
    ctx.stroke();
  
    // חישוב זוויות (שים לב לסדר!)
    const angle1 = calculateAngle(p1, p2, p3); // זווית בp1
    const angle2 = calculateAngle(p2, p3, p1); // זווית בp2  
    const angle3 = calculateAngle(p3, p1, p2); // זווית בp3
  
    // ציור קווי הזווית
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 1;
    drawAngleArc(ctx, p1, p2, p3);
    drawAngleArc(ctx, p2, p3, p1);
    drawAngleArc(ctx, p3, p1, p2);
  
    // הצגת הזוויות כטקסט
    ctx.fillStyle = 'red';
    ctx.font = '16px Arial';
    ctx.fillText(`${angle1}°`, p1.x + 15, p1.y - 15);
    ctx.fillText(`${angle2}°`, p2.x + 15, p2.y - 15);
    ctx.fillText(`${angle3}°`, p3.x + 15, p3.y - 15);
    
    // בדיקה: סכום הזוויות צריך להיות 180
    console.log(`סכום הזוויות: ${angle1 + angle2 + angle3}°`);
  }

  function calculateAngle(vertex, point1, point2) {
    // וקטורים מהקודקוד לשתי הנקודות האחרות
    const v1 = {x: point1.x - vertex.x, y: point1.y - vertex.y};
    const v2 = {x: point2.x - vertex.x, y: point2.y - vertex.y};
    
    // מכפלה סקלרית
    const dot = v1.x * v2.x + v1.y * v2.y;
    
    // אורכי הווקטורים
    const len1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
    const len2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
    
    // חישוב הזווית
    const cosAngle = dot / (len1 * len2);
    const angleRad = Math.acos(Math.max(-1, Math.min(1, cosAngle))); // הגבלה בטווח
    const angleDeg = angleRad * (180 / Math.PI);
    
    return Math.round(angleDeg);
  }

  function drawAngleArc(ctx, vertex, point1, point2, radius = 20) {
    const angle1 = Math.atan2(point1.y - vertex.y, point1.x - vertex.x);
    const angle2 = Math.atan2(point2.y - vertex.y, point2.x - vertex.x);
    
    // וודא שהקשת תמיד פונה פנימה (הזווית הקטנה)
    let startAngle = angle1;
    let endAngle = angle2;
    
    // אם ההפרש גדול מπ, זה אומר שאנחנו צריכים לצייר מהכיוון השני
    let angleDiff = endAngle - startAngle;
    if (angleDiff > Math.PI) {
      angleDiff -= 2 * Math.PI;
    } else if (angleDiff < -Math.PI) {
      angleDiff += 2 * Math.PI;
    }
    
    ctx.beginPath();
    ctx.arc(vertex.x, vertex.y, radius, startAngle, startAngle + angleDiff);
    ctx.stroke();
  }


