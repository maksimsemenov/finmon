/* -----------------------------------------------
/* Author : Vincent Garreau  - vincentgarreau.com
/* MIT license: http://opensource.org/licenses/MIT
/* Demo / Generator : vincentgarreau.com/particles.js
/* GitHub : github.com/VincentGarreau/particles.js
/* How to use? : Check the GitHub README
/* v2.0.0
/* ----------------------------------------------- */

var iJS = function(tag_id, params){

  var canvas_el = document.querySelector('#'+tag_id+' > .particles-js-canvas-el');

  /* particles.js variables with default values */
  this.iJS = {
    canvas: {
      el: canvas_el,
      w: canvas_el.offsetWidth,
      h: canvas_el.offsetHeight
    },
    particles: {
      number: {
        value: 400,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: '#fff'
      },
      shape: {
        type: 'circle',
      },
      opacity: {
        value: 1,
        random: false,
        anim: {
          enable: false,
          speed: 2,
          opacity_min: 0,
          sync: false
        }
      },
      size: {
        value: 20,
        random: false,
        anim: {
          enable: false,
          speed: 20,
          size_min: 0,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 100,
        color: '#fff',
        opacity: 1,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 3000,
          rotateY: 3000
        }
      },
      array: []
    },
    fn: {
      interact: {},
      modes: {},
      vendors:{}
    },
    tmp: {}
  };

  var iJS = this.iJS;

  /* params settings */
  if(params){
    Object.deepExtend(iJS, params);
  }

  iJS.tmp.obj = {
    size_value: iJS.particles.size.value,
    size_anim_speed: iJS.particles.size.anim.speed,
    move_speed: iJS.particles.move.speed,
    line_linked_distance: iJS.particles.line_linked.distance,
    line_linked_width: iJS.particles.line_linked.width,
    mode_grab_distance: iJS.interactivity.modes.grab.distance,
    mode_bubble_distance: iJS.interactivity.modes.bubble.distance,
    mode_bubble_size: iJS.interactivity.modes.bubble.size,
    mode_repulse_distance: iJS.interactivity.modes.repulse.distance
  };


  iJS.fn.retinaInit = function(){

    if(iJS.retina_detect && window.devicePixelRatio > 1){
      iJS.canvas.pxratio = window.devicePixelRatio;
      iJS.tmp.retina = true;
    }
    else{
      iJS.canvas.pxratio = 1;
      iJS.tmp.retina = false;
    }

    iJS.canvas.w = iJS.canvas.el.offsetWidth * iJS.canvas.pxratio;
    iJS.canvas.h = iJS.canvas.el.offsetHeight * iJS.canvas.pxratio;

    iJS.particles.size.value = iJS.tmp.obj.size_value * iJS.canvas.pxratio;
    iJS.particles.size.anim.speed = iJS.tmp.obj.size_anim_speed * iJS.canvas.pxratio;
    iJS.particles.move.speed = iJS.tmp.obj.move_speed * iJS.canvas.pxratio;
    iJS.particles.line_linked.distance = iJS.tmp.obj.line_linked_distance * iJS.canvas.pxratio;
    iJS.interactivity.modes.grab.distance = iJS.tmp.obj.mode_grab_distance * iJS.canvas.pxratio;
    iJS.interactivity.modes.bubble.distance = iJS.tmp.obj.mode_bubble_distance * iJS.canvas.pxratio;
    iJS.particles.line_linked.width = iJS.tmp.obj.line_linked_width * iJS.canvas.pxratio;
    iJS.interactivity.modes.bubble.size = iJS.tmp.obj.mode_bubble_size * iJS.canvas.pxratio;
    iJS.interactivity.modes.repulse.distance = iJS.tmp.obj.mode_repulse_distance * iJS.canvas.pxratio;

  };



  /* ---------- iJS functions - canvas ------------ */

  iJS.fn.canvasInit = function(){
    iJS.canvas.ctx = iJS.canvas.el.getContext('2d');
  };

  iJS.fn.canvasSize = function(){

    iJS.canvas.el.width = iJS.canvas.w;
    iJS.canvas.el.height = iJS.canvas.h;

    if(iJS && iJS.interactivity.events.resize){

      window.addEventListener('resize', function(){

          iJS.canvas.w = iJS.canvas.el.offsetWidth;
          iJS.canvas.h = iJS.canvas.el.offsetHeight;

          /* resize canvas */
          if(iJS.tmp.retina){
            iJS.canvas.w *= iJS.canvas.pxratio;
            iJS.canvas.h *= iJS.canvas.pxratio;
          }

          iJS.canvas.el.width = iJS.canvas.w;
          iJS.canvas.el.height = iJS.canvas.h;

          /* repaint canvas on anim disabled */
          if(!iJS.particles.move.enable){
            iJS.fn.particlesEmpty();
            iJS.fn.particlesCreate();
            iJS.fn.particlesDraw();
            iJS.fn.vendors.densityAutoParticles();
          }

        /* density particles enabled */
        iJS.fn.vendors.densityAutoParticles();

      });

    }

  };


  iJS.fn.canvasPaint = function(){
    iJS.canvas.ctx.fillRect(0, 0, iJS.canvas.w, iJS.canvas.h);
  };

  iJS.fn.canvasClear = function(){
    iJS.canvas.ctx.clearRect(0, 0, iJS.canvas.w, iJS.canvas.h);
  };


  /* --------- iJS functions - particles ----------- */

  iJS.fn.particle = function(color, opacity, position){

    /* size */
    this.radius = (iJS.particles.size.random ? Math.random() : 1) * iJS.particles.size.value;
    if(iJS.particles.size.anim.enable){
      this.size_status = false;
      this.vs = iJS.particles.size.anim.speed / 100;
      if(!iJS.particles.size.anim.sync){
        this.vs = this.vs * Math.random();
      }
    }

    /* position */
    this.x = position ? position.x : Math.random() * iJS.canvas.w;
    this.y = position ? position.y : Math.random() * iJS.canvas.h;

    /* check position  - into the canvas */
    if(this.x > iJS.canvas.w - this.radius*2) this.x = this.x - this.radius;
    else if(this.x < this.radius*2) this.x = this.x + this.radius;
    if(this.y > iJS.canvas.h - this.radius*2) this.y = this.y - this.radius;
    else if(this.y < this.radius*2) this.y = this.y + this.radius;

    /* check position - avoid overlap */
    if(iJS.particles.move.bounce){
      iJS.fn.vendors.checkOverlap(this, position);
    }

    /* color */
    this.color = {};
    if(typeof(color.value) == 'object'){

      if(color.value instanceof Array){
        var color_selected = color.value[Math.floor(Math.random() * iJS.particles.color.value.length)];
        this.color.rgb = hexToRgb(color_selected);
      }else{
        if(color.value.r != undefined && color.value.g != undefined && color.value.b != undefined){
          this.color.rgb = {
            r: color.value.r,
            g: color.value.g,
            b: color.value.b
          }
        }
        if(color.value.h != undefined && color.value.s != undefined && color.value.l != undefined){
          this.color.hsl = {
            h: color.value.h,
            s: color.value.s,
            l: color.value.l
          }
        }
      }

    }
    else if(color.value == 'random'){
      this.color.rgb = {
        r: (Math.floor(Math.random() * (255 - 0 + 1)) + 0),
        g: (Math.floor(Math.random() * (255 - 0 + 1)) + 0),
        b: (Math.floor(Math.random() * (255 - 0 + 1)) + 0)
      }
    }
    else if(typeof(color.value) == 'string'){
      this.color = color;
      this.color.rgb = hexToRgb(this.color.value);
    }

    /* opacity */
    this.opacity = (iJS.particles.opacity.random ? Math.random() : 1) * iJS.particles.opacity.value;
    if(iJS.particles.opacity.anim.enable){
      this.opacity_status = false;
      this.vo = iJS.particles.opacity.anim.speed / 100;
      if(!iJS.particles.opacity.anim.sync){
        this.vo = this.vo * Math.random();
      }
    }

    /* animation - velocity for speed */
    var velbase = {}
    switch(iJS.particles.move.direction){
      case 'top':
        velbase = { x:0, y:-1 };
      break;
      case 'top-right':
        velbase = { x:0.5, y:-0.5 };
      break;
      case 'right':
        velbase = { x:1, y:-0 };
      break;
      case 'bottom-right':
        velbase = { x:0.5, y:0.5 };
      break;
      case 'bottom':
        velbase = { x:0, y:1 };
      break;
      case 'bottom-left':
        velbase = { x:-0.5, y:1 };
      break;
      case 'left':
        velbase = { x:-1, y:0 };
      break;
      case 'top-left':
        velbase = { x:-0.5, y:-0.5 };
      break;
      default:
        velbase = { x:0, y:0 };
      break;
    }

    if(iJS.particles.move.straight){
      this.vx = velbase.x;
      this.vy = velbase.y;
      if(iJS.particles.move.random){
        this.vx = this.vx * (Math.random());
        this.vy = this.vy * (Math.random());
      }
    }else{
      this.vx = velbase.x + Math.random()-0.5;
      this.vy = velbase.y + Math.random()-0.5;
    }

    // var theta = 2.0 * Math.PI * Math.random();
    // this.vx = Math.cos(theta);
    // this.vy = Math.sin(theta);

    this.vx_i = this.vx;
    this.vy_i = this.vy;



    /* if shape is image */

    var shape_type = iJS.particles.shape.type;
    if(typeof(shape_type) == 'object'){
      if(shape_type instanceof Array){
        var shape_selected = shape_type[Math.floor(Math.random() * shape_type.length)];
        this.shape = shape_selected;
      }
    }else{
      this.shape = shape_type;
    }

    if(this.shape == 'image'){
      var sh = iJS.particles.shape;
      this.img = {
        src: sh.image.src,
        ratio: sh.image.width / sh.image.height
      }
      if(!this.img.ratio) this.img.ratio = 1;
      if(iJS.tmp.img_type == 'svg' && iJS.tmp.source_svg != undefined){
        iJS.fn.vendors.createSvgImg(this);
        if(iJS.tmp.pushing){
          this.img.loaded = false;
        }
      }
    }



  };


  iJS.fn.particle.prototype.draw = function() {

    var p = this;

    if(p.radius_bubble != undefined){
      var radius = p.radius_bubble;
    }else{
      var radius = p.radius;
    }

    if(p.opacity_bubble != undefined){
      var opacity = p.opacity_bubble;
    }else{
      var opacity = p.opacity;
    }

    if(p.color.rgb){
      var color_value = 'rgba('+p.color.rgb.r+','+p.color.rgb.g+','+p.color.rgb.b+','+opacity+')';
    }else{
      var color_value = 'hsla('+p.color.hsl.h+','+p.color.hsl.s+'%,'+p.color.hsl.l+'%,'+opacity+')';
    }

    iJS.canvas.ctx.fillStyle = color_value;
    iJS.canvas.ctx.beginPath();

    switch(p.shape){

      case 'circle':
        iJS.canvas.ctx.arc(p.x, p.y, radius, 0, Math.PI * 2, false);
      break;

      case 'edge':
        iJS.canvas.ctx.rect(p.x-radius, p.y-radius, radius*2, radius*2);
      break;

      case 'triangle':
        iJS.fn.vendors.drawShape(iJS.canvas.ctx, p.x-radius, p.y+radius / 1.66, radius*2, 3, 2);
      break;

      case 'polygon':
        iJS.fn.vendors.drawShape(
          iJS.canvas.ctx,
          p.x - radius / (iJS.particles.shape.polygon.nb_sides/3.5), // startX
          p.y - radius / (2.66/3.5), // startY
          radius*2.66 / (iJS.particles.shape.polygon.nb_sides/3), // sideLength
          iJS.particles.shape.polygon.nb_sides, // sideCountNumerator
          1 // sideCountDenominator
        );
      break;

      case 'star':
        iJS.fn.vendors.drawShape(
          iJS.canvas.ctx,
          p.x - radius*2 / (iJS.particles.shape.polygon.nb_sides/4), // startX
          p.y - radius / (2*2.66/3.5), // startY
          radius*2*2.66 / (iJS.particles.shape.polygon.nb_sides/3), // sideLength
          iJS.particles.shape.polygon.nb_sides, // sideCountNumerator
          2 // sideCountDenominator
        );
      break;

      case 'image':

        function draw(){
          iJS.canvas.ctx.drawImage(
            img_obj,
            p.x-radius,
            p.y-radius,
            radius*2,
            radius*2 / p.img.ratio
          );
        }

        if(iJS.tmp.img_type == 'svg'){
          var img_obj = p.img.obj;
        }else{
          var img_obj = iJS.tmp.img_obj;
        }

        if(img_obj){
          draw();
        }

      break;

    }

    iJS.canvas.ctx.closePath();

    if(iJS.particles.shape.stroke.width > 0){
      iJS.canvas.ctx.strokeStyle = iJS.particles.shape.stroke.color;
      iJS.canvas.ctx.lineWidth = iJS.particles.shape.stroke.width;
      iJS.canvas.ctx.stroke();
    }

    iJS.canvas.ctx.fill();

  };


  iJS.fn.particlesCreate = function(){
    for(var i = 0; i < iJS.particles.number.value; i++) {
      iJS.particles.array.push(new iJS.fn.particle(iJS.particles.color, iJS.particles.opacity.value));
    }
  };

  iJS.fn.particlesUpdate = function(){

    for(var i = 0; i < iJS.particles.array.length; i++){

      /* the particle */
      var p = iJS.particles.array[i];

      // var d = ( dx = iJS.interactivity.mouse.click_pos_x - p.x ) * dx + ( dy = iJS.interactivity.mouse.click_pos_y - p.y ) * dy;
      // var f = -BANG_SIZE / d;
      // if ( d < BANG_SIZE ) {
      //     var t = Math.atan2( dy, dx );
      //     p.vx = f * Math.cos(t);
      //     p.vy = f * Math.sin(t);
      // }

      /* move the particle */
      if(iJS.particles.move.enable){
        var ms = iJS.particles.move.speed/2;
        p.x += p.vx * ms;
        p.y += p.vy * ms;
      }

      /* change opacity status */
      if(iJS.particles.opacity.anim.enable) {
        if(p.opacity_status == true) {
          if(p.opacity >= iJS.particles.opacity.value) p.opacity_status = false;
          p.opacity += p.vo;
        }else {
          if(p.opacity <= iJS.particles.opacity.anim.opacity_min) p.opacity_status = true;
          p.opacity -= p.vo;
        }
        if(p.opacity < 0) p.opacity = 0;
      }

      /* change size */
      if(iJS.particles.size.anim.enable){
        if(p.size_status == true){
          if(p.radius >= iJS.particles.size.value) p.size_status = false;
          p.radius += p.vs;
        }else{
          if(p.radius <= iJS.particles.size.anim.size_min) p.size_status = true;
          p.radius -= p.vs;
        }
        if(p.radius < 0) p.radius = 0;
      }

      /* change particle position if it is out of canvas */
      if(iJS.particles.move.out_mode == 'bounce'){
        var new_pos = {
          x_left: p.radius,
          x_right:  iJS.canvas.w,
          y_top: p.radius,
          y_bottom: iJS.canvas.h
        }
      }else{
        var new_pos = {
          x_left: -p.radius,
          x_right: iJS.canvas.w + p.radius,
          y_top: -p.radius,
          y_bottom: iJS.canvas.h + p.radius
        }
      }

      if(p.x - p.radius > iJS.canvas.w){
        p.x = new_pos.x_left;
        p.y = Math.random() * iJS.canvas.h;
      }
      else if(p.x + p.radius < 0){
        p.x = new_pos.x_right;
        p.y = Math.random() * iJS.canvas.h;
      }
      if(p.y - p.radius > iJS.canvas.h){
        p.y = new_pos.y_top;
        p.x = Math.random() * iJS.canvas.w;
      }
      else if(p.y + p.radius < 0){
        p.y = new_pos.y_bottom;
        p.x = Math.random() * iJS.canvas.w;
      }

      /* out of canvas modes */
      switch(iJS.particles.move.out_mode){
        case 'bounce':
          if (p.x + p.radius > iJS.canvas.w) p.vx = -p.vx;
          else if (p.x - p.radius < 0) p.vx = -p.vx;
          if (p.y + p.radius > iJS.canvas.h) p.vy = -p.vy;
          else if (p.y - p.radius < 0) p.vy = -p.vy;
        break;
      }

      /* events */
      if(isInArray('grab', iJS.interactivity.events.onhover.mode)){
        iJS.fn.modes.grabParticle(p);
      }

      if(isInArray('bubble', iJS.interactivity.events.onhover.mode) || isInArray('bubble', iJS.interactivity.events.onclick.mode)){
        iJS.fn.modes.bubbleParticle(p);
      }

      if(isInArray('repulse', iJS.interactivity.events.onhover.mode) || isInArray('repulse', iJS.interactivity.events.onclick.mode)){
        iJS.fn.modes.repulseParticle(p);
      }

      /* interaction auto between particles */
      if(iJS.particles.line_linked.enable || iJS.particles.move.attract.enable){
        for(var j = i + 1; j < iJS.particles.array.length; j++){
          var p2 = iJS.particles.array[j];

          /* link particles */
          if(iJS.particles.line_linked.enable){
            iJS.fn.interact.linkParticles(p,p2);
          }

          /* attract particles */
          if(iJS.particles.move.attract.enable){
            iJS.fn.interact.attractParticles(p,p2);
          }

          /* bounce particles */
          if(iJS.particles.move.bounce){
            iJS.fn.interact.bounceParticles(p,p2);
          }

        }
      }


    }

  };

  iJS.fn.particlesDraw = function(){

    /* clear canvas */
    iJS.canvas.ctx.clearRect(0, 0, iJS.canvas.w, iJS.canvas.h);

    /* update each particles param */
    iJS.fn.particlesUpdate();

    /* draw each particle */
    for(var i = 0; i < iJS.particles.array.length; i++){
      var p = iJS.particles.array[i];
      p.draw();
    }

  };

  iJS.fn.particlesEmpty = function(){
    iJS.particles.array = [];
  };

  iJS.fn.particlesRefresh = function(){

    /* init all */
    cancelRequestAnimFrame(iJS.fn.checkAnimFrame);
    cancelRequestAnimFrame(iJS.fn.drawAnimFrame);
    iJS.tmp.source_svg = undefined;
    iJS.tmp.img_obj = undefined;
    iJS.tmp.count_svg = 0;
    iJS.fn.particlesEmpty();
    iJS.fn.canvasClear();

    /* restart */
    iJS.fn.vendors.start();

  };


  /* ---------- iJS functions - particles interaction ------------ */

  iJS.fn.interact.linkParticles = function(p1, p2){

    var dx = p1.x - p2.x,
        dy = p1.y - p2.y,
        dist = Math.sqrt(dx*dx + dy*dy);

    /* draw a line between p1 and p2 if the distance between them is under the config distance */
    if(dist <= iJS.particles.line_linked.distance){

      var opacity_line = iJS.particles.line_linked.opacity - (dist / (1/iJS.particles.line_linked.opacity)) / iJS.particles.line_linked.distance;

      if(opacity_line > 0){

        /* style */
        var color_line = iJS.particles.line_linked.color_rgb_line;
        iJS.canvas.ctx.strokeStyle = 'rgba('+color_line.r+','+color_line.g+','+color_line.b+','+opacity_line+')';
        iJS.canvas.ctx.lineWidth = iJS.particles.line_linked.width;
        //iJS.canvas.ctx.lineCap = 'round'; /* performance issue */

        /* path */
        iJS.canvas.ctx.beginPath();
        iJS.canvas.ctx.moveTo(p1.x, p1.y);
        iJS.canvas.ctx.lineTo(p2.x, p2.y);
        iJS.canvas.ctx.stroke();
        iJS.canvas.ctx.closePath();

      }

    }

  };


  iJS.fn.interact.attractParticles  = function(p1, p2){

    /* condensed particles */
    var dx = p1.x - p2.x,
        dy = p1.y - p2.y,
        dist = Math.sqrt(dx*dx + dy*dy);

    if(dist <= iJS.particles.line_linked.distance){

      var ax = dx/(iJS.particles.move.attract.rotateX*1000),
          ay = dy/(iJS.particles.move.attract.rotateY*1000);

      p1.vx -= ax;
      p1.vy -= ay;

      p2.vx += ax;
      p2.vy += ay;

    }
  }

  iJS.fn.interact.bounceParticles = function(p1, p2){

    var dx = p1.x - p2.x,
        dy = p1.y - p2.y,
        dist = Math.sqrt(dx*dx + dy*dy),
        dist_p = p1.radius+p2.radius;

    if(dist <= dist_p){
      p1.vx = -p1.vx;
      p1.vy = -p1.vy;

      p2.vx = -p2.vx;
      p2.vy = -p2.vy;
    }

  }

  /* ---------- iJS functions - vendors ------------ */

  iJS.fn.vendors.densityAutoParticles = function(){

    if(iJS.particles.number.density.enable){

      /* calc area */
      var area = iJS.canvas.el.width * iJS.canvas.el.height / 1000;
      if(iJS.tmp.retina){
        area = area/(iJS.canvas.pxratio*2);
      }

      /* calc number of particles based on density area */
      var nb_particles = area * iJS.particles.number.value / iJS.particles.number.density.value_area;

      /* add or remove X particles */
      var missing_particles = iJS.particles.array.length - nb_particles;
      if(missing_particles < 0) iJS.fn.modes.pushParticles(Math.abs(missing_particles));
      else iJS.fn.modes.removeParticles(missing_particles);
    }
  };


  iJS.fn.vendors.checkOverlap = function(p1, position){
    for(var i = 0; i < iJS.particles.array.length; i++){
      var p2 = iJS.particles.array[i];

      var dx = p1.x - p2.x,
          dy = p1.y - p2.y,
          dist = Math.sqrt(dx*dx + dy*dy);

      if(dist <= p1.radius + p2.radius){
        p1.x = position ? position.x : Math.random() * iJS.canvas.w;
        p1.y = position ? position.y : Math.random() * iJS.canvas.h;
        iJS.fn.vendors.checkOverlap(p1);
      }
    }
  };

  iJS.fn.vendors.destroyiJS = function(){
    cancelAnimationFrame(iJS.fn.drawAnimFrame);
    canvas_el.remove();
    iJSDom = null;
  };

  iJS.fn.vendors.draw = function(){
    iJS.fn.particlesDraw();
    if(!iJS.particles.move.enable) cancelRequestAnimFrame(iJS.fn.drawAnimFrame);
    else iJS.fn.drawAnimFrame = requestAnimFrame(iJS.fn.vendors.draw);
  };

  iJS.fn.vendors.init = function(){
    /* particles.line_linked - convert hex colors to rgb */
    iJS.particles.line_linked.color_rgb_line = hexToRgb(iJS.particles.line_linked.color);

    /* init canvas + particles */
    iJS.fn.retinaInit();
    iJS.fn.canvasInit();
    iJS.fn.canvasSize();
    iJS.fn.canvasPaint();
    iJS.fn.particlesCreate();
    iJS.fn.vendors.densityAutoParticles();
  };

  iJS.fn.vendors.start = function(){
    iJS.fn.vendors.init();
    iJS.fn.vendors.draw();
  };

  /* ---------- iJS - start ------------ */
  iJS.fn.vendors.start();
};


