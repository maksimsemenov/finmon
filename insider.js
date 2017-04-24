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
        value: 50,
        density: {
          enable: false,
          value_area: 12
        }
      },
      color: {
        value: '#000',
        infected: '#D0011B'
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
          speed: 0.3,
          opacity_min: 0,
          sync: false
        }
      },
      size: {
        value: 2,
        random: true,
      },
      line_linked: {
        enable: true,
        distance: 50,
        color: "#000000",
        opacity: 0.1,
        width: 1
      },
      move: {
        enable: true,
        speed: 0.2,
        out_mode: 'bounce',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 3000,
          rotateY: 3000
        }
      },
      array: [],
      infected: {
        radius: 4,
        maxAmount: 10,
        probability: 0.999,
        connections: {
          maxAmount: 10,
          step: 0.01
        },
        array: []
      }
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
    move_speed: iJS.particles.move.speed,
    line_linked_distance: iJS.particles.line_linked.distance,
    line_linked_width: iJS.particles.line_linked.width,
  };


  iJS.fn.retinaInit = function(){

    if(window.devicePixelRatio > 1){
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
    iJS.particles.move.speed = iJS.tmp.obj.move_speed * iJS.canvas.pxratio;
    iJS.particles.line_linked.distance = iJS.tmp.obj.line_linked_distance * iJS.canvas.pxratio;
    iJS.particles.line_linked.width = iJS.tmp.obj.line_linked_width * iJS.canvas.pxratio;

  };

  /* ---------- iJS functions - canvas ------------ */

  iJS.fn.canvasInit = function(){
    iJS.canvas.ctx = iJS.canvas.el.getContext('2d');
  };

  iJS.fn.canvasSize = function(){
    iJS.canvas.el.width = iJS.canvas.w;
    iJS.canvas.el.height = iJS.canvas.h;
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
    this.vx = Math.random()-0.5;
    this.vy = Math.random()-0.5;

    this.vx_i = this.vx;
    this.vy_i = this.vy;
  };


  iJS.fn.particle.prototype.draw = function() {

    var p = this,
        radius = p.radius;

    if(p.opacity_bubble != undefined){
      var opacity = p.opacity_bubble;
    }else{
      var opacity = p.opacity;
    }

    if(p.color.rgb){
      var color_value = 'rgba('+p.color.rgb.r+','+p.color.rgb.g+','+p.color.rgb.b+','+opacity+')';
    }else{
      var color_value = 'hsla('+p.color.hsl.h+','+p.color.hsl.s+'%,'+p.color.hsl.l+'%,'+ 1 +')';
    }
    if (p.infected) {
      var redColor = hexToRgb('#D0011B')
      var color_value = 'rgba('+redColor.r+','+redColor.g+','+redColor.b+','+ opacity +')';
    }

    iJS.canvas.ctx.fillStyle = color_value;
    iJS.canvas.ctx.beginPath();
    iJS.canvas.ctx.arc(p.x, p.y, radius, 0, Math.PI * 2, false);
    iJS.canvas.ctx.closePath();
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

      if (iJS.particles.infected.array.length < iJS.particles.infected.maxAmount && !p.infected && !p.healed) {
        if (Math.ceil(Math.random() - iJS.particles.infected.probability)) {
          iJS.particles.infected.array.push(p)
          p.infected = true
          p.infectTime = Date.now()
          p.maxConnections = iJS.particles.infected.connections.maxAmount
          // p.radius = iJS.particles.infected.radius
          p.infectAge = 0
          p.opacity = 1
        }
      }

      /* move the particle */
      if(iJS.particles.move.enable){
        var ms = iJS.particles.move.speed/2;
        p.x += p.vx * ms;
        p.y += p.vy * ms;
      }

      /* change opacity status */
      if(p.infected) {
        p.opacity -= 0.003;
      }
      if(p.healed) {
        p.opacity *= 1.1;
        if (p.opacity >= iJS.particles.opacity.value) {
          p.healed = false
        }
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


      /* interaction auto between particles */
      if(iJS.particles.line_linked.enable || iJS.particles.move.attract.enable){
        if (p.infected) {
          p.connections = p.maxConnections
        }

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
          // if(p.infected){
          //   iJS.fn.interact.bounceParticles(p,p2);
          // }
        }
      }

      /* handle infected particle */
      if (p.infected) {
        if (p.opacity <= 0) {
          var pInfIndex = iJS.particles.infected.array.indexOf(p)
          iJS.particles.infected.array.splice(pInfIndex, 1)
          p.infected = false
          p.healed = true
          p.opacity = 0.001
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
      if (p1.infected || p2.infected) {
        opacity_line = Math.min(p1.opacity/10, p2.opacity/10, opacity_line);
      }
      if (p1.healed || p2.healed) {
        opacity_line = Math.min(p1.opacity/10, p2.opacity/10, opacity_line)
      }
      if(opacity_line > 0){
        /* style */
        var color_line = iJS.particles.line_linked.color_rgb_line;
        if (p1.infected || p2.infected) { color_line = hexToRgb(iJS.particles.color.infected)}
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
        dist_p = p1.radius * (10) + p2.radius;

    if(dist <= dist_p){
      p1.vx = -p1.vx;
      p1.vy = -p1.vy;

      p2.vx = -p2.vx;
      p2.vy = -p2.vy;
    }

  }

  iJS.fn.modes.pushParticles = function(nb, pos){

    iJS.tmp.pushing = true;

    for(var i = 0; i < nb; i++){
      iJS.particles.array.push(
        new iJS.fn.particle(
          iJS.particles.color,
          iJS.particles.opacity.value,
          {
            'x': pos ? pos.pos_x : Math.random() * iJS.canvas.w,
            'y': pos ? pos.pos_y : Math.random() * iJS.canvas.h
          }
        )
      )
      if(i == nb-1){
        if(!iJS.particles.move.enable){
          iJS.fn.particlesDraw();
        }
        iJS.tmp.pushing = false;
      }
    }

  };


  iJS.fn.modes.removeParticles = function(nb){

    iJS.particles.array.splice(0, nb);
    if(!iJS.particles.move.enable){
      iJS.fn.particlesDraw();
    }

  };

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
