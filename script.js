window.onload = function(){
    var head = document.getElementById("head1");
    var ctx = head1.getContext("2d");

    ctx.beginPath();
    ctx.rect(0,0,head1.width,head1.height);
    ctx.fillStyle = "#00ffff";
    ctx.fill();

    ctx.beginPath();
    ctx.rect(0,0,head1.width,head1.height);
    var hGrad = ctx.createLinearGradient(0,0,head1.width,head1.height);
    hGrad.addColorStop(0, 'rgba(0,0,0,0)');
    hGrad.addColorStop(0.5, 'rgba(255, 102, 255,1)');
    hGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = hGrad;
    ctx.fill();
}