/* ---------- global functions - vendors ------------ */

Object.deepExtend = function(destination, source) {
  for (var property in source) {
    if (source[property] && source[property].constructor &&
     source[property].constructor === Object) {
      destination[property] = destination[property] || {};
      arguments.callee(destination[property], source[property]);
    } else {
      destination[property] = source[property];
    }
  }
  return destination;
};

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(callback){
      window.setTimeout(callback, 1000 / 60);
    };
})();

window.cancelRequestAnimFrame = ( function() {
  return window.cancelAnimationFrame         ||
    window.webkitCancelRequestAnimationFrame ||
    window.mozCancelRequestAnimationFrame    ||
    window.oCancelRequestAnimationFrame      ||
    window.msCancelRequestAnimationFrame     ||
    clearTimeout
} )();

function hexToRgb(hex){
  // By Tim Down - http://stackoverflow.com/a/5624139/3493650
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
     return r + r + g + g + b + b;
  });
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
  } : null;
};

function clamp(number, min, max) {
  return Math.min(Math.max(number, min), max);
};

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}


/* ---------- particles.js functions - start ------------ */

window.iJSDom = [];

window.insiderJS = function(tag_id, params){

  //console.log(params);

  /* no string id? so it's object params, and set the id with default id */
  if(typeof(tag_id) != 'string'){
    params = tag_id;
    tag_id = 'particles-js';
  }

  /* no id? set the id to default id */
  if(!tag_id){
    tag_id = 'particles-js';
  }

  /* iJS elements */
  var iJS_tag = document.getElementById(tag_id),
      iJS_canvas_class = 'particles-js-canvas-el',
      exist_canvas = iJS_tag.getElementsByClassName(iJS_canvas_class);

  /* remove canvas if exists into the iJS target tag */
  if(exist_canvas.length){
    while(exist_canvas.length > 0){
      iJS_tag.removeChild(exist_canvas[0]);
    }
  }

  /* create canvas element */
  var canvas_el = document.createElement('canvas');
  canvas_el.className = iJS_canvas_class;

  /* set size canvas */
  canvas_el.style.width = "100%";
  canvas_el.style.height = "100%";

  /* append canvas */
  var canvas = document.getElementById(tag_id).appendChild(canvas_el);

  /* launch particle.js */
  if(canvas != null){
    iJSDom.push(new iJS(tag_id, params));
  }

};
